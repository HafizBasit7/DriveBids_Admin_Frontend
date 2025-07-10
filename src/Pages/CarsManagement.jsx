import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  CircularProgress,
  Alert
} from '@mui/material';
import CarList from '../Components/Car-Management-comp/CarList';
import carService from '../api/services/car.service';

const theme = {
  yellowBackground: "#F7DD2F",
  hoverBackground: "#6C5CD3",
  textColor: "white",
  buttoncolor: "#2F61BF",
  greycolor: "#aaa"
};

function CarsManagement() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });

  const fetchCars = async (page = 1) => {
    try {
      setLoading(true);
      const response = await carService.getCars(page, pagination.limit);
      setCars(response.cars.map(car => ({
        id: car.carDetails._id,
        title: car.carDetails.title,
        seller: car.seller.name,
        startPrice: car.carDetails.staringBidPrice,
        currentBid: car.carDetails.currentBid,
        reservePrice: car.carDetails.reserveBidPrice,
        buyNowPrice: car.carDetails.buyNowPrice,
        bids: car.carDetails.totalBids,
        status: car.carDetails.status,
        endDate: new Date(car.carDetails.duration).toLocaleDateString(),
        image: car.carDetails.images?.exterior?.[0] || '/api/placeholder/100/80'
      })));
      setPagination(response.pagination);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Typography variant="h4" sx={{ mb: 3, color: theme.buttoncolor, fontWeight: 'bold' }}>
        Cars Management
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <CarList 
        cars={cars}
        pagination={pagination}
        onPageChange={fetchCars}
      />
    </Container>
  );
}

export default CarsManagement;