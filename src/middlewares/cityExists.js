const getDB = require('../db/db');

const cityExists = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { city } = req.params;
    const lowercaseCity = city.toLowerCase();

    const [place] = await connection.query(
      `
          SELECT id
          FROM places
          WHERE city=?
        `,
      [lowercaseCity]
    );

    if (place.length === 0) {
      return res.status(404).send({
        status: 'error',
        message: 'La ciudad no fue encontrada en la base de datos.',
      });
    }

    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = cityExists;
