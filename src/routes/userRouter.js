const express = require('express');
const router = express.Router();

//importar los controllers
const { postUser, loginUser } = require('../controllers/users');

//middlewares
const { validateBody } = require('../middlewares/isValid')

//users endpoints
router.post('/users/login', loginUser);
router.post('/users/newuser', validateBody, postUser);

module.exports = router;
