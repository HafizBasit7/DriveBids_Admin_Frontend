import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';

const theme = {
  yellowBackground: "#F7DD2F",
  hoverBackground: "#6C5CD3",
  textColor: "white",
  buttoncolor: "#2F61BF",
  greycolor: "#aaa"
};

function UserSearch({ searchTerm, onSearchChange }) {
  return (
    <TextField
      placeholder="Search users by email..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
      }}
      sx={{ 
        width: 300,
        '& .MuiOutlinedInput-root': {
          '&:hover fieldset': {
            borderColor: theme.buttoncolor,
          },
          '&.Mui-focused fieldset': {
            borderColor: theme.buttoncolor,
          },
        },
      }}
    />
  );
}

export default UserSearch; 