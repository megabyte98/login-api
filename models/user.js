const mongoose =  require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const schema = mongoose.Schema;

const userSchema = schema({
    name : {
        type : String,
        required : true,
        trim : true
    }, 
    email : {
        type : String ,
        unique : true,
        required : true,
        trim : true ,
        lowercase : true , 
        validate(value) {
            if(!validator.isEmail(value)){
                  throw new Error('Invalid Email');        
            }
        }

    },
    password : {
        type: String,
        required : true,
        minlength : 8
    },
    isAdmin : {
        type : Boolean,
        default : false
    },
    tokens :[{
        token:{
            type:String,
            required:true 
        }
    }]
    
});

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

userSchema.methods.generateAuthToken =async function() {
    const user =this;
    const token = jwt.sign({_id:user._id.toString() },'chatapplication');
    user.tokens = user.tokens.concat({token})
    await user.save();
    return token;
}


userSchema.statics.findByCredentials = async(email,password) =>{
    const User = await user.findOne({email})
    if(!User)
    {
        throw new Error('unable to find you');
    }
    const isMatch = await bcrypt.compare(password,User.password)
    if(!isMatch)
    {
        throw new Error('Wrong Credentials')
    }
    return User;
}

userSchema.pre('save',async function(next){
    const user =this;
    if(user.isModified('password'))
    {
        user.password = await bcrypt.hash(user.password,8)

    }
    next()
})




const user = mongoose.model('user',userSchema);

module.exports = user;