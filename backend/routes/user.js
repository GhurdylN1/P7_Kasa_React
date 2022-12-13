const express = require('express');
const router = express.Router();
const checkEmail = require('../middleware/checkEmail');
const password = require('../middleware/password');
const userCtrl = require('../controllers/user');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


router.post('/signup',checkEmail, password, userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/:id', auth, multer.single('image'), userCtrl.upateUserProfile);
router.get('/:id', userCtrl.getOneUser);
router.get('/', userCtrl.getAllUsers);

module.exports = router;
