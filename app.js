require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./models/listing.js');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const Review = require('./models/review.js');
//const {listingSchema} = require('./schema.js');

const listingRouter =  require('./routes/listing.js');
const reviewRouter = require('./routes/reviews.js');
const userRouter = require('./routes/user.js');


const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.js');
const session = require("express-session");
const flash = require("connect-flash");

require('dotenv').config();



app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname,"public")));


async function main(){
    //await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
    await mongoose.connect(process.env.MONGO_URI);
}

main().then((result)=>{
    console.log('connnected to database');
})
.catch((err)=>{
    console.log(err);
});


const sessionOptions = {
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true
};

app.use(session(sessionOptions))
app.use(flash())

//Authenticate using Passport

app.use(passport.initialize());  //Initialize the passport 
app.use(passport.session());    // create session for passport

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});


passport.use(new LocalStrategy(User.authenticate()));  //use local stragy for passport

passport.serializeUser(User.serializeUser());    //serialize user after login and also give a hash and salting password
passport.deserializeUser(User.deserializeUser());     // deserialize after logout

app.use((req, res, next) => {
    // Make flash messages and currentUser available in all EJS templates
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentUser = req.user;
    next();
});



app.get("/",(req,res)=>{
    res.send("Hi, I am root");
});
app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

/*
app.get("/demouser",async(req,res)=>{
    
    let fakeUser = new User({
        email:"nbikas52@gmail.com",
        username:"nbikas52"
    });
   let registeredUser = await User.register(fakeUser, "Girish");
   res.send(registeredUser);

});
*/


/*
app.get("/testlisting",async(req,res)=>{
    let sampleListing = new Listing({
        title:"My new villa",
        discription:"by the beach.",
        price:1200,
        location:"Calangute,Goa",
        country:"India"
    });

    await sampleListing.save();
    console.log("sample  was saved");
    res.send('successful test  listing');
});
*/
/*

*/
/*
const validaateReview = (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg =error.details.map((el)=> el.message).join(",");
        throw new ExpressError(400, errMsg);
    }
    else{
        next();
}
}
*/





/*
app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page not Found"));
});
*/

app.use((err,req,res,next)=>{
    let{statuscode=400,message} = err;
     res.render("error.ejs");
     res.locals.currUser = req.user;
    //res.status(statuscode).send(message)
    //res.send("Something Went Wrong")

   
});



app.listen(3000,()=>{
    console.log('server is runninng on port 3000');
});