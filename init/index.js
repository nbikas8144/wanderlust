require('dotenv').config()
const mongoose = require('mongoose');
const  initData = require('./data.js');
const Listing = require('../models/listing.js');

async function main(){
    //await mongoose.connect(process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI || "mongodb+srv://nbikas:wanderlust@wanderlust.v50gbqr.mongodb.net/wanderlust");
}

main().then((result)=>{
    console.log('connnected to database');
}) 
.catch((err)=>{
    console.log(err);
});

const initDB = async () =>{
    await Listing.deleteMany({});
    initData.data.map((obj)=>({...obj,owner:"6a8b06d104ce7b80a6b877af"}))
    await Listing.insertMany(initData.data);
    console.log("data was initialized")
}

initDB();