const getDB = require('../../db/db');

const getVotes = async (req, res) => {
  try {
    const connect = await getDB();
    const [votesPlaces] = await connect.query(
      `SELECT sum(v.vote)/count(v.vote) as votes_average, p.title, p.shortDescription, p.country, p.date, p.id as "place_id"
      FROM places p
      LEFT JOIN votes v ON p.id = v.place_id
      GROUP BY p.id ORDER BY SUM(v.vote) DESC;`
    );

    res.status(200).send({
      status: 'ok',
      message: "List of places ordered by most voted",
      data: votesPlaces,
    });
  } catch (err) {

    res.status(500).send(err.message);
  } finally {
    if (connect) connect.release();
  }
};

module.exports = getVotes;
