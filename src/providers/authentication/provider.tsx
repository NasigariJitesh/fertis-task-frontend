'use client';

import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { useRefreshToken } from './use-queries';

export interface UserInToken {
  exp: number;
  _id: string;
  email: string;
  name: string;
}

const AuthContext = createContext<{
  getToken: (forceRefresh?: boolean) => string | null;
  refreshToken: string | null;
  getUser: () => UserInToken | null;
  setToken: (value: string | undefined) => void;
  setRefreshToken: (value: string | undefined) => void;
  redirectRoute: string | null;
  setRedirectPathAfterLogin: (value: string | null) => void;
  logout: () => void;
}>({
  getToken: () => null,
  refreshToken: null,
  getUser: () => null,
  redirectRoute: null,
  setToken: () => {},
  setRefreshToken: () => {},
  setRedirectPathAfterLogin: () => {},
  logout: () => {},
});

const useAuth = () => useContext(AuthContext);

/**
 *
 * @param token
 */
export function parseJwt(token: string) {
  try {
    if (!token) return null;

    const payload = jwtDecode(token) as UserInToken | null;

    if (!payload) return null;

    return payload as UserInToken;
  } catch (error) {
    console.error(error);
    return null;
  }
}

const Provider = (props: { children: ReactNode }) => {
  const [isClient, toggleIsClient] = useState(false);

  const [token, setToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserInToken | null>(null);
  const [route, setRoute] = useState<string | null>(null);

  const { replace } = useRouter();

  const { mutateAsync: refreshTokenMutation } = useRefreshToken({
    authToken: token ?? '',
  });

  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token');

    setToken(storedToken);
    setUser(parseJwt(storedToken || '') || null);
    toggleIsClient(true);

    const storedRefreshToken = localStorage.getItem('auth_refresh_token');

    setRefreshToken(storedRefreshToken);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setTokenHandler = (value: string | null | undefined) => {
    setToken(value || null);
    setUser(parseJwt(value || '') || null);

    if (value) localStorage.setItem('auth_token', value);
    else localStorage.removeItem('auth_token');
  };

  const setRefreshTokenHandler = (value: string | null | undefined) => {
    setRefreshToken(value || null);

    if (value) localStorage.setItem('auth_refresh_token', value);
    else localStorage.removeItem('auth_refresh_token');
  };

  const redirectAfterLogin = (value: string | null) => {
    setRoute(value);
  };

  const refresh = async (force?: boolean) => {
    if (!refreshToken) return null;

    const now = Date.now();
    const jwt = parseJwt(refreshToken);

    if (!jwt) return null;

    const difference = jwt.exp * 1000 - now;

    if (difference > 0 || force) {
      // fetch new token and return it
      try {
        const response = await refreshTokenMutation(refreshToken);

        console.info('token refreshed');

        return {
          token: response?.token || null,
          refreshToken: response?.refresh_token || null,
        };
      } catch {
        console.error('Error refreshing token');
        return null;
      }
    }

    return null;
  };

  const getToken = (forceRefresh?: boolean) => {
    if (user) {
      const now = Date.now();

      const difference = user.exp * 1000 - now;

      // covert difference from milliseconds to hours
      const hours = Math.floor(difference / 1000 / 60 / 60);

      if (difference < 0 || hours < 1 || forceRefresh) {
        refresh().then((t) => {
          if (t) {
            // if token exists set it, or log out
            if (t.token) {
              setToken(t.token);
              setUser(parseJwt(t.token));
              try {
                localStorage.setItem('auth_token', t.token);
              } catch (error) {
                console.error(error);
              }
            } else logout();

            // if refresh token exists set it, or log out
            if (t.refreshToken) {
              setRefreshToken(t.refreshToken);
              try {
                localStorage.setItem('auth_refresh_token', t.refreshToken);
              } catch (error) {
                console.error(error);
              }
            } else logout();
          } else logout();
        });
      }
    }

    return token;
  };

  const getUser = () => {
    getToken();

    return user;
  };

  const logout = () => {
    try {
      // route the user to login
      replace('/signin');

      // reset all the tokens
      setToken(null);
      setRefreshToken(null);
      redirectAfterLogin(null);
      setUser(null);

      // remove it from the local store

      localStorage.removeItem('auth_refresh_token');
      localStorage.removeItem('auth_token');
    } catch (error) {
      console.error(error);
    }
  };

  if (!isClient) return null;

  return (
    <AuthContext.Provider
      value={{
        getToken,
        getUser,
        setToken: setTokenHandler,
        refreshToken,
        setRefreshToken: setRefreshTokenHandler,
        redirectRoute: route,
        setRedirectPathAfterLogin: redirectAfterLogin,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { Provider as AuthenticationProvider, useAuth };
