const getDB = require('../../db/db');
const _ = require('lodash'); //paquete que permite agrupar elementos en un array de objetos

const getPlaces = async (req, res) => {
  try {
    const connect = await getDB();

    const { city } = req.params;

    if (!city) {
      const error = new Error('Nothing found with these parameters');
      error.httpStatus = 404;
      throw error;
    }

    const [experiences] = await connect.query(
      `SELECT *
       FROM places WHERE city=?`,
      [city]
    );

    connect.release();
    const groupedbyCity = _.chain(experiences).groupBy("city");
    res.status(200).send({
      status: 'ok',
      data: groupedbyCity,
    });
  } catch (err) {
    
    res.send(err.message);
  }
};

module.exports = getPlaces;
