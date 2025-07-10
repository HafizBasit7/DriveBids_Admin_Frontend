// components/CreateUserAndCar/UserForm.jsx
import React, { useState } from 'react';
import {
  TextField,
  Grid,
  MenuItem,
  Typography,
  Button,
  Avatar,
  Box,
} from '@mui/material';
import { uploadImage } from '../../utils/upload';

const UserForm = ({ userData, setUserData }) => {
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      phoneNumber: { ...prev.phoneNumber, [name]: value },
    }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      location: { ...prev.location, [name]: value },
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const url = await uploadImage(file);
    if (url) setUserData((prev) => ({ ...prev, imgUrl: url }));
    setUploading(false);
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>User Information</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Email"
            name="email"
            fullWidth
            value={userData.email || ''}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Name"
            name="name"
            fullWidth
            value={userData.name || ''}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Type"
            name="type"
            select
            fullWidth
            value={userData.type || ''}
            onChange={handleChange}
          >
            <MenuItem value="individual">Individual</MenuItem>
            <MenuItem value="dealer">Dealer</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Business Address"
            name="businessAddress"
            fullWidth
            value={userData.businessAddress || ''}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={6} sm={3}>
          <TextField
            label="Country Code"
            name="countryCode"
            type="number"
            fullWidth
            value={userData.phoneNumber?.countryCode || ''}
            onChange={handlePhoneChange}
          />
        </Grid>

        <Grid item xs={6} sm={3}>
          <TextField
            label="Phone Number"
            name="phoneNo"
            type="number"
            fullWidth
            value={userData.phoneNumber?.phoneNo || ''}
            onChange={handlePhoneChange}
          />
        </Grid>

        <Grid item xs={6} sm={3}>
          <TextField
            label="Location Name"
            name="name"
            fullWidth
            value={userData.location?.name || ''}
            onChange={handleLocationChange}
          />
        </Grid>

<Grid item xs={6} sm={3}>
  <TextField
    label="Coordinates (e.g. 67.123,24.456)"
    name="coordinates"
    fullWidth
    value={
      Array.isArray(userData.location?.coordinates)
        ? userData.location.coordinates.join(',')
        : userData.location?.coordinates || ''
    }
    onChange={(e) => {
      const input = e.target.value;
      const [lngStr, latStr] = input.split(',').map((val) => val.trim());
      const lng = parseFloat(lngStr);
      const lat = parseFloat(latStr);

      if (!isNaN(lng) && !isNaN(lat)) {
        setUserData((prev) => ({
          ...prev,
          location: {
            ...prev.location,
            coordinates: [lng, lat],
          },
        }));
      } else {
        // fallback if invalid input, optionally keep raw string
        setUserData((prev) => ({
          ...prev,
          location: {
            ...prev.location,
            coordinates: input,
          },
        }));
      }
    }}
  />
</Grid>





        <Grid item xs={12} sm={6}>
          <Button variant="contained" component="label" disabled={uploading}>
            Upload Profile Image
            <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
          </Button>
          {userData.imgUrl && (
            <Avatar src={userData.imgUrl} sx={{ mt: 2, width: 64, height: 64 }} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserForm;
