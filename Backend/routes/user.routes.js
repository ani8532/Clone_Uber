const express = require('express');
const router = express.Router();
const { body } =require("express-validator")
const userController = require('../controllers/user.controller');


router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:2}).withMessage('First name must contain 2 character long'),
    body('password').isLength({min : 6}).withMessage('password be atleast 8 character long')

],

     userController.registerUser
)









module.exports = router;