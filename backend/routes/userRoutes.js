const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');

router.get('/users', auth, admin, userController.getAllUsers);
router.get('/users/:id', auth, admin, userController.getUserById);
router.put('/users/:id', auth, admin, userController.updateUser);
router.delete('/users/:id', auth, admin, userController.deleteUser);
router.get('/admin/export-users', auth, admin, userController.exportUsers);

module.exports = router;
