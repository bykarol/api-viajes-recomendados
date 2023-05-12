const getDB = require('../../db/db');

const getPlacesByID = async (req, res) => {
  try {
    const connect = await getDB();
    const { id } = req.params;

    const [getPlacesByID] = await connect.query(
      `SELECT *
        FROM places WHERE id=?`,
      [id]
    );

    connect.release();

    res.status(200).send({
      status: 'ok',
      data: getPlacesByID,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
};

module.exports = getPlacesByID;
