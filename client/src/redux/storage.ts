import Cookies from 'js-cookie';

const AUTH_TOKEN_KEY = 'auth_token';
const AUTH_USER_KEY = 'auth_user';
const AUTH_ROLES_KEY = 'auth_roles';

export const setAuthToken = (token: string) => {
  Cookies.set(AUTH_TOKEN_KEY, token, { expires: 1 });
};

export const getAuthToken = (): string | null => {
  return Cookies.get(AUTH_TOKEN_KEY) || null;
};

export const removeAuthToken = () => {
  Cookies.remove(AUTH_TOKEN_KEY);
};

export const setAuthUser = (user: any) => {
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
};

export const getAuthUser = (): any | null => {
  const storedUser = localStorage.getItem(AUTH_USER_KEY);
  return storedUser ? JSON.parse(storedUser) : null;
};

export const removeAuthUser = () => {
  localStorage.removeItem(AUTH_USER_KEY);
};

export const setAuthRoles = (roles: string[]) => {
  localStorage.setItem(AUTH_ROLES_KEY, JSON.stringify(roles));
};

export const getAuthRoles = (): string[] => {
  const storedRoles = localStorage.getItem(AUTH_ROLES_KEY);
  return storedRoles ? JSON.parse(storedRoles) : [];
};

export const removeAuthRoles = () => {
  localStorage.removeItem(AUTH_ROLES_KEY);
};
