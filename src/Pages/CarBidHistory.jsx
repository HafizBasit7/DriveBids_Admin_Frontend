import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Alert
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { DirectionsCar } from '@mui/icons-material';
import carService from '../api/services/car.service';

const theme = {
  yellowBackground: "#F7DD2F",
  hoverBackground: "#6C5CD3",
  textColor: "white",
  buttoncolor: "#2F61BF",
  greycolor: "#aaa"
};

function CarBidHistory() {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        setLoading(true);
        const response = await carService.getCarDetails(carId);
        setCar(response);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (carId) {
      fetchCarDetails();
    }
  }, [carId]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!car) return null;

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <IconButton 
            onClick={() => navigate('/cars')}
            sx={{ mr: 2, color: theme.buttoncolor }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <DirectionsCar sx={{ mr: 1, color: theme.buttoncolor }} />
            <Typography variant="h4" sx={{ color: theme.buttoncolor, fontWeight: 'bold' }}>
              Bid History: {car.carDetails.title}
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Car Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: theme.buttoncolor, color: 'white' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Start Price</Typography>
              <Typography variant="h4">{formatPrice(car.carDetails.staringBidPrice)}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: theme.yellowBackground }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Current Bid</Typography>
              <Typography variant="h4">{formatPrice(car.carDetails.currentBid)}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: theme.hoverBackground, color: 'white' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Reserve Price</Typography>
              <Typography variant="h4">{formatPrice(car.carDetails.reserveBidPrice)}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#4CAF50', color: 'white' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Buy Now Price</Typography>
              <Typography variant="h4">{formatPrice(car.carDetails.buyNowPrice)}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Bid History Table */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, color: theme.buttoncolor }}>
          Complete Bid History
        </Typography>
        {car.bidHistory && car.bidHistory.length > 0 ? (
          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: theme.buttoncolor }}>
                <TableRow>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Bidder</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Bid Amount</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Time</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {car.bidHistory.map((bid, index) => (
                  <TableRow key={index} hover>
                    <TableCell>{bid.bidderName}</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: theme.buttoncolor }}>
                      {formatPrice(bid.bidAmount)}
                    </TableCell>
                    <TableCell>{new Date(bid.bidTime).toLocaleString()}</TableCell>
                    <TableCell>
                      <Chip 
                        label={bid.status} 
                        color={
                          bid.status === 'won' ? 'success' : 
                          bid.status === 'leading' ? 'warning' : 
                          'default'
                        } 
                        size="small" 
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Alert severity="info">
            No bids have been placed yet.
          </Alert>
        )}
      </Paper>
    </Container>
  );
}

export default CarBidHistory; 