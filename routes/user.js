const express = require('express');
const router = express.Router();
const User = require('../models/user.js')
const wrapAsync = require('../utils/wrapAsync.js')
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware.js');
const { isLoggedIn } = require("../middleware.js");




//Rendering the SignUp form
router.get("/signup", (req, res) => {
    res.render("users/signup");
});

//Creating a User Info
router.post(
    "/signup",
    wrapAsync(async (req, res,) => {

        let { username, email, password } = req.body;

        const newUser = new User({
            username,
            email
        });

        const registeredUser = await User.register(
            newUser,
            password
        );

        console.log(registeredUser);

        //req.login
        req.login(registeredUser,(err) => {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Signup successful! Welcome to your dashboard.');

        res.redirect("/listings");
    });


    }) 
);



// Login User
// Rendering the Login Form
router.get("/login", (req, res) => {
    res.render("users/login.ejs");
});

// Login Post Route
router.post(
    "/login",saveRedirectUrl,
    passport.authenticate("local", {
        successRedirect: "/listings",
        failureRedirect: "/login",
        failureFlash: true
    }),
    (req, res) => {
        req.flash("success", "Welcome back to Wanderlust!");
        //res.redirect(res.locals.redirectUrl || "/listings");
    }
);
/*
router.get("/logout",(req,res)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","logged out successfully");
        res.redirect("/listings")
    })
});
*/

router.post("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }

        req.flash("success", "You have been logged out!");
        res.redirect("/listings");
    });
});


module.exports =router;