const getDB = require('../../db/db');
// const _ = require('lodash'); //paquete que permite agrupar elementos en un array de objetos

const getPlacesbyCountry = async (req, res) => {
  let connect;
  try {
    connect = await getDB();

    const { country } = req.params;

    if (!country) {
      const error = new Error('Nothing found with these parameters');
      error.httpStatus = 404;
      throw error;
    }

    const [experiences] = await connect.query(
      `
      SELECT places.*, photos.photo
      FROM places
      LEFT JOIN photos ON places.id = photos.place_id
      WHERE places.country=?
      `,
      [country]
    );

    const experiencesWithPhotos = {};
    
    for (const experience of experiences) {
      const placeId = experience.id;

      if (!experiencesWithPhotos[placeId]) {
        experiencesWithPhotos[placeId] = {
          id: placeId,
          title: experience.title,
          shortDescription: experience.shortDescription,
          largeDescription: experience.largeDescription,
          date: experience.date,
          city: experience.city,
          country: experience.country,
          user_id: experience.user_id,
          photos: []
        };
      }

      if (experience.photo) {
        experiencesWithPhotos[placeId].photos.push(experience.photo);
      }
    }
    const response = Object.values(experiencesWithPhotos);

    // const groupedbyCountry = _.chain(experiences).groupBy('country');

    res.status(200).send({
      status: 'ok',
      message: `List of places by country: ${country}`,
      data: response,
    });
  } catch (err) {
    res.status(err.httpStatus).send({
      status: 'error',
      message: err.message
    })
  } finally {
    if (connect) connect.release();
  }
};

module.exports = getPlacesbyCountry;
