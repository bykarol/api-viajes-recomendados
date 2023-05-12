const getDB = require('../../db/db');

const getPlacesByID = async (req, res) => {
  try {
    const connect = await getDB();
    const { id } = req.params;

    const [getPlacesByID] = await connect.query(
      `SELECT title, shortDescription, largeDescription, date, country, city
        FROM places   WHERE id=?`,
      [id]
    );

    connect.release();

    res.status(200).send({
      status: 'ok',
      message: getPlacesByID,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
};

module.exports = getPlacesByID;
