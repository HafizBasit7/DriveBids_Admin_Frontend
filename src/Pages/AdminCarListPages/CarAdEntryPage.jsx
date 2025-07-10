import React from 'react';
import { Box, Typography, Stack, Paper, Container } from '@mui/material';
import { DirectionsCar, Drafts, ArrowForwardIos } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const cardStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderRadius: '12px',
  padding: '20px',
  backgroundColor: 'white',
  cursor: 'pointer',
  transition: 'all 0.3s',
  boxShadow: '0px 4px 10px rgba(0,0,0,0.08)',
};

const CarAdEntryPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ color: '#2F61BF', fontWeight: 'bold', mb: 4 }}>
        Car Ad Management
      </Typography>

      <Stack spacing={4}>
        <Paper sx={cardStyle} onClick={() => navigate('/create-user-car/vehicle-register')}>
          <Box display="flex" alignItems="center" gap={2}>
            <DirectionsCar sx={{ fontSize: 36, color: 'black' }} />
            <Box>
              <Typography fontWeight={700} fontSize={20}>
                Post a New Car Ad
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Follow step-by-step form to create a car listing.
              </Typography>
            </Box>
          </Box>
          <ArrowForwardIos sx={{ fontSize: 22, color: '#999' }} />
        </Paper>

        <Paper sx={cardStyle} onClick={() => navigate('/create-user-car/drafts')}>
          <Box display="flex" alignItems="center" gap={2}>
            <Drafts sx={{ fontSize: 36, color: 'black' }} />
            <Box>
              <Typography fontWeight={700} fontSize={20}>
                View Drafts
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Manage saved but incomplete listings.
              </Typography>
            </Box>
          </Box>
          <ArrowForwardIos sx={{ fontSize: 22, color: '#999' }} />
        </Paper>
      </Stack>
    </Container>
  );
};

export default CarAdEntryPage;
