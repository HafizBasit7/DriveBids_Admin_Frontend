import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Paper,
  CircularProgress,
  Alert
} from '@mui/material';
import { getUserDetails } from '../../api/services/user.service';

const theme = {
  yellowBackground: "#F7DD2F",
  hoverBackground: "#6C5CD3",
  textColor: "white",
  buttoncolor: "#2F61BF",
  greycolor: "#aaa"
};

function SellerDetails({ userId }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserDetails();
  }, [userId]);

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      const response = await getUserDetails(userId);
      setUserData(response);
    } catch (err) {
      setError(err.message || 'Failed to fetch user details');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0
    }).format(price);
  };

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
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!userData?.sellerMetrics || userData.sellerMetrics.totalListed === 0) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="info">
          This user has no seller activity yet.
        </Alert>
      </Box>
    );
  }

  const { sellerMetrics } = userData;

  return (
    <Box>
      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ bgcolor: theme.buttoncolor, color: 'white' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Total Cars</Typography>
              <Typography variant="h4">{sellerMetrics.totalListed}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ bgcolor: theme.yellowBackground }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Active Auctions</Typography>
              <Typography variant="h4">{sellerMetrics.activeAuctions}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ bgcolor: '#4CAF50', color: 'white' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Sold Cars</Typography>
              <Typography variant="h4">{sellerMetrics.soldCars}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Card sx={{ bgcolor: theme.hoverBackground, color: 'white' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Total Bids</Typography>
              <Typography variant="h4">{sellerMetrics.totalBids}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Card sx={{ bgcolor: '#2196F3', color: 'white' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Total Revenue</Typography>
              <Typography variant="h4">{formatPrice(sellerMetrics.totalRevenue)}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Active Auctions Table */}
      {userData.activeAuctions && userData.activeAuctions.length > 0 ? (
        <>
          <Typography variant="h6" sx={{ mb: 2, color: theme.buttoncolor }}>
            Active Auctions
          </Typography>
          <TableContainer component={Paper} sx={{ maxHeight: 400, overflow: 'auto' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ bgcolor: theme.buttoncolor, color: 'white', fontWeight: 'bold' }}>Car</TableCell>
                  <TableCell sx={{ bgcolor: theme.buttoncolor, color: 'white', fontWeight: 'bold' }}>Start Price</TableCell>
                  <TableCell sx={{ bgcolor: theme.buttoncolor, color: 'white', fontWeight: 'bold' }}>Reserve Price</TableCell>
                  <TableCell sx={{ bgcolor: theme.buttoncolor, color: 'white', fontWeight: 'bold' }}>End Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userData.activeAuctions.map((auction, index) => (
                  <TableRow key={index} hover>
                    <TableCell>{auction.carName}</TableCell>
                    <TableCell>{formatPrice(auction.startingPrice)}</TableCell>
                    <TableCell>{formatPrice(auction.reservePrice)}</TableCell>
                    <TableCell>{new Date(auction.endDate).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <Alert severity="info" sx={{ mt: 2 }}>
          No active auctions available.
        </Alert>
      )}
    </Box>
  );
}

export default SellerDetails; 