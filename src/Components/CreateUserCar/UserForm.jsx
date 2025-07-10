import React from 'react';
import { Grid, TextField, MenuItem } from '@mui/material';

const UserForm = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Full Name" name="name" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Email" name="email" type="email" />
      </Grid>
      <Grid item xs={6} sm={3}>
        <TextField fullWidth label="Country Code" name="countryCode" />
      </Grid>
      <Grid item xs={6} sm={3}>
        <TextField fullWidth label="Phone Number" name="phoneNo" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          select
          label="User Type"
          name="type"
          defaultValue="individual"
        >
          <MenuItem value="individual">Individual</MenuItem>
          <MenuItem value="trader">Trader</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField fullWidth label="Location Name" name="locationName" />
      </Grid>
      <Grid item xs={12}>
        <TextField fullWidth label="Coordinates (lat, long)" name="coordinates" />
      </Grid>
      <Grid item xs={12}>
        <TextField fullWidth label="Business Address (only for Trader)" name="businessAddress" />
      </Grid>
      <Grid item xs={12}>
        <TextField fullWidth label="Profile Image URL" name="imgUrl" />
      </Grid>
    </Grid>
  );
};

export default UserForm;
