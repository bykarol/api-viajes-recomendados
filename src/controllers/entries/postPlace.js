const getDB = require('../../db/db');
const savePhoto = require('../../service/savePhoto');

const postPlace = async (req, res) => {
  let connect;
  try {
    connect = await getDB();
    const { title, shortDescription, largeDescription, city, country } =
      req.body;

    if (!title || !shortDescription || !city || !country) {
      return res.status(400).send('Fill the required fields.');
    }

    if (!req.files) {
      return res.status(400).send('You must add at least one photo.');
    }

    const [result] = await connect.query(
      `
      INSERT INTO places (title, shortDescription, largeDescription, city, country, user_id) values
      (?,?,?,?,?,?)`,
      [
        title,
        shortDescription,
        largeDescription,
        city,
        country,
        req.userInfo.id,
      ]
    );

    const { insertId } = result;

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

    const [entry] = await connect.query(
      `SELECT p.id, p.title, p.shortDescription, p.largeDescription, p.city, p.country, p.user_id, 
      ph.id AS idPhoto, ph.date AS datePhoto, ph.photo
      FROM places p
      INNER JOIN photos ph ON p.id=ph.place_id
      WHERE p.id =?`,
      [result.insertId]
    );

    res.status(200).send({
      status: 'ok',
      message: 'Place posted successfully.',
      data: entry
    });
  } catch (err) {
    res.status(500).send(err.message);
  } finally {
    if (connect) connect.release();
  }
};

module.exports = postPlace;
