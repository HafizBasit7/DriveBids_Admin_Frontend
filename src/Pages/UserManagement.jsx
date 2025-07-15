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
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalUsers: 0,
    limit: 10,
    hasNextPage: false,
    hasPrevPage: false
  });

  useEffect(() => {
    fetchUsers(1, searchTerm);
  }, []);

  // Debounce search to avoid too many API calls
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      fetchUsers(1, searchTerm);
    }, 500);

    return () => clearTimeout(delayedSearch);
  }, [searchTerm]);

  const fetchUsers = async (page = 1, search = '') => {
    try {
      setLoading(true);
      const response = await getUsers(page, 10, search);
      
      // Debug logs
      console.log('Full API Response:', response);
      console.log('Users:', response.users);
      console.log('Pagination:', response.pagination);
      
      setUsers(response.users || []);
      
      // Handle pagination data - check if it exists and has the right structure
      if (response.pagination) {
        const paginationData = {
          currentPage: Number(response.pagination.page) || 1,
          totalPages: Number(response.pagination.pages) || 1,
          totalUsers: Number(response.pagination.total) || 0,
          limit: Number(response.pagination.limit) || 10,
          hasNextPage: Number(response.pagination.page) < Number(response.pagination.pages),
          hasPrevPage: Number(response.pagination.page) > 1
        };
        
        console.log('Processed Pagination Data:', paginationData);
        setPagination(paginationData);
      } else {
        // Fallback if pagination data is not in expected format
        const fallbackPagination = {
          currentPage: 1,
          totalPages: 1,
          totalUsers: response.users ? response.users.length : 0,
          limit: 10,
          hasNextPage: false,
          hasPrevPage: false
        };
        
        console.log('Using Fallback Pagination:', fallbackPagination);
        setPagination(fallbackPagination);
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err.message || 'Failed to fetch users');
      // Reset pagination on error
      setPagination({
        currentPage: 1,
        totalPages: 1,
        totalUsers: 0,
        limit: 10,
        hasNextPage: false,
        hasPrevPage: false
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    console.log('Page changed to:', newPage);
    fetchUsers(newPage, searchTerm);
  };

  const handleUserAction = async (userId, action) => {
    try {
      // TODO: Implement status update API call
      // For now, just refresh the current page
      await fetchUsers(pagination.currentPage, searchTerm);
    } catch (err) {
      setError(err.message || 'Failed to update user status');
    }
  };

  const handleSearchChange = (newSearchTerm) => {
    console.log('Search term changed to:', newSearchTerm);
    setSearchTerm(newSearchTerm);
    // The useEffect will handle the API call
  };

  if (loading && users.length === 0) {
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
        <UserSearch 
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />
      </Box>

      {/* Debug Information */}
      <Box sx={{ mb: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
        <Typography variant="body2">
          <strong>Debug Info:</strong><br />
          Users Count: {users.length}<br />
          Current Page: {pagination.currentPage}<br />
          Total Pages: {pagination.totalPages}<br />
          Total Users: {pagination.totalUsers}<br />
          Limit: {pagination.limit}
        </Typography>
      </Box>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <CircularProgress size={24} />
        </Box>
      )}

      <UserTable 
        users={users}
        onStatusChange={handleUserAction}
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </Container>
  );
}

export default UserManagement;