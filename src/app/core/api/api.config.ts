export const API_CONFIG = {
  baseUrl: 'https://coordinator-aagl.onrender.com/',

  auth: {
    login: 'auth/login',
    refresh: 'auth/refresh',
    logout: 'auth/logout',
    me: 'auth/me',
  },
} as const;
