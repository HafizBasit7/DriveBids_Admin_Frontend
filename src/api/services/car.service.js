import api from '../config';

export const getCars = async (page = 1, limit = 10) => {
  try {
    const response = await api.get(`/admin/cars?page=${page}&limit=${limit}`);
    if (response.data.status && response.data.data?.cars) {
      return response.data.data;
    }
    throw new Error('Invalid response format');
  } catch (error) {
    throw error.response?.data?.message || error.message || 'Failed to fetch cars';
  }
};

export const getCarDetails = async (carId) => {
  try {
    const response = await api.get(`/admin/cars/${carId}`);
    if (response.data.status && response.data.data) {
      return response.data.data;
    }
    throw new Error('Invalid response format');
  } catch (error) {
    throw error.response?.data?.message || error.message || 'Failed to fetch car details';
  }
};

export const getCarBidHistory = async (carId) => {
  try {
    const response = await api.get(`/admin/cars/${carId}/bids`);
    if (response.data.status && response.data.data) {
      return response.data.data;
    }
    throw new Error('Invalid response format');
  } catch (error) {
    throw error.response?.data?.message || error.message || 'Failed to fetch bid history';
  }
};

export const updateCarStatus = async (carId, status) => {
  try {
    const response = await api.put(`/admin/cars/${carId}/status`, { status });
    if (response.data.status) {
      return response.data.data;
    }
    throw new Error('Invalid response format');
  } catch (error) {
    throw error.response?.data?.message || error.message || 'Failed to update car status';
  }
};

const carService = {
  getCars,
  getCarDetails,
  getCarBidHistory,
  updateCarStatus
};

export default carService; 