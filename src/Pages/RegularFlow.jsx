import React, { useState } from 'react';
import { Paper, Box, Typography, Divider } from '@mui/material';
import UserForm from '../Components/UserForm';
import CarForm from '../Components/CarForm';
import InspectionReportForm from '../Components/InspectionReportForm';
import DamageReportForm from '../Components/DamageReportForm';
import SubmitButton from '../Components/SubmitButton';

const SectionCard = ({ title, icon, children }) => (
  <Paper
    elevation={3}
    sx={{
      p: { xs: 2, sm: 4 },
      mb: 4,
      borderRadius: 3,
      backgroundColor: '#fff',
      boxShadow: '0 6px 24px rgba(0, 0, 0, 0.04)',
    }}
  >
    <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mb: 2 }}>
      {icon} {title}
    </Typography>
    <Divider sx={{ mb: 3 }} />
    {children}
  </Paper>
);

const RegularFlow = () => {
  const [userData, setUserData] = useState({});
  const [carData, setCarData] = useState({});
  const [inspectionReport, setInspectionReport] = useState({});
  const [damageReport, setDamageReport] = useState({});

  return (
    <Box>
      <SectionCard title="User Information" icon="👤">
        <UserForm userData={userData} setUserData={setUserData} />
      </SectionCard>

      <SectionCard title="Car Details" icon="🚗">
        <CarForm carData={carData} setCarData={setCarData} />
      </SectionCard>

      <SectionCard title="Inspection Report" icon="🛠️">
        <InspectionReportForm
          inspectionReport={inspectionReport}
          setInspectionReport={setInspectionReport}
        />
      </SectionCard>

      <SectionCard title="Damage Report" icon="🔧">
        <DamageReportForm
          damageReport={damageReport}
          setDamageReport={setDamageReport}
        />
      </SectionCard>

      <Box textAlign="center" mt={4}>
        <SubmitButton
          userData={userData}
          carData={carData}
          inspectionReport={inspectionReport}
          damageReport={damageReport}
        />
      </Box>
    </Box>
  );
};

export default RegularFlow;
