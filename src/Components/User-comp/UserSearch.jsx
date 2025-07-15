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
      placeholder="Search users..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      size="small"
      sx={{
        width: 300,
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: theme.greycolor,
          },
          '&:hover fieldset': {
            borderColor: theme.buttoncolor,
          },
          '&.Mui-focused fieldset': {
            borderColor: theme.buttoncolor,
          },
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search sx={{ color: theme.greycolor }} />
          </InputAdornment>
        ),
      }}
    />
  );
}

export default UserSearch;