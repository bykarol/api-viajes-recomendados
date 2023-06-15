const getDB = require('../../db/db');

const listPlaces = async (req, res) => {
  let connect;
  try {
    connect = await getDB();
    const [listPlaces] = await connect.query(
      `SELECT p.date, p.title, p.shortDescription, p.country, sum(v.vote)/count(v.vote) as votes_average, p.id as "place_id"
      FROM places p
      LEFT JOIN votes v ON p.id=v.place_id
      GROUP BY p.id
      ORDER BY p.date DESC;`
    );

    res.status(200).send({
      status: 'ok',
      message: 'List of places ordered by date',
      length: listPlaces.length,
      data: listPlaces,
    });
  } catch (err) {
    res.status(500).send(err.message);
  } finally {
    if (connect) connect.release();
  }
};

module.exports = listPlaces;
