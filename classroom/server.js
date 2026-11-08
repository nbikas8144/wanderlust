const express = require('express');
const app = express();
const port = 5000;
const user = require('./routes/user.js');
const post = require('./routes/post.js');
const cookieParser = require('cookie-parser');

app.use(cookieParser());


//Signed Cookies

//app.use(cookieParser("secretcode"));

app.get("/getsignedcookies",(req,res)=>{
    res.cookie("made-in","India",{signed:true});
    res.send("sent your same cookies");
});

app.get("/getcookies",(req,res)=>{
    res.cookie("greet","hello",{signed:true});
    res.send("sent your same cookies");
});

app.get("/verify",(req,res)=>{
    console.log(req.cookie);
})

app.get('/',(req,res)=>{
    res.send("this is the root route");
    console.log(req.cookies);
});

//requiring the User Route
app.use("/users",user);
//requiring the Post Route
app.use("/posts",post);




app.listen(port,()=>{
    console.log(`the server running on the port number ${port}`);
    
});