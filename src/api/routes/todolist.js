const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const todolistController = require('../controllers/todolist');

router.post('', auth, todolistController.createList);
router.get('', auth, todolistController.getUserList);
router.put('/:id', auth, todolistController.editList);
router.delete('/:id', auth, todolistController.deleteList);

module.exports = router;