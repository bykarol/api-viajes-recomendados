const getDB = require('../../db/db');

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
      `SELECT title, shortDescription, largeDescription, date, country, city
       FROM places   WHERE country=?`,
      [country]
    );

    connect.release();

    res.status(200).send({
      status: 'ok',
      data: experiences,
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

module.exports = getPlacesbyCountry;
