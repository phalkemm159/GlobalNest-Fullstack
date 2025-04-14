const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
    .then(() => {
        console.log("connected to DB");        
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    
    // Add geometry data to sample listings
    const updatedData = initData.data.map(obj => ({
      ...obj,
      owner: "67f5374421d38f869bc62936",
      geometry: obj.geometry || { // Fallback for any missing geometry
        type: "Point",
        coordinates: [0, 0] // Default coordinates
      }
    }));
  
    await Listing.insertMany(updatedData);
    console.log("Data was initialized");
  };

initDB();