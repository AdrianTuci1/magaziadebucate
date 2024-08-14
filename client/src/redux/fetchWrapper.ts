// fetchWrapper.ts
import store from './store.ts'; // Adjust the path as necessary
import { logoutSuccess } from './authSlice';
import { getAuthToken, removeAuthToken, removeAuthUser, removeAuthRoles } from './storage';

const fetchWrapper = async (url: string, options: RequestInit = {}) => {
  const token = getAuthToken();

  const headers = {
    ...options.headers,
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : ''
  };

  const response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    // Token has expired, log out the user
    store.dispatch(logoutSuccess());
    removeAuthToken();
    removeAuthUser();
    removeAuthRoles();
    // Optionally redirect to login page
    window.location.href = '/';
  }

  return response;
};

export default fetchWrapper;
