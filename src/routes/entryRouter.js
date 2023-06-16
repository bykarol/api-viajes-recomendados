const express = require('express');

//importar los controllers
const {
  getVotes,
  getPlacesByCity,
  postPlace,
  getPlacesbyCountry,
  postVote,
  getPlacesByCategories,
  getPlacesByCategory,
  getPlacesByID,
  listPlaces,
  postPhoto,
  deletePlace,
  getCategories
} = require('../controllers/entries');

//middlewares
const isUser = require('../middlewares/isUser');
const placeExists = require('../middlewares/placeExists');
const isMyEntry = require('../middlewares/isMyEntry');

const router = express.Router();
//entries endpoints
router.get('/', listPlaces);
router.get('/places/placesbycategories', getPlacesByCategories);
router.get('/places/listvotes', getVotes);
router.get('/places/:id', placeExists, getPlacesByID);
router.get('/places/category/:id', getPlacesByCategory);
router.get('/places/city/:city', getPlacesByCity);
router.get('/places/country/:country', getPlacesbyCountry);
router.get('/categorylist', getCategories);//getCategories


router.post('/places/newplace', isUser, postPlace);
router.post('/places/newvote/:id', placeExists, isUser, postVote);
router.post('/places/addphoto/:id', isUser, placeExists, postPhoto);

router.delete(
  '/places/delete/:id',
  isUser,
  placeExists,
  isMyEntry,
  deletePlace
);

module.exports = router;
