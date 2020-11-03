export const AUTH_CREATE_SESSION = 'AUTH_CREATE_SESSION';

export const saveToken = (token, userID) => ({
  type: AUTH_CREATE_SESSION,
  token,
  userID
});