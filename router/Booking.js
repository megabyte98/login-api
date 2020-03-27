const express = require("express");
const router = express.Router();
const hall = require("../models/hall");
const user = require("../models/user");
const auth = require('../middleware/auth');
const booking = require("../models/booking");

router.post("/booking/me",auth,async(req,res)=>{
    const Booking = new booking(req.body);
    try{
         await Booking.save();
         res.status(201).send(Booking)

    } 
    catch(e){
        console.log('error',e)
        res.status(400).send();
    }
})

module.exports = router;