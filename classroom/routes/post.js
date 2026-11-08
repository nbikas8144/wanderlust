const express = require('express');
const router = express.Router();

//Index-Post
router.get("/",(req,res)=>{
    res.send("This is the Index-post");
});

//Show-Post
router.get("/:id",(req,res)=>{
    res.send("This is the Show-post");
});

//Post-Post
router.post("/",(req,res)=>{
    res.send("This is the Post-post");
});

//Delete-Post
router.delete("/:id",(req,res)=>{
    res.send("This is the Delete-post");
});

module.exports = router;