const express = require('express');
const router = express.Router();

//importar los controllers
const { postUser, loginUser } = require('../controllers/users');

//middlewares

//users endpoints
router.post('/users/login', loginUser);
router.post('/users/newuser', postUser);

module.exports = router;
