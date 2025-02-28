const mongoose = require('mongoose');
const bcrypt = require('bcrypt');   ///for hashing
const jwt = require('jsonwebtoken')  //for token generation



const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type:String,
            required:true,
            minlength:[2,'First name must be at least 2 characters long'],

        },
        lastname: {
            type:String,
            minlength:[2,'First name must be at least 2 characters long'],
            
        }
    },
    email:{
        type : String,
        required: true,
        unique :true,
        minlength: [5,'Email must be at least 5 characters long'],
    },
    password:{
       type : String,
        required: true,
        select: false,     //if user find no password field in=s going
        
    },
    socketId:{    ///used for live tracking of user/captain
        type:String,
    },
})

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this.id },process.env.JWT_SECRET,{expiresIn: '24h'});
    return token;
}
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password,this.password);
}
userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password,10);
}

const userModel = mongoose.model('user',userSchema);

module.exports =userModel;