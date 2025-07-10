import React from 'react';
import { Container, Typography, Paper, Box, Divider } from '@mui/material';
import UserForm from '../Components/CreateUserCar//UserForm';
import CarForm from '../Components/CreateUserCar/CarForm';
import CarAdEntryPage from '../Pages/AdminCarListPages/CarAdEntryPage'

const theme = {
  buttoncolor: "#2F61BF",
};

const CreateUserCar = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ color: theme.buttoncolor, fontWeight: 'bold', mb: 3 }}>
        Create User & List Car
      </Typography>

      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            User Details
          </Typography>
          <UserForm />
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Car Listing Details
          </Typography>
          <CarAdEntryPage />
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateUserCar;
