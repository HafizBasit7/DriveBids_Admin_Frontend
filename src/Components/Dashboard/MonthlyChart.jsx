import React, { useState, useEffect } from 'react';
import {
  Card,
  Typography,
  Box,
  CircularProgress,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { getCarStats } from '../../api/services/dashboard.service';

const theme = {
  yellowBackground: "#F7DD2F",
  hoverBackground: "#6C5CD3",
  textColor: "white",
  buttoncolor: "#2F61BF",
  greycolor: "#aaa"
};

const MonthlyChart = () => {
  const [period, setPeriod] = useState('month');
  const [stats, setStats] = useState({
    listedCars: 0,
    soldCars: 0,
    totalRevenue: 0,
    averagePrice: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async (selectedPeriod) => {
    setLoading(true);
    try {
      const response = await getCarStats(selectedPeriod);
      if (response.status && response.data) {
        setStats(response.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch car stats');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats(period);
  }, [period]);

  const handlePeriodChange = (event, newPeriod) => {
    if (newPeriod !== null) {
      setPeriod(newPeriod);
    }
  };

  const chartData = [
    {
      name: 'Listed Cars',
      value: stats.listedCars,
      color: theme.buttoncolor
    },
    {
      name: 'Sold Cars',
      value: stats.soldCars,
      color: theme.yellowBackground
    }
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

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
    <Card sx={{ p: 2 ,mb:2}}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ color: theme.buttoncolor }}>
          Car Statistics
        </Typography>
        <ToggleButtonGroup
          value={period}
          exclusive
          onChange={handlePeriodChange}
          size="small"
        >
          <ToggleButton value="week">Week</ToggleButton>
          <ToggleButton value="month">Month</ToggleButton>
          <ToggleButton value="year">Year</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Box>
          <Typography variant="subtitle2" color="textSecondary">
            Total Revenue
          </Typography>
          <Typography variant="h6" sx={{ color: theme.buttoncolor }}>
            {formatCurrency(stats.totalRevenue)}
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" color="textSecondary">
            Average Price
          </Typography>
          <Typography variant="h6" sx={{ color: theme.buttoncolor }}>
            {formatCurrency(stats.averagePrice)}
          </Typography>
        </Box>
      </Box>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip 
            formatter={(value) => [`${value} cars`, 'Count']}
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              borderRadius: '4px',
              padding: '8px'
            }}
          />
          <Legend />
          <Bar dataKey="value" fill={theme.buttoncolor}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default MonthlyChart; 