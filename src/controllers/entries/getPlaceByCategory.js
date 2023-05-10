const getDB = require('../../db/db');

const getPlacesByCategory = async (req, res) => {
  const category = req.params.category;
  try {
    const connect = await getDB();
    const getPlacesByCategory = await connect.query(
      `SELECT c.name AS category,
            p.title AS activity
       FROM places p 
       INNER JOIN place_category pc ON p.id = pc.place_id 
       INNER JOIN categories c ON pc.category_id = c.id 
       WHERE c.name = ?`,
      [category]
    );
    connect.release();

    res.status(200).send({
      status: 'ok',
      message: getPlacesByCategory,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send('Error en el servidor');
  }
};

module.exports = getPlacesByCategory;