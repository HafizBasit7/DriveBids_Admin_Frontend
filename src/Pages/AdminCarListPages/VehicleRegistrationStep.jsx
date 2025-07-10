import React from 'react';
import {
  Box,
  Typography,
  Stack,
  TextField,
  Button,
  Container,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const theme = {
  buttoncolor: '#2F61BF',
};

const VehicleRegistrationStep = () => {
  const navigate = useNavigate();

const handleNext = () => {
  navigate('/create-user-car/steps'); // absolute path
};


  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: theme.buttoncolor }}>
        Vehicle Registration
      </Typography>

      <Stack spacing={2}>
        <Typography variant="body1" sx={{ fontSize: 16 }}>
          Enter the vehicle’s registration number
        </Typography>

        <TextField
          label="Registration Number"
          placeholder="A12345"
          fullWidth
        />

        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Button
            variant="contained"
            onClick={handleNext}
            sx={{
              borderRadius: 1.5,
              backgroundColor: theme.buttoncolor,
              textTransform: 'none',
              px: 4,
              py: 1.2,
              fontWeight: 600,
            }}
          >
            Next
          </Button>
        </Box>
      </Stack>
    </Container>
  );
};

export default VehicleRegistrationStep;
