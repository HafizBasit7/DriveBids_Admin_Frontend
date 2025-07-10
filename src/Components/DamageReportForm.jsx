// components/CreateUserAndCar/DamageReportForm.jsx
import React from 'react';
import { Box, Typography, FormGroup, FormControlLabel, Checkbox } from '@mui/material';

const DamageReportForm = ({ damageReport, setDamageReport }) => {
  const handleChange = (e) => {
    const { name, checked } = e.target;
    setDamageReport((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>Damage Report</Typography>
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={damageReport?.scratches || false}
              onChange={handleChange}
              name="scratches"
            />
          }
          label="Scratches"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={damageReport?.dents || false}
              onChange={handleChange}
              name="dents"
            />
          }
          label="Dents"
        />
      </FormGroup>
    </Box>
  );
};

export default DamageReportForm;
