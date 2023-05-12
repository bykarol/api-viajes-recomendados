const getDB = require('../../db/db');
const _ = require('lodash'); //paquete que permite agrupar elementos en un array de objetos

const getPlacesbyCountry = async (req, res) => {
  try {
    const connect = await getDB();

    const { country } = req.params;

    if (!country) {
      const error = new Error('Nothing found with these parameters');
      error.httpStatus = 404;
      throw error;
    }

    const [experiences] = await connect.query(
      `SELECT title, shortDescription, largeDescription, date, city, country
       FROM places   WHERE country=?`,
      [country]
    );

    connect.release();
    const groupedbyCountry = _.chain(experiences).groupBy("country");

    res.status(200).send({
      status: 'ok',
      data: groupedbyCountry,
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

module.exports = getPlacesbyCountry;
