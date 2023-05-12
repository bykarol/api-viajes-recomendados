const getDB = require('../../db/db');

const listPlaces = async (req, res) => {
  try {
    const connect = await getDB();
    const [listPlaces] = await connect.query(
      `SELECT p.date, p.title, p.shortDescription, p.largeDescription, p.city, p.country, c.name as category
      FROM places p
      INNER JOIN place_category pc ON pc.place_id=p.id
      INNER JOIN categories c ON c.id=pc.category_id
      ORDER BY p.date ASC;`
    );

    connect.release();

    res.status(200).send({
      status: 'ok',
      message: listPlaces,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
};

module.exports = listPlaces;
