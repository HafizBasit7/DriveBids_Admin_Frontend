import api from '../config';

export const login = async (email, password) => {
  try {
    const response = await api.post('/admin/login', { email, password });
    if (response.data.status && response.data.data?.token) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('isAuthenticated', 'true');
      return response.data;
    }
    throw new Error('Invalid response format');
  } catch (error) {
    throw error.response?.data?.message || error.message || 'Login failed';
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('isAuthenticated');
};

export const getCurrentUser = () => {
  return localStorage.getItem('token');
};

const authService = {
  login,
  logout,
  getCurrentUser
};

export default authService; 