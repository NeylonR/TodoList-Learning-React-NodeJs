const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

router.post('/signup', userController.signup);
router.get('/signup', userController.get);
router.post('/login', userController.login);

module.exports = router;