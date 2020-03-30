const express = require("express");
const router = express.Router();
const hall = require("../models/hall");
const user = require("../models/user");
const auth = require('../middleware/auth');
const booking = require("../models/booking");

router.post("/booking/me",auth,async(req,res)=>{
    const Booking= new booking({
        ...req.body,
        BookedBy: req.user._id
    })

    try{
         await Booking.save();
         res.status(201).send(Booking)

    } 
    catch(e){
        console.log('error',e)
        res.status(400).send();
    }
})

router.get('/booking/me', auth, async (req, res) => {
    try {
        await req.user.populate('bookings').execPopulate()
        res.send(req.user.bookings)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router;