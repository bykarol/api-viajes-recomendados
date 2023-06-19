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
const {validateParams} = require('../middlewares/isValid');
const cityExists = require('../middlewares/cityExists');
const countryExists = require('../middlewares/countryExist');


const router = express.Router();
//entries endpoints
router.get('/', listPlaces);
router.get('/places/placesbycategories', getPlacesByCategories);
router.get('/places/listvotes', getVotes);
router.get('/places/:id',validateParams, placeExists, getPlacesByID);
router.get('/places/category/:id',validateParams, getPlacesByCategory);
router.get('/places/city/:city',validateParams, cityExists, getPlacesByCity);
router.get('/places/country/:country',validateParams, countryExists, getPlacesbyCountry);
router.get('/categorylist', getCategories);//getCategories


router.post('/places/newplace',validateParams, isUser, postPlace);
router.post('/places/newvote/:id',validateParams, placeExists, isUser, postVote);
router.post('/places/addphoto/:id',validateParams, isUser, placeExists, postPhoto);

router.delete(
  '/places/delete/:id',
  validateParams,
  isUser,
  placeExists,
  isMyEntry,
  deletePlace
);

module.exports = router;
