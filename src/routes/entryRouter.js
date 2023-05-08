const express = require('express');
const router = express.Router();

//importar los controllers
const {
  getVotes,
  getPlaces,
  getCategories
} = require('../controllers/entries');

//middlewares

//entries endpoints
router.get('/entries/votes', getVotes);
router.get('/entries/places', getPlaces);
router.get('/entries/votes', getCategories);
router.post('/entries/newEntry', postEntry);
router.post('/entries/vote', postVote);

module.exports = router;