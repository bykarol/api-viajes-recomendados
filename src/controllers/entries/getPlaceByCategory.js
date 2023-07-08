const getDB = require('../../db/db');

const getPlacesByCategory = async (req, res) => {
  let connect;
  const id = req.params.id;
  try {
    connect = await getDB();

    const [categoryExists] = await connect.query(
      `SELECT id FROM categories
      WHERE id = ?`,
      [id]
    );

    if (categoryExists.length === 0) {
      return res.status(404).send({
        status: 'error',
        message: 'La categoría no existe',
      });
    }

    const [result] = await connect.query(
      ` SELECT c.id as category_id, c.name as category_name,  p.id, p.title,p.shortDescription, p.largeDescription,
      p.date, p.city,p.country, p.user_id, photos.photo, v.id as vote_id, sum(v.vote)/count(v.vote) as votes_average,
      count(v.comment) as comments_qty, count(v.vote) as votes_qty, sum(v.vote)/count(v.vote) as votes_average
       FROM categories c
      INNER JOIN place_category pc ON c.id = pc.category_id
      INNER JOIN places p ON p.id = pc.place_id
      INNER JOIN photos ON p.id = photos.place_id
      INNER JOIN votes v ON v.place_id=p.id
      WHERE c.id = ?
      GROUP BY p.id;`,
      [id]
    );

    if (result[0].category_id === null) {
      return res.status(200).send({
        status: 'ok',
        message: 'No existen lugares en esta categoría.',
      });
    }

    res.status(200).send({
      status: 'ok',
      message: `Lugares ordenados por categoría: ${result[0].category_name}`,
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
