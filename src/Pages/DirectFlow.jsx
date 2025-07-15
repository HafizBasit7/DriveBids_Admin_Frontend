// src/Flows/DirectFlow.jsx
import React, { useState } from 'react';
import { Box, Typography, Button, CircularProgress, Paper } from '@mui/material';
import LocationInput from '../../Location/LocationInput';
import { uploadImage, uploadVideo } from '../../utils/upload';
import {
  savedUserData,
  savedCarData,
  savedInspectionReport,
  savedDamageReport,
} from '../../data/saveData';
import { useMutation } from '@tanstack/react-query';
import api from '../api/config';

const createUserAndCar = async (payload) => {
  const { data } = await api.post('/api/create-user-and-car', payload);
  return data;
};

const DirectFlow = () => {
  const [savedUserLocation, setSavedUserLocation] = useState(savedUserData.location);
  const [savedCarLocation, setSavedCarLocation] = useState(savedCarData.location);
  const [savedUserImage, setSavedUserImage] = useState(savedUserData.imgUrl);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [savedCarImages, setSavedCarImages] = useState(savedCarData.images || {});
  const [uploadingCarMedia, setUploadingCarMedia] = useState(false);
  const [carImagePreview, setCarImagePreview] = useState({});
  const [carVideoPreview, setCarVideoPreview] = useState([]);

  const quickSubmitMutation = useMutation({
    mutationFn: () => {
      const payload = {
        ...savedUserData,
        imgUrl: savedUserImage,
        location: savedUserLocation,
        carDetails: {
          ...savedCarData,
          location: savedCarLocation,
          images: savedCarImages,
        },
        inspectionReport: savedInspectionReport,
        damageReport: savedDamageReport,
      };
      return createUserAndCar(payload);
    },
    onSuccess: () => {
      alert('✅ Saved data submitted successfully!');
    },
    onError: (err) => {
      console.error('❌ Quick Submit Error:', err);
      alert('❌ Failed to submit saved data.');
    },
  });

  const handleSavedUserImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingImage(true);
    const url = await uploadImage(file);
    if (url) {
      setSavedUserImage(url);
      savedUserData.imgUrl = url;
    }
    setUploadingImage(false);
  };

  const handleSavedCarMediaUpload = async (e, group, type = 'image') => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploadingCarMedia(true);

    const uploads = await Promise.all(
      files.map(async (file) => {
        const url = type === 'image' ? await uploadImage(file) : await uploadVideo(file);
        return { url, type };
      })
    );

    if (savedCarData.images[group]) {
      savedCarData.images[group] = savedCarData.images[group].filter(
        (item) => !item.url.includes('via.placeholder')
      );
    } else {
      savedCarData.images[group] = [];
    }
    savedCarData.images[group].push(...uploads);

    if (type === 'image') {
      setCarImagePreview((prev) => ({
        ...prev,
        [group]: [...(prev[group] || []), ...uploads.map((u) => u.url)],
      }));
    } else {
      setCarVideoPreview((prev) => [...prev, ...uploads.map((u) => u.url)]);
    }

    setUploadingCarMedia(false);
  };

  return (
    <>
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" mb={1}>📍 User Location</Typography>
        <LocationInput
          value={savedUserLocation?.name}
          handleChange={setSavedUserLocation}
        />

        <Typography variant="h6" mt={3} mb={1}>🚗 Car Location</Typography>
        <LocationInput
          value={savedCarLocation?.name}
          handleChange={setSavedCarLocation}
        />
      </Paper>

      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" mb={1}>🖼️ Upload Profile Image</Typography>
        <Button
          variant="contained"
          component="label"
          disabled={uploadingImage}
          sx={{ mb: 2 }}
        >
          {uploadingImage ? 'Uploading...' : 'Upload Profile Image'}
          <input type="file" hidden accept="image/*" onChange={handleSavedUserImageUpload} />
        </Button>
        {savedUserImage && (
          <Box>
            <img src={savedUserImage} alt="Profile" style={{ width: 64, height: 64, borderRadius: '50%' }} />
          </Box>
        )}
      </Paper>

      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" mb={2}>🖼️ Upload Car Images</Typography>
        {['exterior', 'interior', 'wheels', 'tyreTreads'].map((group) => (
          <Box key={group} mb={2}>
            <Typography variant="subtitle1">{group} Images</Typography>
            <Button variant="outlined" component="label" disabled={uploadingCarMedia}>
              Upload {group}
              <input
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={(e) => handleSavedCarMediaUpload(e, group, 'image')}
              />
            </Button>
            <Box display="flex" gap={1} mt={1} flexWrap="wrap">
              {(carImagePreview[group] || []).map((url, i) => (
                <img key={i} src={url} alt="car-preview" style={{ width: 64, height: 64, objectFit: 'cover' }} />
              ))}
            </Box>
          </Box>
        ))}

        <Typography variant="h6" mt={3} mb={1}>🎥 Upload Car Video</Typography>
        <Button variant="outlined" component="label" disabled={uploadingCarMedia}>
          Upload Video
          <input
            type="file"
            accept="video/*"
            hidden
            onChange={(e) => handleSavedCarMediaUpload(e, 'carVideo', 'video')}
          />
        </Button>

        <Box mt={1}>
          {carVideoPreview.map((url, i) => (
            <video key={i} src={url} controls width={150} style={{ marginRight: 10, marginTop: 10 }} />
          ))}
        </Box>
      </Paper>

      <Box
        mt={4}
        sx={{
          textAlign: 'center',
          backgroundColor: '#f5f5f5',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      >
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}>
          🚀 Quick Submit with Saved Data
        </Typography>

        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: '#1976d2',
            paddingX: 4,
            paddingY: 1.5,
            fontSize: '1rem',
            fontWeight: 600,
            textTransform: 'none',
            '&:hover': { backgroundColor: '#125ea2' },
          }}
          onClick={() => quickSubmitMutation.mutate()}
          disabled={quickSubmitMutation.isPending}
        >
          {quickSubmitMutation.isPending ? (
            <CircularProgress size={24} sx={{ color: '#fff' }} />
          ) : (
            'Submit Saved Data'
          )}
        </Button>
      </Box>
    </>
  );
};

export default DirectFlow;
