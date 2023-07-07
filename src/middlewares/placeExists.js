const getDB = require('../db/db');

const placeExists = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { id } = req.params;

    const [place] = await connection.query(
      `
          SELECT id
          FROM places
          WHERE id=?
        `,
      [id]
    );

    if (place.length === 0) {
      return res.status(404).send({
        status: 'error',
        message: 'El lugar no existe.',
      });
    }

    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = placeExists;
