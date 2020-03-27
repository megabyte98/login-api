const jwt = require("jsonwebtoken");
const user = require('../models/user');

const auth= async(req,res,next)=>{
    try{
         const token = req.header('Authorization').replace('Bearer ','');
         const decoded = jwt.verify(token,'chatapplication')
         const User =await user.findOne({ '_id' :decoded._id,'tokens.token':token})

         if(!user)
         {
             throw new Error('')
         }
         req.token = token
         req.user = User
         next()
    }
    catch(e){
        res.status(401).send("error : please authenticate")
    }
}

module.exports = auth;