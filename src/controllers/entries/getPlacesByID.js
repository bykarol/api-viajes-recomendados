const getDB = require('../../db/db');

const getPlacesByID = async (req, res) => {
  let connect;
  try {
    connect = await getDB();
    const { id } = req.params;

    const [generalInfo] = await connect.query(
      `SELECT p.id as place_id, p.title, p.user_id as posted_by_userID, p.shortDescription, p.largeDescription, p.date as entry_date, p.city, p.country
      FROM places p
      WHERE p.id=?;`,
      [id]
    );
    const [photos] = await connect.query(
      `SELECT ph.photo
      FROM photos ph
      WHERE place_id=?;`,
      [id]
    );
    const [comments] = await connect.query(
      `SELECT v.vote, v.comment, v.date as comment_date, v.user_id as commented_by_userID
      FROM votes v
      WHERE place_id=?;`,
      [id]
    );

    const [categories] = await connect.query(
      `SELECT c.name
      FROM places p
      LEFT JOIN place_category pc ON p.id = pc.place_id
      LEFT JOIN categories c ON pc.category_id = c.id
      WHERE place_id=?;`,
      [id]
    );

    res.status(200).send({
      status: 'ok',
      message: `Detail of place_id: ${id}`,
      data: {
        generalInfo,
        photos,
        comments,
        categories
      }
    });
  } catch (err) {
    res.status(500).send(err.message);
  } finally {
    if (connect) connect.release();
  }
};

module.exports = getPlacesByID;
