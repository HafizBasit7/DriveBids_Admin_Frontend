import React, { useState } from 'react';
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Chip,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  TablePagination
} from '@mui/material';
import { 
  DirectionsCar, 
  Visibility, 
  History, 
  Info 
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const theme = {
  yellowBackground: "#F7DD2F",
  hoverBackground: "#6C5CD3",
  textColor: "white",
  buttoncolor: "#2F61BF",
  greycolor: "#aaa"
};

function CarList({ cars, pagination, onPageChange }) {
  const navigate = useNavigate();
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);

  const getStatusColor = (status) => {
    switch(status) {
      case 'open': return 'success';
      case 'sold': return 'info';
      case 'closed': return 'error';
      default: return 'default';
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleMenuOpen = (event, car) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedCar(car);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedCar(null);
  };

  const handleViewDetails = () => {
    if (selectedCar) {
      navigate(`/cars/${selectedCar.id}/details`);
    }
    handleMenuClose();
  };

  const handleViewBidHistory = () => {
    if (selectedCar) {
      navigate(`/cars/${selectedCar.id}/bids`);
    }
    handleMenuClose();
  };

  const handlePageChange = (event, newPage) => {
    onPageChange(newPage + 1);
  };

  const handleRowsPerPageChange = (event) => {
    onPageChange(1, event.target.value);
  };

  return (
    <Card>
      <TableContainer>
        <Table>
          <TableHead sx={{ bgcolor: theme.buttoncolor }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Car</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Seller</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Total Bids</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>End Date</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cars.map((car) => (
              <TableRow key={car.id} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ 
                      width: 60, 
                      height: 45, 
                      bgcolor: theme.greycolor, 
                      mr: 2, 
                      borderRadius: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <DirectionsCar />
                    </Box>
                    {car.title}
                  </Box>
                </TableCell>
                <TableCell>{car.seller}</TableCell>
                <TableCell>
                  <Chip label={car.bids} color="primary" size="small" />
                </TableCell>
                <TableCell>
                  <Chip 
                    label={car.status} 
                    color={getStatusColor(car.status)} 
                    size="small" 
                  />
                </TableCell>
                <TableCell>{car.endDate}</TableCell>
                <TableCell>
                  <Tooltip title="View Options">
                    <IconButton 
                      onClick={(e) => handleMenuOpen(e, car)}
                      sx={{ color: theme.buttoncolor }}
                    >
                      <Visibility />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={pagination.total}
        page={pagination.page - 1}
        onPageChange={handlePageChange}
        rowsPerPage={pagination.limit}
        onRowsPerPageChange={handleRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 25, 50]}
      />

      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1,
            minWidth: 200
          }
        }}
      >
        <MenuItem onClick={handleViewDetails}>
          <ListItemIcon>
            <Info fontSize="small" />
          </ListItemIcon>
          <ListItemText>View Car Details</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleViewBidHistory}>
          <ListItemIcon>
            <History fontSize="small" />
          </ListItemIcon>
          <ListItemText>View Bid History</ListItemText>
        </MenuItem>
      </Menu>
    </Card>
  );
}

export default CarList; 