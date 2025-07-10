import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, CircularProgress, Alert } from '@mui/material';
import UserSearch from '../Components/User-comp/UserSearch';
import UserTable from '../Components/User-comp/UserTable';
import { getUsers } from '../api/services/user.service';

const theme = {
  yellowBackground: "#F7DD2F",
  hoverBackground: "#6C5CD3",
  textColor: "white",
  buttoncolor: "#2F61BF",
  greycolor: "#aaa"
};

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getUsers();
      setUsers(response.users);
    } catch (err) {
      setError(err.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user => 
    user.userDetails.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.userDetails.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUserAction = async (userId, action) => {
    try {
      // TODO: Implement status update API call
      // For now, just refresh the users list
      await fetchUsers();
    } catch (err) {
      setError(err.message || 'Failed to update user status');
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 2 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ color: theme.buttoncolor, fontWeight: 'bold' }}>
          User Management
        </Typography>
        {/* <UserSearch 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        /> */}
      </Box>

      <UserTable 
        users={filteredUsers}
        onStatusChange={handleUserAction}
      />
    </Container>
  );
}

export default UserManagement;