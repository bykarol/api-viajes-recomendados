const getDB = require('../db/db');

const countryExists = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { country } = req.params;
    const lowercaseCountry = country.toLowerCase();

    const [place] = await connection.query(
      `
      SELECT id
      FROM places
      WHERE country=?
      `,
      [lowercaseCountry]
    );

    if (place.length === 0) {
      return res.status(404).send({
        status: 'error',
        message: 'El país no fue encontrado en la base de datos.',
      });
    }

    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = countryExists;
