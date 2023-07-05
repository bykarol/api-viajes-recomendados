const getDB = require('../../db/db');

const getPlacesByCategory = async (req, res) => {
  let connect;
  const id = req.params.id;
  try {
    connect = await getDB();
    const [result] = await connect.query(
      `SELECT c.id as category_id, c.name as category_name, sum(v.vote)/count(v.vote) as votes_average, p.*, photos.photo,
       v.id, count(v.comment) as comments_qty, count(v.vote) as votes_qty, sum(v.vote)/count(v.vote) as votes_average
      FROM categories c
      INNER JOIN place_category pc ON c.id = pc.category_id
      INNER JOIN places p ON p.id = pc.place_id
      LEFT JOIN votes v ON p.id = v.place_id
      LEFT JOIN photos ON p.id = photos.place_id
      WHERE c.id = ?`,
      [id]
    );

    if (result.length === 0) {
      return res.status(404).send({
        status: 'error',
        message: "The category doesn't exist",
      });
    }

    res.status(200).send({
      status: 'ok',
      message: `Places listed by category: ${result[0].category_name}`,
      data: result,
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

module.exports = getPlacesByCategory;
