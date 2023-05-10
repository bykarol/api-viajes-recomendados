const express = require('express');

//importar los controllers
const {
  getVotes,
  getPlaces,
  //getCategories,
  // postEntry,
  // postVote,
} = require('../controllers/entries');

const router = express.Router();
//middlewares

//entries endpoints
router.get('/entries/votes', getVotes);
router.get('/entries/places/:city', getPlaces);
//router.get('/entries/votes', getCategories);
//router.post('/entries/newEntry', postEntry);
//router.post('/entries/vote', postVote);

module.exports = router;
