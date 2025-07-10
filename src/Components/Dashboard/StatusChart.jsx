import React, { useState, useEffect } from 'react';
import {
  Card,
  Typography,
  CircularProgress,
  Box
} from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { getDashboardStats } from '../../api/services/dashboard.service';

const theme = {
  yellowBackground: "#F7DD2F",
  hoverBackground: "#6C5CD3",
  textColor: "white",
  buttoncolor: "#2F61BF",
  greycolor: "#aaa"
};

const StatusChart = () => {
  const [stats, setStats] = useState({
    activeAuctions: 0,
    soldCars: 0,
    draftCars: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getDashboardStats();
        if (response.status && response.data) {
          setStats({
            activeAuctions: response.data.activeAuctions,
            soldCars: response.data.soldCars,
            draftCars: response.data.draftCars
          });
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch status data');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const pieData = [
    { name: 'Active Auctions', value: stats.activeAuctions, color: theme.buttoncolor },
    { name: 'Sold Cars', value: stats.soldCars, color: theme.yellowBackground },
    { name: 'Draft Cars', value: stats.draftCars, color: theme.greycolor },
  ];

  if (loading) {
    return (
      <Card sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
          <CircularProgress />
        </Box>
      </Card>
    );
  }

  if (error) {
    return (
      <Card sx={{ p: 2 }}>
        <Typography color="error" sx={{ textAlign: 'center', mt: 2 }}>
          {error}
        </Typography>
      </Card>
    );
  }

  return (
    <Card sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, color: theme.buttoncolor }}>
        Car Status Distribution
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            outerRadius={150}
            dataKey="value"
            label={({ name, value }) => `${name}: ${value}`}
            labelLine={true}
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value, name) => [`${value} cars`, name]}
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              borderRadius: '4px',
              padding: '8px'
            }}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            formatter={(value) => <span style={{ color: '#666' }}>{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default StatusChart; 