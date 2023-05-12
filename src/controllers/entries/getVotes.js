const getDB = require('../../db/db');

const getVotes = async (req, res) => {
  try {
    const connect = await getDB();
    const [votesPlaces] = await connect.query(
      `SELECT sum(v.vote)/count(v.vote) as votes_average, p.title, p.shortDescription, p.city, p.country
      FROM places p
      INNER JOIN votes v ON p.id = v.place_id
      GROUP BY p.id ORDER BY SUM(v.vote) DESC;`
    );

    connect.release();

    res.status(200).send({
      status: 'ok',
      data: votesPlaces,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send('Server error');
  }
};

module.exports = getVotes;
