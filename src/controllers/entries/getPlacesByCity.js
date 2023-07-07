const getDB = require('../../db/db');
// const _ = require('lodash'); //paquete que permite agrupar elementos en un array de objetos

const getPlaces = async (req, res) => {
  let connect;
  try {
    connect = await getDB();

    const { city } = req.params;

    if (!city) {
      const error = new Error('No encontramos nada con estos parámetros');
      error.httpStatus = 404;
      throw error;
    }

    const [experiences] = await connect.query(
      `
      SELECT places.*, photos.photo
      FROM places
      LEFT JOIN photos ON places.id = photos.place_id
      WHERE places.city=?
      `,
      [city]
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
          photos: [],
        };
      }

      if (experience.photo) {
        experiencesWithPhotos[placeId].photos.push(experience.photo);
      }
    }
    const response = Object.values(experiencesWithPhotos);

    // const groupedbyCity = _.chain(experiences).groupBy('city');

    res.status(200).send({
      status: 'ok',
      message: `Lista de lugares por ciudad: ${city}`,
      data: response,
      // data: groupedbyCity,
    });
  } catch (err) {
    res.status(err.httpStatus).send({
      status: 'error',
      message: err.message,
    });
  } finally {
    if (connect) connect.release();
  }
};

module.exports = getPlaces;
