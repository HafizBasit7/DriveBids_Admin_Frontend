import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
  InputAdornment,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Search, Add } from '@mui/icons-material';
import axios from 'axios';

const colors = {
  buttoncolor: '#2F61BF',
};

const CarDetails1 = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [customMake, setCustomMake] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [makes, setMakes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMake, setSelectedMake] = useState('');

  useEffect(() => {
    fetchCarMakes();
  }, []);

  const fetchCarMakes = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/makes'); // Change to your actual endpoint
      setMakes(response.data?.Makes || []);
    } catch (error) {
      console.error('Failed to fetch makes', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectMake = (make) => {
    setSelectedMake(make);
    setSearchInput('');
  };

  const handleAddCustomMake = () => {
    if (!customMake.trim()) return;
    setSelectedMake(customMake.trim());
    setCustomMake('');
    setShowCustomInput(false);
  };

  const filteredMakes = searchInput
    ? makes.filter((m) =>
        m.make_display.toLowerCase().includes(searchInput.toLowerCase())
      )
    : selectedMake
    ? []
    : makes.slice(0, 8);

  return (
    <Box sx={{ width: '100%', mt: 6, px: 3 }}>
      <Typography variant="h5" fontWeight={600} color={colors.buttoncolor} mb={2}>
        Select Car Make
      </Typography>

      <TextField
        placeholder="Search car make"
        fullWidth
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 3 }}
      />

      {!showCustomInput ? (
        <Button
          variant="outlined"
          startIcon={<Add />}
          onClick={() => setShowCustomInput(true)}
          sx={{ mb: 2 }}
        >
          Add Custom Make
        </Button>
      ) : (
        <Box display="flex" gap={2} mb={2}>
          <TextField
            size="small"
            value={customMake}
            onChange={(e) => setCustomMake(e.target.value)}
            placeholder="Enter custom make"
            fullWidth
          />
          <Button variant="contained" onClick={handleAddCustomMake}>
            Add
          </Button>
        </Box>
      )}

      {selectedMake && (
        <Box
          sx={{
            border: `2px solid ${colors.buttoncolor}`,
            borderRadius: 2,
            p: 1.5,
            mb: 3,
            backgroundColor: `${colors.buttoncolor}15`,
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <img
            src={`https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/${selectedMake.toLowerCase()}.png`}
            alt={`${selectedMake} logo`}
            width={35}
            height={35}
            style={{ objectFit: 'contain' }}
            onError={(e) => {
              e.target.src =
                'https://www.shutterstock.com/image-vector/car-logo-icon-emblem-design-600nw-473088037.jpg';
            }}
          />
          <Typography fontWeight={500}>{selectedMake}</Typography>
        </Box>
      )}

      <Grid container spacing={2}>
        {loading ? (
          <CircularProgress sx={{ mx: 'auto', my: 5 }} />
        ) : filteredMakes.length === 0 ? (
          <Typography sx={{ color: '#666', px: 2 }}>No makes found</Typography>
        ) : (
          filteredMakes.map((make, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Box
                onClick={() => handleSelectMake(make.make_display)}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  border: `2px solid ${
                    selectedMake === make.make_display ? colors.buttoncolor : '#D9D9D9'
                  }`,
                  backgroundColor:
                    selectedMake === make.make_display ? `${colors.buttoncolor}15` : 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  '&:hover': {
                    backgroundColor: `${colors.buttoncolor}10`,
                  },
                }}
              >
                <img
                  src={`https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/${make.make_display.toLowerCase()}.png`}
                  alt={`${make.make_display} logo`}
                  width={35}
                  height={35}
                  style={{ objectFit: 'contain' }}
                  onError={(e) => {
                    e.target.src =
                      'https://www.shutterstock.com/image-vector/car-logo-icon-emblem-design-600nw-473088037.jpg';
                  }}
                />
                <Typography>{make.make_display}</Typography>
              </Box>
            </Grid>
          ))
        )}
      </Grid>

      <Box display="flex" justifyContent="flex-end" mt={4}>
        <Button
          variant="contained"
          disabled={!selectedMake}
          sx={{
            backgroundColor: colors.buttoncolor,
            textTransform: 'none',
            px: 4,
            py: 1.2,
            fontWeight: 600,
          }}
          onClick={() => navigate('/create-user-car/variant')}
        >
          Next Step
        </Button>
      </Box>
    </Box>
  );
};

export default CarDetails1;
