const getDB = require('../../db/db');

const postVotes = async (req, res) => {
  let connect;

  try {
    connect = await getDB();
    const { id } = req.params;
    const userId = req.userInfo.id;
    const { vote, comment } = req.body;

    //comprobamos que el usuario no haya votado antes esta entrada

    const [existingVote] = await connect.query(
      `
      SELECT id
      FROM votes
      WHERE user_id = ? AND place_id = ?
    `,
      [userId, id]
    );

    if (existingVote.length > 0) {
      return res.status(403).send({
        status: 'error',
        message: 'Ya has votado este post.',
      });
    }

    //introducimos voto con comentario

    await connect.query(
      `INSERT INTO votes (vote, comment, user_id, place_id) VALUES (?,?,?,?)`,
      [vote, comment, req.userInfo.id, id]
    );

    //media votos
    const [average] = await connect.query(
      `
      SELECT AVG(v.vote) AS votes_average
      FROM places p
      LEFT JOIN votes  v ON p.id = v.place_id
      WHERE p.id = ?
    `,
      [id]
    );

    res.status(200).send({
      status: 'ok',
      message: 'Voto añadido correctamente',
      data: {
        place_id: id,
        votes_average: average[0].votes_average,
      },
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

module.exports = postVotes;
