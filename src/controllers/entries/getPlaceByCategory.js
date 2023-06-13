const getDB = require('../../db/db');
const _ = require('lodash'); //paquete que permite agrupar elementos en un array de objetos

const getPlacesByCategory = async (req, res) => {
  const category = req.params.category;
  try {
    const connect = await getDB();
    const [result] = await connect.query(
      `SELECT p.*, c.name as category_name
      FROM categories c
      INNER JOIN place_category pc ON c.id = pc.category_id
      INNER JOIN places p ON p.id = pc.place_id
      WHERE c.name = ?`,
      [category]
    );
    connect.release();
    const groupedbyCategory = _.chain(result).groupBy("category_name");

    res.status(200).send({
      status: 'ok',
      categories: groupedbyCategory,
    });
  } catch (err) {
    
    res.status(500).send(err.message);
  }
};

module.exports = getPlacesByCategory;
