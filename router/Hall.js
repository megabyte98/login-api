const express = require('express');
const router = express.Router();
const hall= require('../models/hall');
const auth = require('../middleware/auth');

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
