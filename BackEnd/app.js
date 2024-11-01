const express = require('express');
const connectDB = require('./db');
const port = 3000;
const app = express();
const cors = require('cors');

app.use(cors());

let db;


(async () => {
  try {
    db = await connectDB();
    console.log("Database connected.");
    
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);  
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
})();

// Get a list of 50 listings
app.get("/listingsAndReviews/getRandom", async (req, res) => {
  try {
    const collection = db.collection("listingsAndReviews");
    const results = await collection.find({}).limit(50).toArray();
    res.status(200).send(results);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

// Get a list of listings and reviews based on location, property type and number of bedrooms
// Get a list of listings and reviews based on filters
app.get("/listingsAndReviews", async (req, res) => {
  try {
    const { location, propertyType, numberOfBedrooms } = req.query;

    // Ensure the required location field is provided
    if (!location) {
      return res.status(400).send("Location is a required field.");
    }

    // Build the query object based on provided parameters
    let query = { "address.market": location };

    if (propertyType) {
      query.property_type = propertyType;
    }
    if (numberOfBedrooms) {
      query.bedrooms = parseInt(numberOfBedrooms); // Ensure bedrooms is a number
    }

    const collection = db.collection("listingsAndReviews");
    const results = await collection.find(query).limit(100).toArray();

    res.status(200).send(results);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

// Get a specific listing by ID using query parameters
app.get("/bookings", async (req, res) => {
  try {
    const { _id } = req.query; // Get _id from query parameters

    if (!_id) {
      return res.status(400).send("ID is a required field.");
    }

    console.log("ID is " + _id);
    const collection = db.collection("listingsAndReviews");
    const listing = await collection.findOne({ _id: _id });

    if (!listing) {
      return res.status(404).send("Listing not found");
    }

    res.status(200).send(listing);
  } catch (error) {
    console.error("Error fetching listing:", error);
    res.status(500).send("Error fetching listing");
  }
});



app.post('/submit-form', (req, res) => {
  res.send('Form submitted');
}); 
