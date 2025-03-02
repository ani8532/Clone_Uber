const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');    


const captainSchema = new mongoose.Schema({
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
        lowercase:true,
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,'Please fill a valid email address'], 
        minlength: [5,'Email must be at least 5 characters long'],
    },
    password:{
       type : String,
        required: true,
        select: false,     
        
    },
    socketId:{    ///used for live tracking of user/captain
        type:String,
    },
    status:{
        type:String,
        enum:["active","inactive"],
        default:"inactive"
    },
    vehicle:{
        color:{
            type : String,
            required:true,
            minlength:[3,'color must be atleast 3 char long']
        },
        plate:{
            type : String,
            required:true,
            minlength:[3,'plate must be atleast 3 char long']
        },
        capacity:{
            type : Number,
            required:true,
            min:[1,'capacity must be atleast 1']
        },
        vehicleType:{
            type:String,
            enum:["car","bike","auto"],
            required:true
        }
    },
    location:{
        lat:{
            type:Number,
            
        },
        lng:{
            type:Number,
            
        }
    }
})

captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET,{ expiresIn:'24h'})
    return token;
}
captainSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}



const captainModel = mongoose.model('captain',captainSchema)

module.exports = captainModel;