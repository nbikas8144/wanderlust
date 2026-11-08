const express = require('express');
const router = express.Router();


//Index-Users
router.get("/",(req,res)=>{
    res.send("This is the Index-User");
});

//Show-Users
router.get("/:id",(req,res)=>{
    res.send("This is the Show-User");
});

//Post-Users
router.post("/",(req,res)=>{
    res.send("This is the Post-User");
});

//Delete-Users
router.delete("/:id",(req,res)=>{
    res.send("This is the Delete-User");
});



module.exports = router;