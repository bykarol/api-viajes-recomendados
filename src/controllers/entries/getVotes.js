const getDB = require('../../db/db');

const getVotes = async (req, res) => {
  try {
    const connect = await getDB();
    const [votesPlaces] = await connect.query(
      `SELECT p.*, SUM(v.vote) AS "total votes"
            FROM places p
            INNER JOIN votes v ON p.id = v.place_id
            GROUP BY p.id ORDER BY SUM(v.vote) DESC;`
    );

    connect.release();

    res.status(200).send({
      status: 'ok',
      message: votesPlaces,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send('Error en el servidor');
  }
};

module.exports = getVotes;
