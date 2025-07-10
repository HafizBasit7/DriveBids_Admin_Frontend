import React, { useState } from 'react';
import {
  Box,
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Divider
} from '@mui/material';
import {
  Dashboard,
  People,
  DirectionsCar,
  Gavel,
  Logout
} from '@mui/icons-material';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import MainLogo from '../assets/Mainlogo.svg';

const theme = {
  yellowBackground: "#F7DD2F",
  hoverBackground: "#6C5CD3",
  textColor: "white",
  buttoncolor: "#2F61BF",
  greycolor: "#aaa"
};

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
  { text: 'User Management', icon: <People />, path: '/users' },
  { text: 'Cars Management', icon: <DirectionsCar />, path: '/cars' },
  //  { text: 'Create User & Car', icon: <Gavel />, path: '/create-user-car' }, // ✅ New sidebar item
  { text: 'New User & Car', icon: <Gavel />, path: '/create-user-and-car' },

];

export default function AdminPanel() {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('isAuthenticated');
    // Navigate to login page
    navigate('/login');
    handleClose();
  };

  const handleProfile = () => {
    // Navigate to profile page (you can implement this later)
    handleClose();
  };

  const handleSettings = () => {
    // Navigate to settings page (you can implement this later)
    handleClose();
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      {/* App Bar */}
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: theme.buttoncolor,
        }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <img 
              src={MainLogo} 
              alt="DriveBids Logo" 
              style={{ height: '50px', marginRight: '16px', cursor: 'pointer' }} 
              onClick={() => navigate('/dashboard')}
            />
          </Box>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <Avatar sx={{ bgcolor: theme.yellowBackground, color: 'black' }}>A</Avatar>
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
           
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            background: 'linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%)',
            borderRight: '1px solid rgba(0, 0, 0, 0.12)',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton 
                  onClick={() => navigate(item.path)}
                  sx={{
                    '&:hover': {
                      bgcolor: theme.yellowBackground,
                      color: 'black',
                      '& .MuiListItemIcon-root': {
                        color: 'black',
                      },
                    },
                    bgcolor: location.pathname.startsWith(item.path) ? theme.yellowBackground : 'transparent',
                    color: location.pathname.startsWith(item.path) ? 'black' : 'inherit',
                    py: 1.5,
                    px: 2,
                  }}
                >
                  <ListItemIcon sx={{ 
                    color: location.pathname.startsWith(item.path) ? 'black' : theme.buttoncolor,
                    minWidth: '40px',
                    '&:hover': {
                      color: 'black',
                    },
                  }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text} 
                    primaryTypographyProps={{
                      fontSize: '0.95rem',
                      fontWeight: location.pathname.startsWith(item.path) ? 'bold' : 'normal',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}