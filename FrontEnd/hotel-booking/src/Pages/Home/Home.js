import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  const [listings, setListings] = useState([]);

  // to load at the beginning
    useEffect(() => {
        const fetchListings = async () => {
        try {
            const response = await axios.get("http://localhost:3000/listingsAndReviews/getRandom");
            console.log(response.data);
            console.log("response.data");
            setListings(response.data);
        } catch (error) {
            console.error("Error fetching listings:", error);
            setListings([]);
        }
        };
    
        fetchListings();
    }, []);

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make API call to backend
      const response = await axios.get("http://localhost:3000/listingsAndReviews", {
        params: {
          location,
          propertyType,
          numberOfBedrooms
        }
      });

      // Update listings state with the API response
      setListings(response.data);
    } catch (error) {
      console.error("Error fetching listings:", error);
      setListings([]); // Clear listings in case of error
    }
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
          listings.map(listing => <ListingCard key={listing._id} listing={listing} />)
        ) : (
          <Typography>No properties found.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default Home;
