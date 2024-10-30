import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ListingCard from './components/ListingCard';

const Home = () => {
  const navigate = useNavigate();

  // Form input states
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [numberOfBedrooms, setNumberOfBedrooms] = useState("");

  // Listings state (replace with actual API data in real implementation)
  const [listings, setListings] = useState([
    { listing_id: 1, name: "Cozy Cottage", summary: "A lovely cottage in the countryside.", daily_price: "$100", review_score_rating: 4.5, address: { market: "Barcelona" }, bedrooms: 3, property_type: "Cottage" },
    { listing_id: 2, name: "Urban Apartment", summary: "Modern apartment in the heart of the city.", daily_price: "$120", review_score_rating: 4.8, address: { market: "Barcelona" }, bedrooms: 2, property_type: "Apartment" },
    // Add more sample listings as needed
  ]);

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Filter the listings based on form input
    const filteredListings = listings.filter((listing) => {
      return (
        listing.address.market.toLowerCase() === location.toLowerCase() &&
        (propertyType ? listing.property_type === propertyType : true) &&
        (numberOfBedrooms ? listing.bedrooms === parseInt(numberOfBedrooms) : true)
      );
    });

    setListings(filteredListings);
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h4" component="h1" gutterBottom>Hotel Bookings</Typography>
      
      {/* Form Section */}
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
        <TextField
          label="Location"
          variant="standard"
          fullWidth
          required
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          sx={{ mb: 2 }}
        />

        <FormControl fullWidth variant="standard" sx={{ mb: 2 }}>
          <InputLabel>Property Type</InputLabel>
          <Select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            label="Property Type"
          >
            <MenuItem value=""><em>None</em></MenuItem>
            <MenuItem value="Apartment">Apartment</MenuItem>
            <MenuItem value="Cottage">Cottage</MenuItem>
            <MenuItem value="Villa">Villa</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth variant="standard" sx={{ mb: 2 }}>
          <InputLabel>Number of Bedrooms</InputLabel>
          <Select
            value={numberOfBedrooms}
            onChange={(e) => setNumberOfBedrooms(e.target.value)}
            label="Number of Bedrooms"
          >
            <MenuItem value=""><em>None</em></MenuItem>
            {[...Array(10).keys()].map(num => (
              <MenuItem key={num + 1} value={num + 1}>{num + 1}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" fullWidth>Search</Button>
      </Box>

      {/* Listings Section */}
      <Box>
        <Typography variant="h5" gutterBottom>Available Properties</Typography>
        {listings.length > 0 ? (
          listings.map(listing => <ListingCard key={listing.listing_id} listing={listing} />)
        ) : (
          <Typography>No properties found.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default Home;
