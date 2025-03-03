const userModel = require('../models/user.models');
const userService =require('../services/user.service');
const bcrypt = require('bcrypt');   
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.models');

module.exports.authUser = async(req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({errors:[{msg:"Unauthorized"}]});
    }
    const isBlacklisted = await blacklistTokenModel.findOne({token : token}); 
    if (isBlacklisted) {
        return res.status(401).json({errors:[{msg:"Unauthorized"}]});
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);

        req.user = user;
        return next();
        
    }catch(err){
        return res.status(401).json({errors:[{msg:"Unauthorized"}]});
    }
}

module.exports.authCaptain = async (req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    
    if (!token) {
        return res.status(401).json({errors:[{msg:"Unauthorized"}]});
    }
    const isBlacklisted = await blacklistTokenModel.findOne({token : token}); 
    if (isBlacklisted) {
        return res.status(401).json({errors:[{msg:"Unauthorized"}]});
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);
        
        req.captain = captain;
        return next();  
    }catch(err){
        res.status(401).json({errors:[{msg:"Unauthorized"}]});
    }

}