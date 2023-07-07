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
      message: 'Lista de categoríass ordenadas por ID',
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

module.exports = getCategories;
