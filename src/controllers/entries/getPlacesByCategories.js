const getDB = require('../../db/db');
const _ = require('lodash'); //paquete que permite agrupar elementos en un array de objetos

const getPlacesByCategories = async (req, res) => {
  let connect;
  try {
    connect = await getDB();
    const [result] = await connect.query(
      `SELECT c.id as category_id, c.name as category_name, p.title, p.shortDescription, p.country, p.id as "place_id"
      FROM categories c
      INNER JOIN place_category pc ON c.id = pc.category_id
      INNER JOIN places p ON p.id = pc.place_id
      ORDER BY c.name;`
    );

    const groupedbyCategory = _.chain(result).groupBy('category_name');

    res.status(200).send({
      status: 'ok',
      message: 'Lista de lugares agrupados por categories',
      data: groupedbyCategory,
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

module.exports = getPlacesByCategories;
