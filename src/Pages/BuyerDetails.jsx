import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  IconButton,
  Paper
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BuyerDetails from '../Components/User-comp/BuyerDetails';

const theme = {
  yellowBackground: "#F7DD2F",
  hoverBackground: "#6C5CD3",
  textColor: "white",
  buttoncolor: "#2F61BF",
  greycolor: "#aaa"
};

function BuyerDetailsPage() {
  const { userId } = useParams();
  const navigate = useNavigate();

  // Mock user data - replace with API call
  const user = {
    id: userId,
    name: 'John Doe',
    email: 'john@example.com'
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <IconButton 
            onClick={() => navigate('/users')}
            sx={{ mr: 2, color: theme.buttoncolor }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" sx={{ color: theme.buttoncolor, fontWeight: 'bold' }}>
            Buyer Details: {user.name}
          </Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1" sx={{ color: theme.greycolor }}>
            Email: {user.email}
          </Typography>
        </Box>
      </Paper>

      <BuyerDetails userId={userId} />
    </Container>
  );
}

export default BuyerDetailsPage; 