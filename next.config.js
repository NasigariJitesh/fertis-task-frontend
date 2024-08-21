/** @type {import('next').NextConfig} */
const config = {
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
    ENVIRONMENT: process.env.ENVIRONMENT || 'development',
  },
};

module.exports = config;
