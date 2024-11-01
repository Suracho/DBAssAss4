import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { CircularProgress } from '@mui/material';

export default function Bookings() {
  const { _id } = useParams(); // Extract listing_id from URL
  const [listing, setListing] = useState(null); // State to store the listing data
  const [loading, setLoading] = useState(true); // Loading state for data fetch
  const [error, setError] = useState(null); // Error state for fetch failures

  // Form state
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    clientName: '',
    email: '',
    phone: '',
    mobile: '',
    postalAddress: '',
    residentialAddress: '',
  });

  useEffect(() => {
    // Fetch listing data based on listing_id
    const fetchListing = async () => {
      try {
        console.log("Fetching listing with ID: " + _id);
        const response = await axios.get(`http://localhost:3000/bookings?_id=${_id}`);
        setListing(response.data);
      } catch (error) {
        console.error('Error fetching listing:', error);
        setError('Failed to load listing. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchListing();
  }, [_id]);

  // Handle input changes for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Perform form submission logic here, e.g., sending booking data to the backend
      console.log("Booking details:", formData);
      alert("Booking submitted successfully!");

      // Clear form after submission
      setFormData({
        startDate: '',
        endDate: '',
        clientName: '',
        email: '',
        phone: '',
        mobile: '',
        postalAddress: '',
        residentialAddress: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert("Failed to submit booking. Please try again.");
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!listing) {
    return <Typography>No listing found for this ID.</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>Let's Book the Property</Typography>

      {/* Display Listing Information */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5">{listing.name}</Typography>
        <Typography variant="body1">{listing.summary}</Typography>
        <Typography variant="body2">Price per night: $ {listing.price?.$numberDecimal || 'N/A'}</Typography>
        <Typography variant="body2">
          Rating: {listing.review_scores?.review_scores_rating || 'N/A'}
        </Typography>
      </Box>

      {/* Booking Form */}
      <Typography variant="h6" gutterBottom>Booking Details</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
        <TextField
          label="Check In"
          name="startDate"
          type="date"
          variant="standard"
          fullWidth
          required
          InputLabelProps={{ shrink: true }}
          value={formData.startDate}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Check Out"
          name="endDate"
          type="date"
          variant="standard"
          fullWidth
          required
          InputLabelProps={{ shrink: true }}
          value={formData.endDate}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        
        <Typography variant="h6" gutterBottom>Your Details</Typography>
        <TextField
          label="Your Name"
          name="clientName"
          variant="standard"
          fullWidth
          required
          placeholder="Please your name (mandatory)"
          value={formData.clientName}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Email Address"
          name="email"
          type="email"
          variant="standard"
          fullWidth
          required
          placeholder="Please your email address (mandatory)"
          value={formData.email}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Your Mobile No"
          name="mobile"
          variant="standard"
          fullWidth
          required
          placeholder="Please your mobile no: (04xxxx xxx xxx) (mandatory)"
          value={formData.mobile}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Postal Address"
          name="postalAddress"
          variant="standard"
          fullWidth
          placeholder="Please provide your postal address"
          value={formData.postalAddress}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Residential Address"
          name="residentialAddress"
          variant="standard"
          fullWidth
          placeholder="Please provide your residential address (cannot be a PO box address)"
          value={formData.residentialAddress}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />

        <Button type="submit" variant="contained" fullWidth>Book Now</Button>
      </Box>
    </Box>
  );
}
