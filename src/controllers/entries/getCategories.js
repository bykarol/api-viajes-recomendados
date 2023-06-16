const getDB = require('../../db/db');

const getCategories = async (req, res) => {
  let connect;
  try {
    connect = await getDB();
    const [result] = await connect.query(
      `SELECT id, name as category_name
      FROM categories
      ORDER BY id;`
    );

    res.status(200).send({
      status: 'ok',
      message: "List of categories ordered by ID",
      data: result,
    });
  } catch (err) {
    res.status(500).send(err.message);
  } finally {
    if (connect) connect.release();
  }
};

module.exports = getCategories;