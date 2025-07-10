import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
  Alert,
  Box
} from '@mui/material';
import carService from '../../api/services/car.service';

const theme = {
  yellowBackground: "#F7DD2F",
  hoverBackground: "#6C5CD3",
  textColor: "white",
  buttoncolor: "#2F61BF",
  greycolor: "#aaa"
};

function BidHistory() {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        setLoading(true);
        const response = await carService.getCarBidHistory();
        if (response.bidHistory && response.bidHistory.length > 0) {
          setBids(response.bidHistory.map(bid => ({
            id: bid._id,
            carTitle: bid.carTitle,
            bidder: bid.bidderName,
            amount: bid.bidAmount,
            time: new Date(bid.bidTime).toLocaleString(),
            status: bid.status
          })));
        } else {
          setBids([]);
        }
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBids();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return (
      <Card>
        <CardContent sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, color: theme.buttoncolor }}>
          Bid History
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {bids.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Alert severity="info">
              No bid history available at the moment.
            </Alert>
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: theme.yellowBackground }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Car</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Bidder</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Bid Amount</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Time</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bids.map((bid) => (
                  <TableRow key={bid.id} hover>
                    <TableCell>{bid.carTitle}</TableCell>
                    <TableCell>{bid.bidder}</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: theme.buttoncolor }}>
                      {formatPrice(bid.amount)}
                    </TableCell>
                    <TableCell>{bid.time}</TableCell>
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
        )}
      </CardContent>
    </Card>
  );
}

export default BidHistory; 