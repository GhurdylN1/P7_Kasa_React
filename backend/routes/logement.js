const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const logementCtrl = require('../controllers/logement');

router.post('/', auth, multer.fields([{name:'image', maxCount: 1},{name:'pictures', maxCount: 8}]), logementCtrl.createLogement);
router.post('/:id/rating', auth, logementCtrl.voteLogement);
router.put('/:id', auth, multer.fields([{name:'image', maxCount: 1},{name:'pictures', maxCount: 8}]), logementCtrl.modifyLogement);
router.delete('/:id', auth, logementCtrl.deleteLogement);
// router.get('/:id', auth, logementCtrl.getOneLogement);
// router.get('/', auth, logementCtrl.getAllLogements);
router.get('/:id', logementCtrl.getOneLogement); // pour le test axios sans l'auth
router.get('/', logementCtrl.getAllLogements); // pour le test axios sans l'auth
router.get('/byUserId/:userId', logementCtrl.getAllLogementsByUserId); // pour le test axios sans l'auth 

module.exports = router;