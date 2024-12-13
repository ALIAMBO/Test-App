const express = require('express');
const router = express.Router();
const userController = require('../controllers/Usercontroller');

// Define routes here
router.get('/users', userController.getUsers);
router.post('/users', userController.createUser);

// Export the router
module.exports = router;
