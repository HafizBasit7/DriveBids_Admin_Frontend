// components/CreateUserAndCar/CarForm.jsx
import React, { useState } from 'react';
import {
  Grid,
  TextField,
  Typography,
  Button,
  Box,
  MenuItem
} from '@mui/material';
import { uploadImage, uploadVideo } from "../../utils/upload";


const CarForm = ({ carData, setCarData }) => {
const [coordinateInput, setCoordinateInput] = useState(() => {
  const coords = carData.location?.coordinates;
  if (Array.isArray(coords)) return coords.join(',');
  if (typeof coords === 'string') return coords;
  return '';
});


  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setCarData((prev) => ({
      ...prev,
      location: { ...prev.location, [name]: value },
    }));
  };

const handleCoordinateChange = (e) => {
  const input = e.target.value;
  setCoordinateInput(input); // store typed text

  const [lngStr, latStr] = input.split(',').map((val) => val.trim());
  const lng = parseFloat(lngStr);
  const lat = parseFloat(latStr);

  if (!isNaN(lng) && !isNaN(lat)) {
    setCarData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        coordinates: [lng, lat],
      },
    }));
  } else {
    // fallback: store raw string
    setCarData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        coordinates: input,
      },
    }));
  }
};



  const handleFeaturesChange = (type, value) => {
    setCarData((prev) => ({
      ...prev,
      features: { ...prev.features, [type]: value.split(',').map((f) => f.trim()) },
    }));
  };

  const handleUpload = async (e, group, fileType = 'image') => {
    const files = Array.from(e.target.files);
    setUploading(true);

    const uploads = await Promise.all(
      files.map(async (file) => {
        const url = fileType === 'image' ? await uploadImage(file) : await uploadVideo(file);
        return { url, type: fileType };
      })
    );

    setCarData((prev) => ({
      ...prev,
      images: {
        ...prev.images,
        [group]: [...(prev.images?.[group] || []), ...uploads],
      },
    }));

    setUploading(false);
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>Car Details</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Registration No"
            name="regNo"
            fullWidth
            value={carData.regNo || ''}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Title"
            name="title"
            fullWidth
            value={carData.title || ''}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Description"
            name="description"
            fullWidth
            multiline
            rows={2}
            value={carData.description || ''}
            onChange={handleChange}
          />
        </Grid>

        {['exterior', 'interior', 'wheels', 'tyreTreads'].map((group) => (
          <Grid item xs={12} key={group}>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              disabled={uploading}
            >
              Upload {group} Images
              <input
                type="file"
                hidden
                accept="image/*"
                multiple
                onChange={(e) => handleUpload(e, group, 'image')}
              />
            </Button>
          </Grid>
        ))}

        <Grid item xs={12}>
          <Button
            variant="outlined"
            component="label"
            fullWidth
            disabled={uploading}
          >
            Upload Car Video
            <input
              type="file"
              hidden
              accept="video/*"
              onChange={(e) => handleUpload(e, 'carVideo', 'video')}
            />
          </Button>
        </Grid>

        {/* Features */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Exterior Features (comma separated)"
            fullWidth
            value={carData.features?.exterior?.join(', ') || ''}
            onChange={(e) => handleFeaturesChange('exterior', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Interior Features (comma separated)"
            fullWidth
            value={carData.features?.interior?.join(', ') || ''}
            onChange={(e) => handleFeaturesChange('interior', e.target.value)}
          />
        </Grid>

        {[
          ['staringBidPrice', 'Starting Bid Price'],
          ['reserveBidPrice', 'Reserve Bid Price'],
          ['buyNowPrice', 'Buy Now Price'],
          ['traderDiscount', 'Trader Discount'],
          ['noOfOwners', 'No of Owners'],
          ['horsePower', 'Horse Power'],
          ['mileage', 'Mileage'],
          ['engineSize', 'Engine Size'],
        ].map(([key, label]) => (
          <Grid item xs={12} sm={6} key={key}>
            <TextField
              label={label}
              name={key}
              fullWidth
              type="number"
              value={carData[key] || ''}
              onChange={handleChange}
            />
          </Grid>
        ))}

        <Grid item xs={12} sm={6}>
          <TextField
            label="Accident History"
            name="accidentHistory"
            fullWidth
            value={carData.accidentHistory || ''}
            onChange={handleChange}
          />
        </Grid>

        {[
          ['make', 'Make'],
          ['variant', 'Variant'],
          ['color', 'Color'],
        ].map(([key, label]) => (
          <Grid item xs={12} sm={6} key={key}>
            <TextField
              label={label}
              name={key}
              fullWidth
              value={carData[key] || ''}
              onChange={handleChange}
            />
          </Grid>
        ))}

        <Grid item xs={12} sm={6}>
          <TextField
            label="Model (Year)"
            name="model"
            type="number"
            fullWidth
            value={carData.model || ''}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Condition"
            name="condition"
            select
            fullWidth
            value={carData.condition || ''}
            onChange={handleChange}
          >
            {['Poor', 'Fair', 'Good', 'Excellent'].map((c) => (
              <MenuItem key={c} value={c}>{c}</MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={6} sm={3}>
          <TextField
            label="Fuel Type"
            name="fuel"
            select
            fullWidth
            value={carData.fuel || ''}
            onChange={handleChange}
          >
            {['Petrol', 'Diesel', 'HI-Octane', 'Electric', 'Hybrid'].map((f) => (
              <MenuItem key={f} value={f}>{f}</MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={6} sm={3}>
          <TextField
            label="Transmission"
            name="transmission"
            select
            fullWidth
            value={carData.transmission || ''}
            onChange={handleChange}
          >
            {['Manual', 'CVT', 'DCT', 'AMT', 'AGS', 'EV'].map((t) => (
              <MenuItem key={t} value={t}>{t}</MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={6} sm={3}>
          <TextField
            label="Location Name"
            name="name"
            fullWidth
            value={carData.location?.name || ''}
            onChange={handleLocationChange}
          />
        </Grid>

        <Grid item xs={6} sm={3}>
        <TextField
  label="Coordinates"
  fullWidth
  value={coordinateInput}
  onChange={handleCoordinateChange}
  placeholder="e.g. 31.5204, 74.3587"
/>

        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Posted On"
            name="postedOn"
            type="datetime-local"
            fullWidth
            value={carData.postedOn || ''}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Auction Duration (End Time)"
            name="duration"
            type="datetime-local"
            fullWidth
            value={carData.duration || ''}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CarForm;
