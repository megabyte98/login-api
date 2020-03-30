const express = require('express');
const router = express.Router();
const hall= require('../models/hall');
const auth = require('../middleware/auth');

//post route only for admin user cannot access it

router.post("/hall/me",auth,async(req,res)=>{
    const newHall = new hall(req.body)
    try{
        await newHall.save()
        res.status(201).send()
    }catch(e){
        res.status(400).send()
    } 
})


router.get("/hall/me",auth,async(req,res)=>{
try {
    const halls = await hall.find({})
    res.send(halls)  
    
}catch(e)
{
    res.status(400).send();
}
})





module.exports = router;
