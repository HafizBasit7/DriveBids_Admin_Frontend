import { useMutation } from '@tanstack/react-query';
import api from '../src/api/config';

const createUserAndCar = async (data) => {
  const response = await api.post('/api/create-user-and-car', data);
  return response.data;
};

export const useCreateUserAndCar = () =>
  useMutation({ mutationFn: createUserAndCar });
