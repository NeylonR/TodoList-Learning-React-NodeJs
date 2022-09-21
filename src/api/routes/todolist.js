const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const todolistController = require('../controllers/todolist');

router.put('/edit/:id', todolistController.edit);
router.post('/create', auth, todolistController.create);
router.get('', auth, todolistController.getUserList);


module.exports = router;