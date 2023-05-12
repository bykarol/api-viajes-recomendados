const getDB = require('../../db/db');

const postPlace = async (req, res) => {
  try {
    const connect = await getDB();
    const { title, shortDescription, largeDescription, city, country } = req.body;

    if (!title || !shortDescription || !city || !country) {
      return res.status(400).send("Fill the required fields.");
    }

    const [result] = await connect.query(
      `
      INSERT INTO places (title, shortDescription, largeDescription, city, country, user_id) values
      (?,?,?,?,?,?)`,
      [title, shortDescription, largeDescription, city, country, req.userInfo.id]
    );

    connect.release();

    res.status(200).send({
      status: 'ok',
      message: 'Place posted successfully.',
      result: result
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
}

module.exports = postPlace;