import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Paper
} from '@mui/material';

const theme = {
  yellowBackground: "#F7DD2F",
  hoverBackground: "#6C5CD3",
  textColor: "white",
  buttoncolor: "#2F61BF",
  greycolor: "#aaa"
};

// Mock bid history data - replace with actual data from your backend
const mockBidHistory = [
  {
    id: 1,
    carTitle: 'Toyota Corolla 2020',
    bidAmount: 2800000,
    bidTime: '2024-03-15 14:30:00',
    status: 'Won',
    auctionEndTime: '2024-03-15 15:00:00'
  },
  {
    id: 2,
    carTitle: 'Honda Civic 2019',
    bidAmount: 3200000,
    bidTime: '2024-03-14 10:15:00',
    status: 'Outbid',
    auctionEndTime: '2024-03-14 11:00:00'
  },
  {
    id: 3,
    carTitle: 'Suzuki Alto 2021',
    bidAmount: 1900000,
    bidTime: '2024-03-13 16:45:00',
    status: 'Active',
    auctionEndTime: '2024-03-20 16:45:00'
  }
];

function UserBidHistory({ userId }) {
  // In a real application, you would fetch bid history based on userId
  const bidHistory = mockBidHistory;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Won': return 'success';
      case 'Outbid': return 'error';
      case 'Active': return 'warning';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
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
            {bidHistory.map((bid) => (
              <TableRow key={bid.id} hover>
                <TableCell>{bid.carTitle}</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: theme.buttoncolor }}>
                  {formatPrice(bid.bidAmount)}
                </TableCell>
                <TableCell>{bid.bidTime}</TableCell>
                <TableCell>{bid.auctionEndTime}</TableCell>
                <TableCell>
                  <Chip 
                    label={bid.status} 
                    color={getStatusColor(bid.status)} 
                    size="small" 
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default UserBidHistory; 