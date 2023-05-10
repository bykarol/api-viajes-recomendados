const getPlaces = require('./getPlaces');
const getVotes = require('./getVotes');
const postPlace = require('./postPlace');
const postVote = require('./postVote');
const getPlacesByCategory = require('./getPlaceByCategory');
const getCategories = require('./getCategories')

module.exports = {
  getPlaces,
  getVotes,
  postPlace,
  postVote,
  getCategories,
  getPlacesByCategory
};
