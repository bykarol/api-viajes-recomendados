const getDB = require('../db/db');

const placeExists = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { id } = req.params;
    let identification;
    if (req.params.id) identification = req.params.id;
    if (req.params.place_id) identification = req.params.place_id;

    const [place] = await connection.query(
      `
          SELECT id
          FROM places
          WHERE id=?
        `,
      [identification]
    );

    if (place.length === 0) {
      return res.status(404).send("The place doesn't exists");
    }

    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = placeExists;
