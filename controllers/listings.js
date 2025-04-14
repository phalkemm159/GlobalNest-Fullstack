const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken }); 

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings", { allListings });
}

module.exports.renderNewForm = (req, res) => {
    // console.log(req.user);    
    res.render("listings/new.ejs");
};  

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
    .populate("owner")
    .populate({
        path: "reviews", 
        populate: {
            path: "author",
        },
    });
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    // console.log("Listing owner:", listing.owner);
    console.log("Geometry:", listing.geometry);
    res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {

    // let response = await geocodingClient.forwardGeocode({
    //     query: req.body.listing.location,
    //     limit: 1,
    // }).send();
    
    // if (!response.body.features.length) {
    //     req.flash("error", "Location not found! Please enter a valid location.");
    //     return res.redirect("/listings/new");
    // }
    
    // const geometry = response.body.features[0].geometry;
    // newListing.geometry = geometry;
    


    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
      })
        .send();

    let url = req.file.path;
    let filename = req.file.filename;
    //shows the link to image on cloud storage
    // console.log(url, "..", filename);
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename};

    newListing.geometry = response.body.features[0].geometry;

    let savedListing = await newListing.save();
    console.log(savedListing);    
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings/edit.ejs", { listing, originalImageUrl});
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
    //can also add height by adding upload/h_300, after the uploads
    res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    const existingListing = await Listing.findById(id);
    // Check if new image URL is provided; if not, use existing
    // if (!req.body.listing.image?.url?.trim()) {
    //     req.body.listing.image = existingListing.image;
    // }

    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
    }
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};
