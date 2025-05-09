import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Layouts
import AppLayout from './components/Layout/AppLayout';

// Auth Pages
import Login from './pages/auth/Login';

// Marketer Pages
import MarketerDashboard from './pages/marketer/Dashboard';
import ScheduleCalls from './pages/marketer/ScheduleCalls';
import MarketerOffers from './pages/marketer/Offers';

// User Pages
import UserDashboard from './pages/user/Dashboard';
import Timesheet from './pages/user/Timesheet';
import UserOffers from './pages/user/Offers';
import Calendar from './pages/user/Calendar';
import Profile from './pages/user/Profile';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          
          {/* Protected routes */}
          <Route path="/" element={<AppLayout />}>
            {/* Marketer routes */}
            <Route path="marketer/dashboard" element={<MarketerDashboard />} />
            <Route path="marketer/schedule" element={<ScheduleCalls />} />
            <Route path="marketer/offers" element={<MarketerOffers />} />
            
            {/* User routes */}
            <Route path="user/dashboard" element={<UserDashboard />} />
            <Route path="user/timesheet" element={<Timesheet />} />
            <Route path="user/offers" element={<UserOffers />} />
            <Route path="user/calendar" element={<Calendar />} />
            <Route path="user/profile" element={<Profile />} />
            
            {/* Redirect root to login */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            
            {/* Path not found - could add a 404 page here */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;