const express = require('express');

//importar los controllers
const {
  getVotes,
  getPlaces,
  getPlacesbyCountry,
  postPlace,
  // postVote,
  //getCategories,
} = require('../controllers/entries');

const router = express.Router();
//middlewares

//entries endpoints
router.get('/places/listvotes', getVotes);
router.get('/places/places/:city', getPlaces);
router.get('/places/country/:country', getPlacesbyCountry);
router.post('/places/newplace', postPlace);
// router.post('/places/newvote', postVote);
//router.get('/places/votes', getCategories);

module.exports = router;
