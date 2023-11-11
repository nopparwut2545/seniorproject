import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:9000',
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * Set the Authorization token for the Axios instance.
 * @param token - JWT token
 */
export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

/**
 * Authenticate a user using their email and password.
 * @param email - User's email
 * @param password - User's password
 * @returns AxiosResponse
 */
export const login = async (email: string, password: string) => {
  return api.post('/auth/user-login', { email, password });
};

export const login_admin = async (email: string, password: string) => {
  return api.post('/auth/admin-login', { email, password });
};

export const login_nanny = async (email: string, password: string) => {
  return api.post('/auth/nanny-login', { email, password });
};

// You can add other API related functions here as needed.
