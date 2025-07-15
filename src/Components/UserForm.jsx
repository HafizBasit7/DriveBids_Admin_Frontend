import React, { useState } from 'react';
import {
  TextField,
  Grid,
  MenuItem,
  Typography,
  Button,
  Avatar,
  Box,
  Stack,
  CircularProgress,
} from '@mui/material';
import { uploadImage } from '../../utils/upload';
import LocationInput from "../../Location/LocationInput";

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
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
       
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Full Name"
            name="name"
            fullWidth
            value={userData.name || ''}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Email Address"
            name="email"
            fullWidth
            value={userData.email || ''}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="User Type"
            name="type"
            select
            fullWidth
            value={userData.type || ''}
            onChange={handleChange}
            variant="outlined"
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
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Stack direction="row" spacing={2}>
            <TextField
              label="Country Code"
              name="countryCode"
              type="text"
              fullWidth
              value={userData.phoneNumber?.countryCode || ''}
              onChange={handlePhoneChange}
              variant="outlined"
            />
            <TextField
              label="Phone Number"
              name="phoneNo"
              type="text"
              fullWidth
              value={userData.phoneNumber?.phoneNo || ''}
              onChange={handlePhoneChange}
              variant="outlined"
            />
          </Stack>
        </Grid>

        <Grid item xs={12} sm={6}>
          <LocationInput
            value={userData.location?.name || ''}
            handleChange={(location) =>
              setUserData((prev) => ({
                ...prev,
                location,
              }))
            }
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Stack spacing={2}>
            <Button
              variant="contained"
              component="label"
              disabled={uploading}
              sx={{ width: 'fit-content' }}
            >
              {uploading ? <CircularProgress size={20} sx={{ color: 'white', mr: 1 }} /> : 'Upload Profile Image'}
              <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
            </Button>

            {userData.imgUrl && (
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Preview:
                </Typography>
                <Avatar
                  src={userData.imgUrl}
                  sx={{ width: 64, height: 64, borderRadius: '8px', mt: 1 }}
                  variant="rounded"
                />
              </Box>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserForm;
