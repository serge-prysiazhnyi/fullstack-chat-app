export const PASSWORD_MIN_LENGTH = parseInt(
  process.env.VITE__REACT_APP_MIN_PASSWORD_LENGTH || '8',
);

export const PASSWORD_MAX_LENGTH = parseInt(
  process.env.VITE__REACT_APP_MAX_PASSWORD_LENGTH || '20',
);

export const USERNAME_MIN_LENGTH = parseInt(
  process.env.VITE__REACT_APP_MIN_USERNAME_LENGTH || '2',
);

export const SALT = 10;
export const TOKEN_EXPIRATION_TIME = '15d';
