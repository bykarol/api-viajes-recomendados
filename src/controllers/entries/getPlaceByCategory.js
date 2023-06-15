const getDB = require('../../db/db');
const _ = require('lodash'); //paquete que permite agrupar elementos en un array de objetos

const getPlacesByCategory = async (req, res) => {
  let connect;
  const id_category = req.params.id_category;
  try {
    connect = await getDB();
    const [result] = await connect.query(
      `SELECT p.*, c.name as category_name, c.id
      FROM categories c
      INNER JOIN place_category pc ON c.id = pc.category_id
      INNER JOIN places p ON p.id = pc.place_id
      WHERE c.id = ?`,
      [id_category]
    );
    if (result.length === 0) {
      return res.status(404).send("The category doesn't exists");
    }

    const groupedbyCategory = _.chain(result).groupBy('category_name');

    res.status(200).send({
      status: 'ok',
      categories: groupedbyCategory,
    });
  } catch (err) {
    res.status(500).send(err.message);
  } finally {
    if (connect) connect.release();
  }
};

module.exports = getPlacesByCategory;
