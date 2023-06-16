const getPlacesByCity = require('./getPlacesByCity');
const getVotes = require('./getVotes');
const postPlace = require('./postPlace');
const postVote = require('./postVote');
const getPlacesByCategory = require('./getPlaceByCategory');
const getPlacesByCategories = require('./getPlacesByCategories');
const getPlacesbyCountry = require('./getPlacesbyCountry');
const listPlaces = require('./listPlaces');
const getPlacesByID = require('./getPlacesByID');
const postPhoto = require('./postPhoto');
const deletePlace = require('./deletePlace');
const getCategories = require('./getCategories')

module.exports = {
  getPlacesByCity,
  getVotes,
  postPlace,
  postVote,
  getPlacesByCategories,
  getPlacesByCategory,
  getPlacesbyCountry,
  listPlaces,
  getPlacesByID,
  postPhoto,
  deletePlace,
  getCategories
};
