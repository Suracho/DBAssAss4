const express = require('express');
const connectDB = require('./db');
const cors = require('cors');

const port = 3000;
const app = express();
app.use(cors());
app.use(express.json()); // To parse JSON request bodies

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

// Get a list of 50 random listings
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

// Get listings based on filters (location, property type, bedrooms)
app.get("/listingsAndReviews", async (req, res) => {
  try {
    const { location, propertyType, numberOfBedrooms } = req.query;

    if (!location) {
      return res.status(400).send("Location is a required field.");
    }

    let query = { "address.market": location };

    if (propertyType) query.property_type = propertyType;
    if (numberOfBedrooms) query.bedrooms = parseInt(numberOfBedrooms);

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
    const { _id } = req.query;

    if (!_id) {
      return res.status(400).send("ID is a required field.");
    }

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

// POST /clients - Add a new client to the clients collection
app.post('/clients', async (req, res) => {
  try {
    const clientData = req.body;
    const collection = db.collection("clients");

    await collection.insertOne(clientData);
    res.status(201).json(clientData);
  } catch (error) {
    console.error("Error adding client:", error);
    res.status(500).send("Error adding client");
  }
});

// POST /listingsAndReviews/:listingId/bookings - Add a booking to a listing
app.post('/listingsAndReviews/:listingId/bookings', async (req, res) => {
  try {
    const { listingId } = req.params;
    const bookingData = req.body;
    const collection = db.collection("listingsAndReviews");

    const result = await collection.updateOne(
      { _id: listingId },
      {
        $push: { bookings: bookingData },
        $addToSet: { client_ids: bookingData.client_id }
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).send("Listing not found");
    }

    res.status(201).json({ message: "Booking added", booking: bookingData });
  } catch (error) {
    console.error("Error adding booking:", error);
    res.status(500).send("Error adding booking");
  }
});

// GET /listingsAndReviews/:listingId/bookings - Get all bookings for a listing with client details
app.get('/listingsAndReviews/:listingId/bookings', async (req, res) => {
  try {
    const { listingId } = req.params;
    const listingsCollection = db.collection("listingsAndReviews");
    const clientsCollection = db.collection("clients");

    const listing = await listingsCollection.findOne({ _id: listingId });

    if (!listing || !listing.bookings) {
      return res.status(404).send("Listing or bookings not found");
    }

    // Aggregate bookings with client details
    const bookingsWithClientDetails = await Promise.all(
      listing.bookings.map(async (booking) => {
        const client = await clientsCollection.findOne({ _id: booking.client_id });
        return {
          ...booking,
          clientName: client?.name || "Unknown",
          clientEmail: client?.email || "Unknown",
        };
      })
    );

    res.status(200).json(bookingsWithClientDetails);
  } catch (error) {
    console.error("Error fetching bookings with client details:", error);
    res.status(500).send("Error fetching bookings");
  }
});

// Example route for form submission
app.post('/submit-form', (req, res) => {
  res.send('Form submitted');
});
