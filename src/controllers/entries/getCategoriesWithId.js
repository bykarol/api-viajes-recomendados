const getDB = require('../../db/db');

const getCategoriesWithId = async (req, res) => {
  let connect;
  try {
    connect = await getDB();
    const [result] = await connect.query(
      `SELECT id, name as category_name
      FROM categories
      ORDER BY id;`
    );

    const categories = result.map((category) => ({
      id: category.id,
      name: category.category_name,
    }));

    res.status(200).send({
      status: 'ok',
      message: "List of categories ordered by ID",
      categories: categories,
    });
  } catch (err) {
    res.status(500).send(err.message);
  } finally {
    if (connect) connect.release();
  }
};

module.exports = getCategoriesWithId;