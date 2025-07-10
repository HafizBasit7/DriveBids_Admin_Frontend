import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  CircularProgress
} from '@mui/material';
import {
  DirectionsCar,
  People,
  Timer,
  CheckCircle,
  Drafts
} from '@mui/icons-material';
import { getDashboardStats } from '../../api/services/dashboard.service';

const theme = {
  yellowBackground: "#F7DD2F",
  hoverBackground: "#6C5CD3",
  textColor: "white",
  buttoncolor: "#2F61BF",
  greycolor: "#aaa"
};

const StatsCards = () => {
  const [stats, setStats] = useState({
    totalCars: 0,
    activeAuctions: 0,
    soldCars: 0,
    draftCars: 0,
    totalUsers: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getDashboardStats();
        if (response.status && response.data) {
          setStats(response.data);
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch dashboard stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {[
        { title: 'Total Cars', value: stats.totalCars, icon: <DirectionsCar />, color: theme.buttoncolor },
        { title: 'Active Auctions', value: stats.activeAuctions, icon: <Timer />, color: theme.hoverBackground },
        { title: 'Sold Cars', value: stats.soldCars, icon: <CheckCircle />, color: '#4CAF50' },
        { title: 'Draft Cars', value: stats.draftCars, icon: <Drafts />, color: '#FF9800' },
        { title: 'Total Users', value: stats.totalUsers, icon: <People />, color: '#9C27B0' },
      ].map((stat, index) => (
        <Grid item xs={12} sm={6} md={2.4} key={index}>
          <Card sx={{ background: 'linear-gradient(135deg, #fff 0%, #f8f8f8 100%)', boxShadow: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    {stat.title}
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: stat.color }}>
                    {stat.value}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: stat.color, width: 46, height: 46,ml:1,mt:1 }}>
                  {stat.icon}
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatsCards; 