const getDB = require('../../db/db');
const getCategories = async (req, res) => {
  try {
    const connect = await getDB();
    const getCategories = await connect.query(
      `SELECT 
      c.name as category, 
      p.title as activity 
      FROM 
      categories c 
      INNER JOIN place_category pc ON c.id = pc.category_id 
      INNER JOIN places p ON pc.place_id = p.id;`
    );

    connect.release();

    res.status(200).send({
      status: 'ok',
      message: getCategories,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send('Error en el servidor');
  }
};

module.exports = getCategories;