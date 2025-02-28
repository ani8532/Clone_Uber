const userModel = require('../models/user.models');
const userService =require('../services/user.service');
const bcrypt = require('bcrypt');   
const jwt = require('jsonwebtoken');

module.exports.authUser = async(req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({errors:[{msg:"Unauthorized"}]});
    }
    const isBlacklisted = await userModel.findOne({token : token}); 
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