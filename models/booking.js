const mongoose = require('mongoose');
const user = require('./user');
const hall = require('./hall');
const schema = mongoose.Schema;

const bookingSchema = schema({
   eventName : {
        type : String,
        required : true
   },
   bookedOn: {
        type: Date, 
        required: true,
        default: Date.now 
       },
    BookedFor :[{
        type : String,
        required : true
    }],
    BookedBy :{

        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref: "user"
    }   ,
    hallBooked :[{
              type :mongoose.Schema.Types.ObjectId,
              required : true,
              ref : "hall"
    }]
    
})

module.exports = mongoose.model("booking",bookingSchema);