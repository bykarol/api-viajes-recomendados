const express = require('express');
const router = express.Router();

//importar los controllers
const { postUser, loginUser, modifyPassword } = require('../controllers/users');

//middlewares
const { validateBody } = require('../middlewares/isValid');
const isUser = require('../middlewares/isUser');

//users endpoints
router.post('/users/login', loginUser);
router.post('/users/newuser', validateBody, postUser);
router.patch('/users/newpassword', isUser, validateBody, modifyPassword);

module.exports = router;
