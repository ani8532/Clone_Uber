const captainController = require('../controllers/captain.controller');
const express = require('express');
const router = express.Router(); 
const {body}=require('express-validator');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:2}).withMessage('First name must contain 2 character long'),
    body('password').isLength({min : 6}).withMessage('password be atleast 6 character long'),
    body('vehicle.color').isLength({min:3}).withMessage('color must be atleast 3 char long'),
    body('vehicle.plate').isLength({min:3}).withMessage('color must be atleast 3 char long'),
    body('vehicle.capacity').isInt().withMessage('capacity must be atleast 1'),
    body('vehicle.vehicleType').isIn(['car','bike','auto']).withMessage('vehicle type must be car,bike or auto')

],
captainController.registerCaptain
)

router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min : 6}).withMessage('password be atleast 6 character long')
],
captainController.loginCaptain
)
router.get('/profile',authMiddleware.authCaptain,captainController.getCaptainProfile)

router.get('/logout',authMiddleware.authCaptain,captainController.logoutCaptain)
module.exports = router;