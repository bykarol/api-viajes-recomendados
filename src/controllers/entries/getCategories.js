const getDB = require('../../db/db');
const _ = require('lodash'); //paquete que permite agrupar elementos en un array de objetos

const getCategories = async (req, res) => {
  let connect;
  try {
    connect = await getDB();
    const [result] = await connect.query(
      `SELECT c.name as category_name, p.title, p.shortDescription, p.country, p.id as "place_id"
      FROM categories c
      INNER JOIN place_category pc ON c.id = pc.category_id
      INNER JOIN places p ON p.id = pc.place_id
      ORDER BY c.name;`
    );

    const groupedbyCategory = _.chain(result).groupBy("category_name");

    res.status(200).send({
      status: 'ok',
      message: "List of places grouped by categories",
      categories: groupedbyCategory,
    });
  } catch (err) {
    res.status(500).send(err.message);
  } finally {
    if (connect) connect.release();
  }
};

module.exports = getCategories;
