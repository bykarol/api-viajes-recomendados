const express = require('express');

//importar los controllers
const {
  getVotes,
  getPlaces,
  postPlace,
  getPlacesbyCountry,
  postVote,
  getCategories,
  getPlacesByCategory
} = require('../controllers/entries');

const router = express.Router();
//middlewares

//entries endpoints
router.get('/places/listvotes', getVotes);
router.get('/places/city/:city', getPlaces);
router.get('/places/country/:country', getPlacesbyCountry);

router.post('/places/newplace', postPlace);
router.post('/places/newvote', postVote);
router.get('/places/votes', getCategories);
router.get('/places/place/:category', getPlacesByCategory)

module.exports = router;
