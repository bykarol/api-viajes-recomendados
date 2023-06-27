const getDB = require('../../db/db');
const savePhoto = require('../../service/savePhoto');

const postPlace = async (req, res) => {
  let connect;
  try {
    connect = await getDB();
    const { title, shortDescription, largeDescription, city, country, categories, photos } =
      req.body;

    if (!title || !shortDescription || !city || !country) {
      return res.status(400).send({
        status: 'error',
        message: "Fill the required fields."
      });
    }

    if (!photos) {
      return res.status(400).send({
        status: 'error',
        message: "You must add at least one photo."
      });
    }

    if (!categories) {
      return res.status(400).send({
        status: 'error',
        message: "You must select at least one category."
      });
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

    //adding photos
    if (photos && Object.keys(photos).length > 0) {
      for (let photosData of Object.values(photos).slice(0, 3)) {
        const photoName = await savePhoto(photosData);
        await connect.query(
          `
            INSERT INTO photos(photo, place_id) VALUES (?, ?)
            `,
          [photoName, insertId]
        );
      }
    }

    //adding categories
    for (let category of categories) {
      await connect.query(
        `
            INSERT INTO place_category (place_id, category_id) VALUES (?, ?)
            `,
        [insertId, category]
      );
    }

    const [entry] = await connect.query(
      `SELECT p.id AS place_id, p.title, p.shortDescription, p.largeDescription, p.city, p.country, p.user_id, 
      ph.id AS photo_id, ph.date AS photo_date, ph.photo AS photo_file
      FROM places p
      INNER JOIN photos ph ON p.id=ph.place_id
      WHERE p.id =?`,
      [result.insertId]
    );
    let categoriesNames = [];
    for (let category_id of categories) {
      const [category_name] = await connect.query(
        `SELECT c.name AS category, c.id AS category_id
        FROM categories c
        WHERE c.id=?
            `,
        [category_id]
      );
      categoriesNames.push(category_name[0])
    }

    res.status(200).send({
      status: 'ok',
      message: 'Place posted successfully.',
      data: {
        entry,
        categoriesNames
      }
    });
  } catch (err) {
    res.status(err.httpStatus).send({
      status: 'error',
      message: err.message
    })
  } finally {
    if (connect) connect.release();
  }
};

module.exports = postPlace;
