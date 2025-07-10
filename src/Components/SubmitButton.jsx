import React from 'react';
import { Button, CircularProgress, Box } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import api from '../api/config';

const createUserAndCar = async (payload) => {
  const { data } = await api.post('/api/create-user-and-car', payload);
  return data;
};

// components/SubmitButton.jsx
const SubmitButton = ({ userData, carData, inspectionReport, damageReport }) => {
  const mutation = useMutation({
    mutationFn: () => {
      const name = userData.location?.name?.trim();
      const coordinates = Array.isArray(userData.location?.coordinates)
        ? userData.location.coordinates.map((val) => parseFloat(val)).filter((n) => !isNaN(n))
        : [];

      console.log("Location Name:", name);
      console.log("Coordinates Raw:", coordinates);

      if (!name || coordinates.length !== 2) {
        throw new Error('Please provide a valid user location name and coordinates.');
      }

      return createUserAndCar({
        ...userData,
        location: {
          name,
          coordinates,
        },
        carDetails: {
          ...carData,
          location: carData.location || {},
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
          Success! User & Car created.
        </Box>
      )}
      {mutation.isError && (
        <Box mt={2} color="red">
          Error: {mutation.error.message}
        </Box>
      )}
    </Box>
  );
};

export default SubmitButton;
