const express = require('express');
const adminController = require('../controllers/admin');
const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() +'-'+ file.originalname )
    }
  })
   
 
var upload = multer({ storage: storage })


const router = express.Router();

//login the admin
router.post('/login',adminController.login);
router.post('/register',adminController.register);
router.delete('/deletecrochet/:id',adminController.delete);
router.put('/updatecrochet/:id',adminController.update);
router.post('/addcrochet',upload.single('image'),adminController.addcrochet);
router.get('/getallcrochet',adminController.getallcrochet);

module.exports = router;