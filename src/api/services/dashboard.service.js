import api from '../config';

export const getDashboardStats = async () => {
  try {
    const response = await api.get('/admin/dashboard-stats');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getCarStats = async (period = 'month') => {
  try {
    const response = await api.get(`/admin/car-stats?period=${period}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const dashboardService = {
  getDashboardStats,
  getCarStats
};

export default dashboardService; 