import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Box,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  Visibility,
  Block,
  Person,
  ShoppingCart
} from '@mui/icons-material';

const theme = {
  yellowBackground: "#F7DD2F",
  hoverBackground: "#6C5CD3",
  textColor: "white",
  buttoncolor: "#2F61BF",
  greycolor: "#aaa"
};

function UserTable({ users, onStatusChange }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedUser, setSelectedUser] = React.useState(null);

  const handleMenuOpen = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const handleViewDetails = (type) => {
    if (selectedUser) {
      if (type === 'seller') {
        navigate(`/users/${selectedUser.userDetails._id}/seller`);
      } else if (type === 'buyer') {
        navigate(`/users/${selectedUser.userDetails._id}/buyer`);
      }
    }
    handleMenuClose();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getUserType = (user) => {
    const hasSellerActivity = user.sellerMetrics.totalListed > 0;
    const hasBuyerActivity = user.buyerMetrics.totalBids > 0;
    
    if (hasSellerActivity && hasBuyerActivity) return 'Both';
    if (hasSellerActivity) return 'Seller';
    if (hasBuyerActivity) return 'Buyer';
    return 'Individual';
  };

  const getActivityInfo = (user) => {
    const sellerInfo = user.sellerMetrics.totalListed > 0 ? `${user.sellerMetrics.totalListed} cars` : '';
    const buyerInfo = user.buyerMetrics.totalBids > 0 ? `${user.buyerMetrics.totalBids} bids` : '';
    return [sellerInfo, buyerInfo].filter(Boolean).join(', ');
  };

  return (
    <Card>
      <TableContainer>
        <Table>
          <TableHead sx={{ bgcolor: theme.buttoncolor }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>User</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Type</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Join Date</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Activity</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.userDetails._id} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ mr: 2, bgcolor: theme.hoverBackground }}>
                      {user.userDetails.name.charAt(0)}
                    </Avatar>
                    {user.userDetails.name}
                  </Box>
                </TableCell>
                <TableCell>{user.userDetails.email}</TableCell>
                <TableCell>
                  <Chip label={user.userDetails.type} size="small" />
                </TableCell>
                <TableCell>{formatDate(user.userDetails.joinDate)}</TableCell>
                <TableCell>{getActivityInfo(user)}</TableCell>
                <TableCell>
                  <IconButton 
                    onClick={(e) => handleMenuOpen(e, user)}
                    sx={{ color: theme.buttoncolor }}
                  >
                    <Visibility />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={() => handleViewDetails('seller')}>
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          <ListItemText>View Seller Details</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleViewDetails('buyer')}>
          <ListItemIcon>
            <ShoppingCart fontSize="small" />
          </ListItemIcon>
          <ListItemText>View Buyer Details</ListItemText>
        </MenuItem>
      </Menu>
    </Card>
  );
}

export default UserTable; 