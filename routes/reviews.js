const express = require("express");
const router = express.Router({ mergeParams: true });

const wrapAsync = require("../utils/wrapAsync.js");

const Listing = require("../models/listing.js");
const Review = require("../models/review.js");


// ===============================
// POST REVIEW ROUTE
// ===============================

router.post("/", wrapAsync(async (req, res) => {

    // Find the listing using listing ID
    let listing = await Listing.findById(req.params.id);

    // Create a new review
    let newReview = new Review(req.body.review);
    //console.log(newReview);

    // Add review to listing
    listing.reviews.push(newReview);

    // Save review
    await newReview.save();

    // Save listing
    await listing.save();

    console.log("Review Saved");

    // Redirect to listing page
    res.redirect(`/listings/${listing._id}`);
}));


// ===============================
// DELETE REVIEW ROUTE
// ===============================

router.delete("/:reviewId", wrapAsync(async (req, res) => {

    // Get listing ID and review ID
    let { id, reviewId } = req.params;

    // Remove review ID from the listing's reviews array
    await Listing.findByIdAndUpdate(id, {
        $pull: {
            reviews: reviewId
        }
    });

    // Delete the review from Review collection
    await Review.findByIdAndDelete(reviewId);

    console.log("Review Deleted");

    // Redirect to listing page
    res.redirect(`/listings/${id}`);
}));


module.exports = router;