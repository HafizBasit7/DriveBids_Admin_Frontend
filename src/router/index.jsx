import { createBrowserRouter, Navigate } from 'react-router-dom';
import AdminPanel from '../Layout/layout';
import Dashboard from '../Pages/Dashboard';
import UserManagement from '../Pages/UserManagement';
import CarsManagement from '../Pages/CarsManagement';
import BuyerDetails from '../Pages/BuyerDetails';
import SellerDetails from '../Pages/SellerDetails';
import CarDetails from '../Pages/CarDetails';
import CarBidHistory from '../Pages/CarBidHistory';
import Login from '../Pages/Login';
import CreateUserAndCar from '../Pages/CreateUserAndCar';


// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <ProtectedRoute><AdminPanel /></ProtectedRoute>,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'users',
        element: <UserManagement />,
      },
      {
        path: 'users/:userId/buyer',
        element: <BuyerDetails />,
      },
      {
        path: 'users/:userId/seller',
        element: <SellerDetails />,
      },
      {
        path: 'cars',
        element: <CarsManagement />,
      },
      {
        path: 'cars/:carId/details',
        element: <CarDetails />,
      },
      {
        path: 'cars/:carId/bids',
        element: <CarBidHistory />,
      },



{
  path: 'create-user-and-car',
  element: <CreateUserAndCar />,
},

      {
        path: '*',
        element: <Navigate to="/dashboard" replace />,
      },
    ],
  },
]); 