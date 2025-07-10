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

function BuyerDetails({ userId }) {
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

  if (!userData?.buyerMetrics || userData.buyerMetrics.totalBids === 0) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="info">
          This user has no buyer activity yet.
        </Alert>
      </Box>
    );
  }

  const { buyerMetrics } = userData;

  return (
    <Box>
      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ bgcolor: theme.buttoncolor, color: 'white' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Total Bids</Typography>
              <Typography variant="h4">{buyerMetrics.totalBids}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ bgcolor: '#4CAF50', color: 'white' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Won Auctions</Typography>
              <Typography variant="h4">{buyerMetrics.wonAuctions}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ bgcolor: theme.yellowBackground }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Active Bids</Typography>
              <Typography variant="h4">{buyerMetrics.activeBids}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Card sx={{ bgcolor: theme.hoverBackground, color: 'white' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Total Spent</Typography>
              <Typography variant="h4">{formatPrice(buyerMetrics.totalSpent)}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Card sx={{ bgcolor: '#2196F3', color: 'white' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Average Bid</Typography>
              <Typography variant="h4">{formatPrice(buyerMetrics.averageBid)}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Bid History Table */}
      {userData.bidHistory && userData.bidHistory.length > 0 ? (
        <>
          <Typography variant="h6" sx={{ mb: 2, color: theme.buttoncolor }}>
            Bid History
          </Typography>
          <TableContainer component={Paper} sx={{ maxHeight: 400, overflow: 'auto' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ bgcolor: theme.buttoncolor, color: 'white', fontWeight: 'bold' }}>Car</TableCell>
                  <TableCell sx={{ bgcolor: theme.buttoncolor, color: 'white', fontWeight: 'bold' }}>Bid Amount</TableCell>
                  <TableCell sx={{ bgcolor: theme.buttoncolor, color: 'white', fontWeight: 'bold' }}>Bid Time</TableCell>
                  <TableCell sx={{ bgcolor: theme.buttoncolor, color: 'white', fontWeight: 'bold' }}>Auction End</TableCell>
                  <TableCell sx={{ bgcolor: theme.buttoncolor, color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userData.bidHistory.map((bid, index) => (
                  <TableRow key={index} hover>
                    <TableCell>{bid.carName}</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: theme.buttoncolor }}>
                      {formatPrice(bid.bidAmount)}
                    </TableCell>
                    <TableCell>{new Date(bid.bidTime).toLocaleString()}</TableCell>
                    <TableCell>{new Date(bid.auctionEnd).toLocaleString()}</TableCell>
                    <TableCell>
                      <Chip 
                        label={bid.status}
                        sx={{ 
                          bgcolor: bid.status === 'won' ? '#4CAF50' : bid.status === 'lost' ? '#f44336' : theme.buttoncolor,
                          color: 'white',
                          fontWeight: 'bold'
                        }}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <Alert severity="info" sx={{ mt: 2 }}>
          No bid history available.
        </Alert>
      )}
    </Box>
  );
}

export default BuyerDetails; 