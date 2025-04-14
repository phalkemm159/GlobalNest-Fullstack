const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        url: String,
        filename: String,
        // filename: String,
        // url: { type: String , default: "https://m.ahstatic.com/is/image/accorhotels/met_p_a116-07?wid=1920",},
        // default: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
        // set: (v) => 
        //     v === ""
        //     ? "https://images.unsplash.com/photo-1737513090777-b87774e10186?q=80&w=1162&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        //     : v,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
        type: Schema.Types.ObjectId,
        ref: "Review",
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    geometry: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        },
      },
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if(listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;