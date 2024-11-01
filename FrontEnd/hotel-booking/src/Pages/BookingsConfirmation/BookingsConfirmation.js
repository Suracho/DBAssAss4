import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const BookingsConfirmation = () => {
  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Booking Confirmed!
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Thank you for booking with us. We have received your booking details.
      </Typography>
      <Link to="/" style={{ textDecoration: 'none', color: 'blue' }}>
        Return to Home
      </Link>
    </Box>
  );
};

export default BookingsConfirmation;