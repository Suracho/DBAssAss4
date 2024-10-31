const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://s4026111:Szw5h4Ryjpohr0wn@clustertest.wgecm.mongodb.net/?retryWrites=true&w=majority&appName=ClusterTest";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const connectDB = async () => {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Successfully connected to MongoDB!");

    const db = client.db("sample_airbnb");
    return db; // Return the db instance
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

module.exports = connectDB;
