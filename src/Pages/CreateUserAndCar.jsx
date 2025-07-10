// CreateUserAndCar.jsx
import {
  savedUserData,
  savedCarData,
  savedInspectionReport,
  savedDamageReport,
} from '../../data/saveData';
import React, { useState } from 'react';
import { Container, Typography, Box, Paper, Button, CircularProgress } from '@mui/material';
import UserForm from '../Components/UserForm';
import CarForm from '../Components/CarForm';
import InspectionReportForm from '../Components/InspectionReportForm';
import DamageReportForm from '../Components/DamageReportForm';
import SubmitButton from '../Components/SubmitButton';

import api from '../api/config';
import { useMutation } from '@tanstack/react-query';

const createUserAndCar = async (payload) => {
  const { data } = await api.post('/api/create-user-and-car', payload);
  return data;
};

const CreateUserAndCar = () => {
  const [userData, setUserData] = useState({});
  const [carData, setCarData] = useState({});
  const [inspectionReport, setInspectionReport] = useState({});
  const [damageReport, setDamageReport] = useState({});

 const quickSubmitMutation = useMutation({
  mutationFn: () => {
    const payload = {
      ...savedUserData,
      carDetails: savedCarData,
      inspectionReport: savedInspectionReport,
      damageReport: savedDamageReport,
    };

    console.log("Payload being submitted:", payload);
    return createUserAndCar(payload);
  },
  onSuccess: () => {
    alert('✅ Saved data submitted successfully!');
  },
  onError: (err) => {
    console.error('Quick Submit Error:', err);
    alert('❌ Failed to submit saved data.');
  },
});


  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        Create User & Post Car
      </Typography>

      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <UserForm userData={userData} setUserData={setUserData} />
      </Paper>

      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <CarForm carData={carData} setCarData={setCarData} />
      </Paper>

      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <InspectionReportForm
          inspectionReport={inspectionReport}
          setInspectionReport={setInspectionReport}
        />
      </Paper>

      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <DamageReportForm
          damageReport={damageReport}
          setDamageReport={setDamageReport}
        />
      </Paper>

      {/* ✅ Quick Submit Button for Saved Data */}
      <Box
        mt={4}
        sx={{
          textAlign: 'center',
          backgroundColor: '#f5f5f5',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      >
        <Typography
          variant="h6"
          sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}
        >
          🚀 Quick Submit with Saved Data
        </Typography>

        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: '#1976d2',
            paddingX: 4,
            paddingY: 1.5,
            fontSize: '1rem',
            fontWeight: 600,
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#125ea2',
            },
          }}
          onClick={() => quickSubmitMutation.mutate()}
          disabled={quickSubmitMutation.isPending}
        >
          {quickSubmitMutation.isPending ? (
            <CircularProgress size={24} sx={{ color: '#fff' }} />
          ) : (
            'Submit Saved Data'
          )}
        </Button>
      </Box>

      {/* Regular Live Form Submit Button */}
      <Box mt={3}>
        <SubmitButton
          userData={userData}
          carData={carData}
          inspectionReport={inspectionReport}
          damageReport={damageReport}
        />
      </Box>
    </Container>
  );
};

export default CreateUserAndCar;
