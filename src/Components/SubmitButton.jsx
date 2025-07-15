import React from 'react';
import { Button, CircularProgress, Box } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import api from '../api/config';

const createUserAndCar = async (payload) => {
  const { data } = await api.post('/api/create-user-and-car', payload);
  return data;
};

const SubmitButton = ({ userData, carData, inspectionReport, damageReport }) => {
  const mutation = useMutation({
    mutationFn: () => {
      const userLocationName = userData.location?.name?.trim();
      const userCoordinates = Array.isArray(userData.location?.coordinates)
        ? userData.location.coordinates.map((val) => parseFloat(val)).filter((n) => !isNaN(n))
        : [];

      const carLocationName = carData.location?.name?.trim();
      const carCoordinates = Array.isArray(carData.location?.coordinates)
        ? carData.location.coordinates.map((val) => parseFloat(val)).filter((n) => !isNaN(n))
        : [];

      console.log("User Location:", userLocationName, userCoordinates);
      console.log("Car Location:", carLocationName, carCoordinates);

      if (!userLocationName || userCoordinates.length !== 2) {
        throw new Error('Please provide a valid user location.');
      }

      if (!carLocationName || carCoordinates.length !== 2) {
        throw new Error('Please provide a valid car location.');
      }

      return createUserAndCar({
        ...userData,
        location: {
          name: userLocationName,
          coordinates: userCoordinates,
        },
        carDetails: {
          ...carData,
          location: {
            name: carLocationName,
            coordinates: carCoordinates,
          },
        },
        inspectionReport,
        damageReport,
      });
    },
  });

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Button
        variant="contained"
        color="primary"
        disabled={mutation.isPending}
        onClick={() => mutation.mutate()}
        size="large"
      >
        {mutation.isPending ? <CircularProgress size={24} /> : 'Submit'}
      </Button>

      {mutation.isSuccess && (
        <Box mt={2} color="green">
          ✅ Success! User & Car created.
        </Box>
      )}

      {mutation.isError && (
        <Box mt={2} color="red">
          ❌ Error: {mutation.error.message}
        </Box>
      )}
    </Box>
  );
};

export default SubmitButton;
