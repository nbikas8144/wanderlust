const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Reviews = require('./review.js')

const listingSchema  = new Schema({
title: {
    type: String,
    required: true,
},
description: {
    type: String,
},
image: {
    type: String,
    default:"C:/Users/hp/Downloads/images.jpg",
    set: (img)=> img == "" ? "C:/Users/hp/Downloads/images.jpg" : img,
},
price: {
    type: Number,
},
location: {
    type: String,
},
reviews:[
    {
        type:Schema.Types.ObjectId,
        ref:"Review"
    }],
owner: [{
    type:Schema.Types.ObjectId,
    ref:"User"
}]

});

listingSchema.post("findOneAndDelete", async(listing)=>{
if(listing){
await Reviews.deleteMany({_id : {$in : listing.reviews}});
}
});


const Listing = mongoose.model('Listing',listingSchema);
module.exports = Listing;
