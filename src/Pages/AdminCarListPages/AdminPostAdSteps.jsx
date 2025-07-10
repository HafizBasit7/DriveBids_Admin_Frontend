import React from 'react';
import {
  Box,
  Typography,
  Stack,
  LinearProgress,
  Button,
  Container,
} from '@mui/material';
import {
  Article,
  DirectionsCar,
  Image,
  GppGood,
  Report,
  MonetizationOn,
  ArrowForwardIos,
  CheckCircle,
  Cancel,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const theme = {
  buttoncolor: '#2F61BF',
};

const stepData = [
  { title: 'Car Details', icon: <Article fontSize="large" />, steps: 14, completed: true },
  { title: 'Car Features', icon: <DirectionsCar fontSize="large" />, steps: 2, completed: true },
  { title: 'Car Images & Video', icon: <Image fontSize="large" />, steps: 5, completed: false },
  { title: 'Inspection Report', icon: <GppGood fontSize="large" />, steps: 3, completed: false },
  { title: 'Damage Report', icon: <Report fontSize="large" />, steps: 4, completed: false },
  { title: 'Car Pricing', icon: <MonetizationOn fontSize="large" />, steps: 4, completed: false },
];

const AdminPostAdSteps = () => {
  const navigate = useNavigate();
  const total = stepData.length;
  const completed = stepData.filter(step => step.completed).length;
  const progress = Math.round((completed / total) * 100);

  const handleStepClick = (index) => {
    navigate(`/create-user-car/step-${index + 1}`);
  };

  const handleSubmit = () => {
    // Submission logic (to be integrated)
    console.log('Submit final ad data');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
      <Box
        sx={{
          backgroundColor: '#fff',
          borderRadius: 2,
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          border: '1px solid #f0f0f0',
          p: 3,
        }}
      >
        {/* Header */}
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h6" fontWeight="bold">
            Post Ad Progress
          </Typography>
          <Box
            sx={{
              backgroundColor: theme.buttoncolor,
              color: 'white',
              px: 2,
              py: 0.5,
              borderRadius: 2,
              fontWeight: 600,
              fontSize: '0.85rem',
            }}
          >
            {progress}% Complete
          </Box>
        </Box>

        {/* Progress Bar */}
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 10,
            borderRadius: 5,
            backgroundColor: '#F2EFF2',
            '& .MuiLinearProgress-bar': {
              backgroundColor: theme.buttoncolor,
            },
          }}
        />

        <Box display="flex" justifyContent="space-between" mt={1}>
          <Typography variant="body2" color="text.secondary">
            {completed} of {total} steps completed
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {total - completed} remaining
          </Typography>
        </Box>

        {/* Step Cards */}
        <Stack spacing={2} mt={4}>
          {stepData.map((step, index) => (
            <Box
              key={index}
              onClick={() => handleStepClick(index)}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                border: '1px solid #D9D9D9',
                borderRadius: 2,
                p: 2,
                cursor: 'pointer',
                backgroundColor: '#fff',
                '&:hover': { backgroundColor: '#f9f9f9' },
              }}
            >
              <Box display="flex" alignItems="center" gap={2}>
                <Box
                  sx={{
                    minWidth: 50,
                    minHeight: 50,
                    backgroundColor: step.completed ? theme.buttoncolor : '#F2EFF2',
                    color: step.completed ? 'white' : '#6F6F6F',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 1,
                  }}
                >
                  {step.icon}
                </Box>
                <Box>
                  <Typography fontWeight={600}>{step.title}</Typography>
                  <Box display="flex" alignItems="center" gap={0.5} mt={0.5}>
                    {step.completed ? (
                      <CheckCircle sx={{ fontSize: 18, color: theme.buttoncolor }} />
                    ) : (
                      <Cancel sx={{ fontSize: 18, color: '#6F6F6F' }} />
                    )}
                    <Typography
                      variant="body2"
                      color={step.completed ? theme.buttoncolor : '#6F6F6F'}
                    >
                      {step.completed ? 'Complete' : 'Incomplete'}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" gap={2}>
                <Typography fontSize={14} color="text.secondary">
                  {step.steps} Steps
                </Typography>
                <ArrowForwardIos fontSize="small" />
              </Box>
            </Box>
          ))}
        </Stack>

        {/* Final Submit Button */}
        {completed === total && (
          <Box display="flex" justifyContent="flex-end" mt={4}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                backgroundColor: theme.buttoncolor,
                borderRadius: 2,
                px: 4,
                py: 1.2,
                fontWeight: 600,
              }}
            >
              Post Ad
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default AdminPostAdSteps;
