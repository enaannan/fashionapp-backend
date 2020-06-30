const express =require('express');
const userController = require('../controllers/user');

const router=express.Router();
router.post('/login',userController.login);
router.post('/register',userController.register);
router.get('/getallcrochet',userController.getallcrochet);

module.exports=router;