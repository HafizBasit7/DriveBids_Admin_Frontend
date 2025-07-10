import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  Tabs,
  Tab,
  Typography,
  Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SellerDetails from './SellerDetails';
import BuyerDetails from './BuyerDetails';

const theme = {
  yellowBackground: "#F7DD2F",
  hoverBackground: "#6C5CD3",
  textColor: "white",
  buttoncolor: "#2F61BF",
  greycolor: "#aaa"
};

function TabPanel({ children, value, index }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`user-tabpanel-${index}`}
      aria-labelledby={`user-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function UserDetailsDialog({ open, onClose, user }) {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          minHeight: '80vh',
          maxHeight: '90vh'
        }
      }}
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
        <Typography variant="h6">
          User Details: {user?.name || 'User'}
        </Typography>
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

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          sx={{
            '& .MuiTab-root': {
              color: theme.greycolor,
              '&.Mui-selected': {
                color: theme.buttoncolor,
                fontWeight: 'bold'
              }
            },
            '& .MuiTabs-indicator': {
              bgcolor: theme.buttoncolor
            }
          }}
        >
          <Tab label="Seller Details" />
          <Tab label="Buyer Details" />
        </Tabs>
      </Box>

      <DialogContent dividers>
        <TabPanel value={tabValue} index={0}>
          <SellerDetails userId={user?.id} />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <BuyerDetails userId={user?.id} />
        </TabPanel>
      </DialogContent>
    </Dialog>
  );
}

export default UserDetailsDialog; 