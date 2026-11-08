const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require('../models/listing.js');
//const {listingSchema} = require('./schema.js');
const {isLoggedIn} = require('../middleware.js');



/*
const validateListing = (req,res,next) =>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg =error.details.map((el)=> el.message).join(",");
        throw new ExpressError(400, errMsg);
    }
    else{
        next();
    }
}
    */

   // Middleware to redirect logged-in users away from auth pages (signup/login)
const isLoggedOut = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

//Index Router
router.get("/",async(req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
});

//New Router

router.get("/new",isLoggedIn,async(req,res)=>{
    res.render("listings/new.ejs");
    
});


//Show Router
router.get("/:id",async (req,res)=>{
let {id} = req.params;

const listing = await Listing.findById(id).populate("reviews").populate("owner");
res.render("listings/show.ejs", {listing});
});

//Create Router

router.post("/", async(req,res)=>{
/*if(!req.body.listing){
    throw new ExpressError(200,"Send valid data for listing");
}*/
let listing = req.body.listing;
console.log(listing)
const newListing = new Listing(listing);

await newListing.save();
res.redirect("/listings");

});

//Edit Router
router.get("/:id/edit",isLoggedIn,async(req,res)=>{
let {id} = req.params;
const listing = await Listing.findById(id);
res.render("listings/edit.ejs", {listing});
});

//Update Router
router.put("/:id",isLoggedIn,async(req,res)=>{
let {id} = req.params;
//console.log(req.body.listing)
await Listing.findByIdAndUpdate(id,{...req.body.listing});
res.redirect("/listings");
});

//Delete Router
router.delete("/:id",isLoggedIn, async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);


    res.redirect('/listings');

    
});


module.exports = router;
