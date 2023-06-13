const getDB = require('../../db/db');
const savePhoto = require('../../service/savePhoto');

const postPlace = async (req, res) => {
  let connect = await getDB();
  try {
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

    const { insertId } = result

    if (req.files && Object.keys(req.files).length > 0) {
      for (let photosData of Object.values(req.files).slice(0, 3)) {
        const photoName = await savePhoto(photosData);
        await connect.query(
          `
            INSERT INTO photos(photo, place_id) VALUES (?, ?)
            `,
          [photoName, insertId]
        );
      }
    }

    res.status(200).send({
      status: 'ok',
      message: 'Place posted successfully.',
      result: result
    });
  } catch (err) {
    res.status(500).send(err.message);
  } finally {
    if (connect) connect.release();
  }
}

module.exports = postPlace;