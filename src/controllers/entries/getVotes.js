const getDB = require('../../db/db');

const getVotes = async (req, res) => {
  let connect;
  try {
    connect = await getDB();
    const [votesPlaces] = await connect.query(
      `SELECT v.id, count(v.comment) as comments_qty, count(v.vote) as votes_qty, sum(v.vote)/count(v.vote) as votes_average, p.id as place_id, p.title, p.shortDescription, p.country, p.date, p.user_id as post_by_user_id, ph.photo
      FROM votes v
      LEFT JOIN places p ON v.place_id = p.id 
      INNER JOIN photos ph ON p.id = ph.place_id
      GROUP BY v.place_id ORDER BY votes_average DESC;`
    );

    res.status(200).send({
      status: 'ok',
      message: 'Lista de lugares ordenados por los más votados',
      data: votesPlaces,
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

module.exports = getVotes;
