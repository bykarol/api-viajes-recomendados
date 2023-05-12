const express = require('express');

//importar los controllers
const {
  getVotes,
  getPlacesByCity,
  postPlace,
  getPlacesbyCountry,
  postVote,
  getCategories,
  getPlacesByCategory,
  getPlacesByID,
  listPlaces,
} = require('../controllers/entries');

//middlewares
const isUser = require('../middlewares/isUser');
const placeExists = require('../middlewares/placeExists');

const router = express.Router();
//entries endpoints
router.get('/', listPlaces);
router.get('/places/listcategories', getCategories);
router.get('/places/listvotes', getVotes);
router.get('/places/:id', placeExists, getPlacesByID);
router.get('/places/category/:category', getPlacesByCategory);
router.get('/places/city/:city', getPlacesByCity);
router.get('/places/country/:country', getPlacesbyCountry);

router.post('/places/newplace', isUser, postPlace);
router.post('/places/newvote', isUser, postVote);
//router.post('/places/addPhoto', isUser, postPhoto);

module.exports = router;
