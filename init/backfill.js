// backfill.js
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = "pk.eyJ1IjoicGhhbGtlbW0yMzQiLCJhIjoiY205ZmtodHJsMDN0cDJrc2N6Y3pveHB4ZiJ9.2wcND3yLnwfudMlywmYS2Q"; // Replace with your token
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
  console.log("Connected to DB");
}

async function backfillCoordinates() {
  // Get all listings without geometry data
  const listings = await Listing.find({ "geometry.coordinates": { $exists: false } });

  for (const listing of listings) {
    try {
      const response = await geocodingClient
        .forwardGeocode({
          query: `${listing.location}, ${listing.country}`,
          limit: 1
        })
        .send();

      if (response.body.features.length > 0) {
        listing.geometry = response.body.features[0].geometry;
        await listing.save();
        console.log(`Updated ${listing.title}`);
      }
    } catch (err) {
      console.error(`Failed to update ${listing.title}:`, err);
    }
  }
}

main()
  .then(() => backfillCoordinates())
  .then(() => mongoose.connection.close())
  .catch(err => console.error(err));