const express = require('express');

//importar los controllers
const {
  getVotes,
  getPlaces,
  postPlace,
  postVote,
  //getCategories,
} = require('../controllers/entries');

const router = express.Router();
//middlewares

//entries endpoints
router.get('/places/listvotes', getVotes);
router.get('/places/places/:city', getPlaces);
router.post('/places/newplace', postPlace);
router.post('/places/newvote', postVote);
//router.get('/places/votes', getCategories);

module.exports = router;
