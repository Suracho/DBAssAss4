import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { CircularProgress } from '@mui/material';

export default function Bookings() {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);

  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    clientName: '',
    email: '',
    phone: '',
    mobile: '',
    postalAddress: '',
    residentialAddress: '',
    numberOfGuests: 1,
  });

  useEffect(() => {
    // Fetch listing details
    const fetchListing = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/bookings?_id=${_id}`);
        setListing(response.data);
      } catch (error) {
        console.error('Error fetching listing:', error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch bookings with client details for the specific listing
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/listingsAndReviews/${_id}/bookings`);
        setBookings(response.data); // List of bookings with client details
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchListing();
    fetchBookings();
  }, [_id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if client exists or create a new client
      const clientData = {
        name: formData.clientName,
        email: formData.email,
        phone: formData.phone,
        mobile: formData.mobile,
        postal_address: formData.postalAddress,
        residential_address: formData.residentialAddress,
      };
      const clientResponse = await axios.post('http://localhost:3000/clients', clientData);

      // Prepare booking data
      const bookingData = {
        client_id: clientResponse.data._id, // Use the client ID returned from the API
        arrival_date: formData.startDate,
        departure_date: formData.endDate,
        number_of_guests: formData.numberOfGuests,
        guests: [{ name: formData.clientName }], // Example guest array, can be expanded
      };

      // Submit the booking to the listing
      await axios.post(`http://localhost:3000/listingsAndReviews/${_id}/bookings`, bookingData);

      alert("Booking submitted successfully!");
      navigate("/bookings-confirmation");
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("Error submitting booking. Please try again.");
    }
  };

  if (loading) return <CircularProgress />;

  if (!listing) return <Typography>No listing found for this ID.</Typography>;

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>Let's Book the Property</Typography>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5">{listing.name}</Typography>
        <Typography variant="body1">{listing.summary}</Typography>
        <Typography variant="body2">Price per night: $ {listing.price?.$numberDecimal || 'N/A'}</Typography>
        <Typography variant="body2">Rating: {listing.review_scores?.review_scores_rating || 'N/A'}</Typography>
      </Box>

      <Typography variant="h6" gutterBottom>Booking Details</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
        <TextField
          label="Check In"
          name="startDate"
          type="date"
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
          fullWidth
          required
          InputLabelProps={{ shrink: true }}
          value={formData.endDate}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Client Name"
          name="clientName"
          fullWidth
          required
          value={formData.clientName}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          fullWidth
          required
          value={formData.email}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Phone"
          name="phone"
          fullWidth
          value={formData.phone}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Mobile"
          name="mobile"
          fullWidth
          value={formData.mobile}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Postal Address"
          name="postalAddress"
          fullWidth
          value={formData.postalAddress}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Residential Address"
          name="residentialAddress"
          fullWidth
          value={formData.residentialAddress}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Number of Guests"
          name="numberOfGuests"
          type="number"
          fullWidth
          required
          value={formData.numberOfGuests}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" fullWidth>Book Now</Button>
      </Box>

      <Typography variant="h6" gutterBottom>Existing Bookings</Typography>
      <Box sx={{ mb: 4 }}>
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <Box key={booking.booking_id} sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
              <Typography variant="body1">Client Name: {booking.clientName}</Typography>
              <Typography variant="body1">Client Email: {booking.clientEmail}</Typography>
              <Typography variant="body2">Check In: {new Date(booking.arrival_date).toLocaleDateString()}</Typography>
              <Typography variant="body2">Check Out: {new Date(booking.departure_date).toLocaleDateString()}</Typography>
              <Typography variant="body2">Guests: {booking.number_of_guests}</Typography>
            </Box>
          ))
        ) : (
          <Typography>No bookings found for this listing.</Typography>
        )}
      </Box>
    </Box>
  );
}
