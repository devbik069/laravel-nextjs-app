import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // needed for Sanctum or cookies
});

export const logout = async () => {
  return api.post('/api/v1/logout');
};

export const login = async (data: { email: string; password: string }) => {
  await api.get('/sanctum/csrf-cookie');
  return api.post('/api/v1/login', data);
};

export const register = async (data: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}) => {
  await api.get('/sanctum/csrf-cookie');
  return api.post('/api/v1/register', data);
};

export default api;
