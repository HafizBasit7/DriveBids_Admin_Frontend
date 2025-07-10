import React from 'react';
import { Container, Typography } from '@mui/material';
import StatsCards from '../Components/Dashboard/StatsCards';
import MonthlyChart from '../Components/Dashboard/MonthlyChart';
import StatusChart from '../Components/Dashboard/StatusChart';

const theme = {
  yellowBackground: "#F7DD2F",
  hoverBackground: "#6C5CD3",
  textColor: "white",
  buttoncolor: "#2F61BF",
  greycolor: "#aaa"
};

function Dashboard() {
  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Typography variant="h4" sx={{ mb: 3, color: theme.buttoncolor, fontWeight: 'bold' }}>
        Dashboard Overview
      </Typography>
      
      {/* Stats Cards */}
      <StatsCards />

      {/* Monthly Chart */}
      <MonthlyChart />

      {/* Status Distribution Chart */}
      <StatusChart />
    </Container>
  );
}

export default Dashboard;