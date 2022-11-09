const express = require('express');
const router = express.Router();
const checkEmail = require('../middleware/checkEmail');
const password = require('../middleware/password');
const userCtrl = require('../controllers/user');


router.post('/signup',checkEmail, password, userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/:id', userCtrl.getOneUser); // test axios
router.get('/', userCtrl.getAllUsers); // test axios

module.exports = router;
