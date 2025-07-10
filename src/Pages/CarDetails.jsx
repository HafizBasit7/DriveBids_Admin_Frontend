import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  IconButton,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Alert,
  ImageList,
  ImageListItem,
  Tabs,
  Tab,
  Divider
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

function CarDetails() {
  const { carId } = useParams();
  const navigate = useNavigate();
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
              {car.carDetails.title}
            </Typography>
          </Box>
        </Box>
      </Paper>

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

      {/* Description */}
      {car.carDetails.description && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2, color: theme.buttoncolor }}>
            Description
          </Typography>
          <Paper sx={{ p: 3 }}>
            <Typography variant="body1">
              {car.carDetails.description}
            </Typography>
          </Paper>
        </Box>
      )}

      {/* Seller Information */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, color: theme.buttoncolor }}>
          Seller Information
        </Typography>
        <Paper sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="textSecondary">
                Name
              </Typography>
              <Typography variant="body1">
                {car.seller.name}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="textSecondary">
                Email
              </Typography>
              <Typography variant="body1">
                {car.seller.email}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
}

export default CarDetails; 