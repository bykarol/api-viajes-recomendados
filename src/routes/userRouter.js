const express = require('express');
const router = express.Router();

//importar los controllers
const {
  postUser,
  loginUser,
  modifyPassword,
  updateUser,
  validateUser,
  getUser,
} = require('../controllers/users');

//middlewares
const { validateBody, validateParams } = require('../middlewares/isValid');
const isUser = require('../middlewares/isUser');

//users endpoints
router.post('/users/login', loginUser);
router.post('/users/newuser', validateBody, postUser);
router.patch('/users/newpassword', validateBody, isUser, modifyPassword);
router.patch(
  '/users/update/:id',
  validateParams,
  validateBody,
  isUser,
  updateUser
);
router.get('/users/validate/:regCode', validateParams, validateUser);
router.get('/users/user', isUser, getUser);

module.exports = router;
