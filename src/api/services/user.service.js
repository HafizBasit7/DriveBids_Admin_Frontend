import api from '../config';

export const getUsers = async (page = 1, limit = 10, search = '') => {
  try {
    const response = await api.get('/admin/users', {
      params: {
        page,
        limit,
        search
      }
    });
    
    if (response.data.status && response.data.data) {
      return response.data.data;
    }
    throw new Error('Invalid response format');
  } catch (error) {
    throw error.response?.data?.message || error.message || 'Failed to fetch users';
  }
};

export const getUserDetails = async (userId) => {
  try {
    const response = await api.get(`/admin/users/${userId}`);
    if (response.data.status && response.data.data) {
      return response.data.data;
    }
    throw new Error('Invalid response format');
  } catch (error) {
    throw error.response?.data?.message || error.message || 'Failed to fetch user details';
  }
};

export const updateUserStatus = async (userId, status) => {
  try {
    const response = await api.put(`/admin/users/${userId}/status`, { status });
    if (response.data.status) {
      return response.data.data;
    }
    throw new Error('Invalid response format');
  } catch (error) {
    throw error.response?.data?.message || error.message || 'Failed to update user status';
  }
};

const userService = {
  getUsers,
  getUserDetails,
  updateUserStatus
};

export default userService; 