const mongoose = require('mongoose');
const schema = mongoose.Schema;

const hallSchema = schema({
 name :{
     type : String,
     required : true
 },
 isbooked : {
     type : Boolean,
     default : false
 },
 Count :{
    type : Number,
    // required : true
 } 
})

module.exports = mongoose.model("hall",hallSchema);

