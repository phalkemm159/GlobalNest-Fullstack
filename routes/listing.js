const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });


router
    .route("/")
    .get(wrapAsync(listingController.index))
 
    // .post( upload.single('listing[image][url]'), (req, res) => {
    //     res.send(req.file);
    // });
    .post(upload.single('listing[image]'), isLoggedIn, validateListing, wrapAsync(listingController.createListing));

//New Router
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(upload.single('listing[image]'),isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

// //Index Route
// router.get("/", wrapAsync(listingController.index));
// // Listing.find({}).then((res) => {
// //     console.log(res);
// // });


// //Show Route
// router.get("/:id", wrapAsync(listingController.showListing));

// //Create Route
// router.post("/", isLoggedIn, validateListing, wrapAsync(listingController.createListing));

//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

// //Update Route 
// router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing));

// //Delete Route
// router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

module.exports = router;