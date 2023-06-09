const getDB = require('../../db/db');
const savePhoto = require('../../service/savePhoto');

const postPlace = async (req, res) => {
  let connect;
  try {
    connect = await getDB();
    const {
      title,
      shortDescription,
      largeDescription,
      city,
      country,
      categories,
    } = req.body;

    if (!title || !shortDescription || !city || !country) {
      return res.status(400).send({
        status: 'error',
        message: 'Rellena los campos requeridos.',
      });
    }

    if (!req.files) {
      return res.status(400).send({
        status: 'error',
        message: 'Debes añadir al menos una foto.',
      });
    }

    if (!categories) {
      return res.status(400).send({
        status: 'error',
        message: 'Debes seleccionar al menos una categoría.',
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
    if (req.files.photos) {
      const photoName = await savePhoto(req.files.photos);
      await connect.query(
        `
        INSERT INTO photos(photo, place_id) VALUES (?, ?)
        `,
        [photoName, insertId]
      );
    }
    // if (req.files && Object.keys(req.files).length > 0) {
    //   console.log(Object.values(req.files))
    //   for (let photosData of Object.values(req.files).slice(0, 3)) {
    //     const photoName = await savePhoto(photosData);
    //     await connect.query(
    //       `
    //         INSERT INTO photos(photo, place_id) VALUES (?, ?)
    //         `,
    //       [photoName, insertId]
    //     );
    //   }
    // }

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
      categoriesNames.push(category_name[0]);
    }

    res.status(200).send({
      status: 'ok',
      message: 'Lugar subido correctamente.',
      data: {
        entry,
        categoriesNames,
      },
    });
  } catch (err) {
    res.status(500).send({
      status: 'error',
      message: err.message,
    });
  } finally {
    if (connect) connect.release();
  }
};

module.exports = postPlace;
