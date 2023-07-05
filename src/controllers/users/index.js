const loginUser = require('./loginUser');
const postUser = require('./postUser');
const modifyPassword = require('./modifyPassword');
const validateUser = require('./validateUser');
const updateUser = require('./updateUser');
const getUser = require('./getUser');
const getUsers = require('./getUsersInfo');


module.exports = {
  loginUser,
  postUser,
  modifyPassword,
  updateUser,
  validateUser,
  getUser,
  getUsers
};
