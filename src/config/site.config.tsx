import logoImg from '@/assets/logo.png';

enum MODE {
  DARK = 'dark',
  LIGHT = 'light',
}

export const siteConfig = {
  title: 'User Dashboard',
  description: 'Simple user Dashboard',
  logo: logoImg,
  logoDark: logoImg,
  icon: logoImg,
  mode: MODE.DARK,
};
