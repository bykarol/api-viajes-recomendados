const getDB = require('../../db/db');

const getPlaces = async (req, res) => {
  try {
    const connect = await getDB();

    const { city } = req.params;

    if (!city) {
      const error = new Error('No se econtró nada con esos parámetros');
      error.httpStatus = 404;
      throw error;
    }

    const [experiences] = await connect.query(
      `SELECT title, shortDescription, largeDescription, date
       FROM places   WHERE city=?`,
      [city]
    );

    connect.release();

    res.status(200).send({
      status: 'ok',
      data: experiences,
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

module.exports = getPlaces;
