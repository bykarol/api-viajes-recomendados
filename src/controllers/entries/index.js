const getPlacesByCity = require('./getPlacesByCity');
const getVotes = require('./getVotes');
const postPlace = require('./postPlace');
const postVote = require('./postVote');
const getPlacesByCategory = require('./getPlaceByCategory');
const getCategories = require('./getCategories');
const getPlacesbyCountry = require('./getPlacesbyCountry');
const listPlaces = require('./listPlaces');
const getPlacesByID = require('./getPlacesByID');

module.exports = {
  getPlacesByCity,
  getVotes,
  postPlace,
  postVote,
  getCategories,
  getPlacesByCategory,
  getPlacesbyCountry,
  listPlaces,
  getPlacesByID,
};
