import React from 'react';
import { Grid, TextField, MenuItem } from '@mui/material';

const CarForm = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Car Title" name="title" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Make" name="make" />
      </Grid>
      <Grid item xs={6}>
        <TextField fullWidth label="Model" name="model" />
      </Grid>
      <Grid item xs={6}>
        <TextField fullWidth label="Year" name="year" />
      </Grid>
      <Grid item xs={6}>
        <TextField fullWidth label="Mileage (km)" name="mileage" />
      </Grid>
      <Grid item xs={6}>
        <TextField fullWidth label="Price ($)" name="price" />
      </Grid>
      <Grid item xs={6}>
        <TextField fullWidth select label="Transmission" name="transmission">
          <MenuItem value="automatic">Automatic</MenuItem>
          <MenuItem value="manual">Manual</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={6}>
        <TextField fullWidth select label="Fuel Type" name="fuel">
          <MenuItem value="petrol">Petrol</MenuItem>
          <MenuItem value="diesel">Diesel</MenuItem>
          <MenuItem value="hybrid">Hybrid</MenuItem>
          <MenuItem value="electric">Electric</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Image URLs (comma separated)"
          name="images"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField fullWidth label="Description" name="description" multiline rows={4} />
      </Grid>
    </Grid>
  );
};

export default CarForm;
