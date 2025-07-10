import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
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
  Divider,
  CircularProgress,
  Alert,
  ImageList,
  ImageListItem,
  Tabs,
  Tab
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DirectionsCar } from '@mui/icons-material';
import carService from '../../api/services/car.service';

const theme = {
  yellowBackground: "#F7DD2F",
  hoverBackground: "#6C5CD3",
  textColor: "white",
  buttoncolor: "#2F61BF",
  greycolor: "#aaa"
};

function CarDetails({ open, onClose, carId }) {
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageTab, setImageTab] = useState(0);

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

  const getStatusColor = (status) => {
    switch(status) {
      case 'open': return 'success';
      case 'sold': return 'info';
      case 'closed': return 'error';
      default: return 'default';
    }
  };

  const renderImageGallery = () => {
    if (!car?.carDetails?.images) return null;

    const imageTypes = [
      { label: 'Exterior', images: car.carDetails.images.exterior },
      { label: 'Interior', images: car.carDetails.images.interior },
      { label: 'Wheels', images: car.carDetails.images.wheels },
      { label: 'Tyre Treads', images: car.carDetails.images.tyreTreads }
    ];

    return (
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, color: theme.buttoncolor }}>
          Car Images
        </Typography>
        <Tabs 
          value={imageTab} 
          onChange={(e, newValue) => setImageTab(newValue)}
          sx={{ mb: 2 }}
        >
          {imageTypes.map((type, index) => (
            <Tab key={index} label={type.label} />
          ))}
        </Tabs>
        <ImageList cols={3} gap={8}>
          {imageTypes[imageTab].images.map((image, index) => (
            <ImageListItem key={index}>
              <img
                src={image.url}
                alt={`${imageTypes[imageTab].label} ${index + 1}`}
                loading="lazy"
                style={{ height: 200, objectFit: 'cover' }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    );
  };

  const renderSpecifications = () => {
    if (!car?.specifications) return null;

    return (
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, color: theme.buttoncolor }}>
          Specifications
        </Typography>
        <Grid container spacing={2}>
          {Object.entries(car.specifications).map(([key, value]) => {
            if (key === 'features' || key === 'location') return null;
            return (
              <Grid item xs={12} sm={6} md={4} key={key}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle2" color="textSecondary">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </Typography>
                    <Typography variant="body1">
                      {value}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    );
  };

  const renderFeatures = () => {
    if (!car?.specifications?.features) return null;

    return (
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, color: theme.buttoncolor }}>
          Features
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>Exterior</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {car.specifications.features.exterior.map((feature, index) => (
                <Chip 
                  key={index}
                  label={feature}
                  sx={{ bgcolor: theme.yellowBackground }}
                />
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>Interior</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {car.specifications.features.interior.map((feature, index) => (
                <Chip 
                  key={index}
                  label={feature}
                  sx={{ bgcolor: theme.yellowBackground }}
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  };

  const renderInspectionReport = () => {
    if (!car?.reports?.inspection) return null;

    const sections = [
      { title: 'Dynamic Operations', data: car.reports.inspection.dynamicOperations },
      { title: 'Essential Checks', data: car.reports.inspection.essentialChecks },
      { title: 'Interior Checks', data: car.reports.inspection.interiorChecks }
    ];

    return (
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, color: theme.buttoncolor }}>
          Inspection Report
        </Typography>
        {sections.map((section, index) => (
          <Box key={index} sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>{section.title}</Typography>
            <Grid container spacing={2}>
              {Object.entries(section.data).map(([key, value]) => (
                <Grid item xs={12} sm={6} md={4} key={key}>
                  <Card>
                    <CardContent>
                      <Typography variant="subtitle2" color="textSecondary">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </Typography>
                      <Chip 
                        label={value}
                        color={
                          value === 'OK' ? 'success' :
                          value === 'Requires Some Attention' ? 'warning' :
                          value === 'Requires Immediate Attention' ? 'error' :
                          'default'
                        }
                        size="small"
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </Box>
    );
  };

  if (loading) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
        <DialogContent sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </DialogContent>
      </Dialog>
    );
  }

  if (error) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
        <DialogContent>
          <Alert severity="error">{error}</Alert>
        </DialogContent>
      </Dialog>
    );
  }

  if (!car) return null;

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="lg"
      fullWidth
    >
      <DialogTitle sx={{ 
        m: 0, 
        p: 2, 
        bgcolor: theme.buttoncolor,
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <DirectionsCar sx={{ mr: 1 }} />
          <Typography variant="h6">
            {car.carDetails.title}
          </Typography>
        </Box>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: 'white',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.1)'
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {/* Price Details */}
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

        {/* Image Gallery */}
        {renderImageGallery()}

        {/* Specifications */}
        {renderSpecifications()}

        {/* Features */}
        {renderFeatures()}

        {/* Inspection Report */}
        {renderInspectionReport()}

        {/* Bid History */}
        <Typography variant="h6" sx={{ mb: 2, color: theme.buttoncolor }}>
          Bid History
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
                        color={bid.status === 'leading' ? 'success' : 'default'} 
                        size="small" 
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Alert severity="info">No bids have been placed yet.</Alert>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default CarDetails; 