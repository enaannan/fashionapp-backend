const express = require('express');
const adminController = require('../controllers/admin');


const router = express.Router();

//login the admin
router.post('/login',adminController.login);
router.post('/register',adminController.register);
router.delete('/deletecrochet/:id',adminController.delete);
router.put('/updatecrochet/:id',adminController.update);
router.post('/addcrochet',adminController.addcrochet);
router.get('/getallcrochet',adminController.getallcrochet);

module.exports = router;