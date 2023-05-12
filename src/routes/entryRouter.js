const express = require('express');

//importar los controllers
const {
  getVotes,
  getPlaces,
  postPlace,
  getPlacesbyCountry,
  postVote,
  getCategories,
  getPlacesByCategory,
} = require('../controllers/entries');
const isUser = require('../middlewares/isUser');

const router = express.Router();
//middlewares

//entries endpoints
//router.get('/', listPlaces)
//router.get('/places/:id', getPlacesByID);
router.get('/places/listvotes', getVotes);
router.get('/places/listcategories', getCategories);
router.get('/places/category/:category', getPlacesByCategory);
router.get('/places/city/:city', getPlaces);
router.get('/places/country/:country', getPlacesbyCountry);

router.post('/places/newplace', isUser, postPlace);
router.post('/places/newvote', isUser, postVote);
//router.post('/places/addPhoto', isUser, postPhoto);

module.exports = router;
