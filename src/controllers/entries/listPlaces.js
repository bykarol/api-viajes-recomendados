const getDB = require('../../db/db');

const listPlaces = async (req, res) => {
  let connect;
  try {
    connect = await getDB();
    const [listPlaces] = await connect.query(
      `SELECT p.date, p.title, p.shortDescription, p.city, p.country, count(v.comment) as comments_qty, count(v.vote) as votes_qty, sum(v.vote)/count(v.vote) as votes_average, p.id as "place_id", ph.photo
      FROM places p
      INNER JOIN photos ph ON p.id = ph.place_id
      LEFT JOIN votes v ON p.id=v.place_id
      GROUP BY p.id
      ORDER BY p.date DESC;`
    );
    console.log(listPlaces.votes_qty);
    res.status(200).send({
      status: 'ok',
      message: 'List of places ordered by date',
      length: listPlaces.length,
      data: listPlaces,
    });
  } catch (err) {
    res.status(500).send({
      status: 'error',
      message: err.message,
    });
  } finally {
    if (connect) connect.release();
  }
};

module.exports = listPlaces;
