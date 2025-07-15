// // CreateUserAndCar.jsx
// import {
//   savedUserData,
//   savedCarData,
//   savedInspectionReport,
//   savedDamageReport,
// } from '../../data/saveData';
// import React, { useState } from 'react';
// import { Container, Typography, Box, Paper, Button, CircularProgress } from '@mui/material';
// import UserForm from '../Components/UserForm';
// import CarForm from '../Components/CarForm';
// import InspectionReportForm from '../Components/InspectionReportForm';
// import DamageReportForm from '../Components/DamageReportForm';
// import SubmitButton from '../Components/SubmitButton';

// import api from '../api/config';
// import { useMutation } from '@tanstack/react-query';
// import LocationInput from '../../Location/LocationInput';
// import { uploadImage, uploadVideo  } from '../../utils/upload'


// const createUserAndCar = async (payload) => {
//   const { data } = await api.post('/api/create-user-and-car', payload);
//   return data;
// };

// const CreateUserAndCar = () => {
//   const [userData, setUserData] = useState({});
//   const [carData, setCarData] = useState({});
//   const [inspectionReport, setInspectionReport] = useState({});
//   const [damageReport, setDamageReport] = useState({});

//     // ✅ State to override saved data coordinates
//   const [savedUserLocation, setSavedUserLocation] = useState(savedUserData.location);
//   const [savedCarLocation, setSavedCarLocation] = useState(savedCarData.location);

//   const [savedUserImage, setSavedUserImage] = useState(savedUserData.imgUrl);
//   const [uploadingImage, setUploadingImage] = useState(false);

//   const [savedCarImages, setSavedCarImages] = useState(savedCarData.images || {});



//   const [uploadingCarMedia, setUploadingCarMedia] = useState(false);
//   const [carImagePreview, setCarImagePreview] = useState({});
//   const [carVideoPreview, setCarVideoPreview] = useState([]);




// const quickSubmitMutation = useMutation({
//   mutationFn: () => {
//     const payload = {
//       ...savedUserData,
//       imgUrl: savedUserImage, // ✅ use uploaded user profile image
//       location: savedUserLocation,
//       carDetails: {
//         ...savedCarData,
//         location: savedCarLocation,
//         images: savedCarImages, // ✅ use uploaded car images/videos
//       },
//       inspectionReport: savedInspectionReport,
//       damageReport: savedDamageReport,
//     };

//     console.log("✅ Final Payload being submitted:", payload);
//     return createUserAndCar(payload);
//   },
//   onSuccess: () => {
//     alert('✅ Saved data submitted successfully!');
//   },
//   onError: (err) => {
//     console.error('❌ Quick Submit Error:', err);
//     alert('❌ Failed to submit saved data.');
//   },
// });



// //For User Profile image
// const handleSavedUserImageUpload = async (e) => {
//   const file = e.target.files[0];
//   if (!file) return;
//   setUploadingImage(true);
//   const url = await uploadImage(file);
//   if (url) {
//     setSavedUserImage(url); // update preview
//     savedUserData.imgUrl = url; // sync to savedData.js
//   }
//   setUploadingImage(false);
// };


// //For Car images/Videos
// const handleSavedCarMediaUpload = async (e, group, type = 'image') => {
//   const files = Array.from(e.target.files);
//   if (files.length === 0) return;

//   setUploadingCarMedia(true);

//   const uploads = await Promise.all(
//     files.map(async (file) => {
//       const url = type === 'image' ? await uploadImage(file) : await uploadVideo(file);
//       return { url, type };
//     })
//   );

//   // Sync with savedCarData
//   // if (!savedCarData.images[group]) savedCarData.images[group] = [];
//   // savedCarData.images[group] = [...uploads];
//   // Clean placeholder images first (optional: only if they start with "https://via.placeholder")
// if (savedCarData.images[group]) {
//   savedCarData.images[group] = savedCarData.images[group].filter(
//     (item) => !item.url.includes('via.placeholder')
// );
// } else {
//   savedCarData.images[group] = [];
// }

// // Now push uploaded items
// savedCarData.images[group].push(...uploads);


//   // Preview (optional)
//   if (type === 'image') {
//     setCarImagePreview((prev) => ({
//       ...prev,
//       [group]: [...(prev[group] || []), ...uploads.map((u) => u.url)],
//     }));
//   } else {
//     setCarVideoPreview((prev) => [...prev, ...uploads.map((u) => u.url)]);
//   }

//   setUploadingCarMedia(false);
// };




//   return (
//     <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
//       <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
//         Create User & Post Car
//       </Typography>

//       <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
//         <UserForm userData={userData} setUserData={setUserData} />
//       </Paper>

//       <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
//         <CarForm carData={carData} setCarData={setCarData} />
//       </Paper>

//       <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
//         <InspectionReportForm
//           inspectionReport={inspectionReport}
//           setInspectionReport={setInspectionReport}
//         />
//       </Paper>

//       <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
//         <DamageReportForm
//           damageReport={damageReport}
//           setDamageReport={setDamageReport}
//         />
//       </Paper>

//       {/* ✅ Google Location Fields for Saved Data Sync */}
//       <Box mb={4}>
//         <Typography variant="h6" mb={1}>📍 Select User Location (for Saved Data)</Typography>
//         <LocationInput
//           value={savedUserLocation?.name}
//           handleChange={setSavedUserLocation}
//         />

//         <Typography variant="h6" mt={3} mb={1}>🚗 Select Car Location (for Saved Data)</Typography>
//         <LocationInput
//           value={savedCarLocation?.name}
//           handleChange={setSavedCarLocation}
//         />
//       </Box>

//       <Box mb={4}>
//   <Typography variant="h6" mb={1}>🖼️ Upload Profile Image (for Saved Data)</Typography>
//   <Button
//     variant="contained"
//     component="label"
//     disabled={uploadingImage}
//     sx={{ mb: 2 }}
//   >
//     {uploadingImage ? 'Uploading...' : 'Upload Profile Image'}
//     <input type="file" hidden accept="image/*" onChange={handleSavedUserImageUpload} />
//   </Button>
//   {savedUserImage && (
//     <Box>
//       <Typography variant="body2" color="text.secondary">Preview:</Typography>
//       <img src={savedUserImage} alt="Profile" style={{ width: 64, height: 64, borderRadius: '50%' }} />
//     </Box>
//   )}
// </Box>


// <Box mb={4}>
//   <Typography variant="h6" mb={2}>🖼️ Upload Car Images (for Saved Data)</Typography>

//   {['exterior', 'interior', 'wheels', 'tyreTreads'].map((group) => (
//     <Box key={group} mb={2}>
//       <Typography variant="subtitle1">{group} Images</Typography>
//       <Button variant="outlined" component="label" disabled={uploadingCarMedia}>
//         Upload {group}
//         <input
//           type="file"
//           accept="image/*"
//           multiple
//           hidden
//           onChange={(e) => handleSavedCarMediaUpload(e, group, 'image')}
//         />
//       </Button>
//       <Box display="flex" gap={1} mt={1} flexWrap="wrap">
//         {(carImagePreview[group] || []).map((url, i) => (
//           <img key={i} src={url} alt="car-preview" style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 4 }} />
//         ))}
//       </Box>
//     </Box>
//   ))}

//   <Typography variant="h6" mt={3} mb={1}>🎥 Upload Car Video</Typography>
//   <Button variant="outlined" component="label" disabled={uploadingCarMedia}>
//     Upload Video
//     <input
//       type="file"
//       accept="video/*"
//       hidden
//       onChange={(e) => handleSavedCarMediaUpload(e, 'carVideo', 'video')}
//     />
//   </Button>

//   <Box mt={1}>
//     {carVideoPreview.map((url, i) => (
//       <video key={i} src={url} controls width={150} style={{ marginRight: 10, marginTop: 10 }} />
//     ))}
//   </Box>
// </Box>



//       {/* ✅ Quick Submit Button for Saved Data */}
//       <Box
//         mt={4}
//         sx={{
//           textAlign: 'center',
//           backgroundColor: '#f5f5f5',
//           padding: '30px',
//           borderRadius: '12px',
//           boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//         }}
//       >
//         <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}>
//           🚀 Quick Submit with Saved Data
//         </Typography>

//         <Button
//           variant="contained"
//           size="large"
//           sx={{
//             backgroundColor: '#1976d2',
//             paddingX: 4,
//             paddingY: 1.5,
//             fontSize: '1rem',
//             fontWeight: 600,
//             textTransform: 'none',
//             '&:hover': { backgroundColor: '#125ea2' },
//           }}
//           onClick={() => quickSubmitMutation.mutate()}
//           disabled={quickSubmitMutation.isPending}
//         >
//           {quickSubmitMutation.isPending ? (
//             <CircularProgress size={24} sx={{ color: '#fff' }} />
//           ) : (
//             'Submit Saved Data'
//           )}
//         </Button>
//       </Box>

//       {/* Regular Live Form Submit Button */}
//       <Box mt={3}>
//         <SubmitButton
//           userData={userData}
//           carData={carData}
//           inspectionReport={inspectionReport}
//           damageReport={damageReport}
//         />
//       </Box>
//     </Container>
//   );
// };

// export default CreateUserAndCar;

// src/CreateUserAndCar.jsx
import React, { useState } from 'react';
import {
  Container,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Box,
  Paper,
  Fade,
  useTheme,
} from '@mui/material';
import RegularFlow from './RegularFlow';
import DirectFlow from './DirectFlow';

const CreateUserAndCar = () => {
  const [mode, setMode] = useState('regular');
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ mt: 6, mb: 8 }}>
      <Paper
        elevation={3}
        sx={{
          p: { xs: 3, sm: 5 },
          borderRadius: 4,
          background: theme.palette.background.paper,
          boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 3,
            fontWeight: 700,
            color: theme.palette.primary.main,
            textAlign: 'center',
          }}
        >
          Create User & Post Car
        </Typography>

        <Box display="flex" justifyContent="center" mb={4}>
          <ToggleButtonGroup
            value={mode}
            exclusive
            onChange={(e, newMode) => newMode && setMode(newMode)}
            color="primary"
            sx={{
              background: '#f3f6f9',
              borderRadius: '8px',
              p: 1,
              boxShadow: 'inset 0 0 5px rgba(0,0,0,0.05)',
            }}
          >
            <ToggleButton
              value="regular"
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                px: 3,
                py: 1,
                borderRadius: '6px !important',
              }}
            >
              📝 Regular Form
            </ToggleButton>
            <ToggleButton
              value="direct"
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                px: 3,
                py: 1,
                borderRadius: '6px !important',
              }}
            >
              🚀 Direct Submit
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Fade in={mode === 'regular'} timeout={500} unmountOnExit>
          <Box>{mode === 'regular' && <RegularFlow />}</Box>
        </Fade>

        <Fade in={mode === 'direct'} timeout={500} unmountOnExit>
          <Box>{mode === 'direct' && <DirectFlow />}</Box>
        </Fade>
      </Paper>
    </Container>
  );
};

export default CreateUserAndCar;


