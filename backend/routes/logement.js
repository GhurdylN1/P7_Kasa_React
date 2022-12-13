const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const logementCtrl = require('../controllers/logement');

router.post('/', auth, multer.fields([{name:'image', maxCount: 1},{name:'pictures', maxCount: 8}]), logementCtrl.createLogement);
router.post('/:id/rating', auth, logementCtrl.voteLogement);
router.put('/:id', auth, multer.fields([{name:'image', maxCount: 1},{name:'pictures', maxCount: 8}]), logementCtrl.modifyLogement);
router.delete('/:id', auth, logementCtrl.deleteLogement);
router.get('/:id', logementCtrl.getOneLogement);
router.get('/', logementCtrl.getAllLogements); 
router.get('/byUserId/:userId', logementCtrl.getAllLogementsByUserId);

module.exports = router;