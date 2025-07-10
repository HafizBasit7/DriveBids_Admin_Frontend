// components/CreateUserAndCar/InspectionReportForm.jsx
import React from 'react';
import { Box, Typography, Grid, TextField, MenuItem } from '@mui/material';

const STATUS = [
  'OK',
  'Not Tested',
  'Requires Some Attention',
  'Requires Immediate Attention',
  'Not Applicable',
];

const InspectionReportForm = ({ inspectionReport, setInspectionReport }) => {
  const handleNestedChange = (section, field, value) => {
    setInspectionReport((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const dynamicOps = [
    'breakEfficiency',
    'handBrakeTest',
    'staticGearSelection',
    'reverseClutchSlip',
    'steeringNoise',
    'suspensionRideHeight',
  ];

  const essentialChecks = [
    'headLight',
    'sideLight',
    'brakeLight',
    'fogLight',
    'indicators',
    'electricWindows',
    'electricMirrors',
    'wipers',
  ];

  const interiorChecks = [
    'engineManagementLight',
    'breakWearIndicatorLight',
    'absWarningLight',
    'oilWarningLight',
    'airbagWarningLight',
    'glowPlugLight',
  ];

  const renderSection = (title, sectionKey, fields) => (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>{title}</Typography>
      <Grid container spacing={2}>
        {fields.map((field) => (
          <Grid item xs={12} sm={6} md={4} key={field}>
            <TextField
              select
              fullWidth
              label={field}
              value={inspectionReport?.[sectionKey]?.[field] || ''}
              onChange={(e) => handleNestedChange(sectionKey, field, e.target.value)}
            >
              {STATUS.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </TextField>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>Inspection Report</Typography>
      {renderSection('Dynamic Operations', 'dynamicOperations', dynamicOps)}
      {renderSection('Essential Checks', 'essentialChecks', essentialChecks)}
      {renderSection('Interior Checks', 'interiorChecks', interiorChecks)}
    </Box>
  );
};

export default InspectionReportForm;
