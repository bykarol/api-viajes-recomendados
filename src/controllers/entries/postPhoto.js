const getDB = require('../../db/db');
const savePhoto = require('../../service/savePhoto');

const postPhoto = async (req, res) => {
  let connect;

  try {
    connect = await getDB();

    const { place_id } = req.params;
    let savedPhoto;

    if (req.files && Object.keys(req.files).length > 0) {
      savedPhoto = await savePhoto(Object.values(req.files)[0]);
      await connect.query(
        `
                INSERT INTO photos(photo, place_id) VALUES (?, ?)
                `,
        [savedPhoto, place_id]
      );
    }
    res.status(200).send({
      status: 'ok',
      message: "Photo posted succesfully",
      data: {
        info: req.files.data,
        date: new Date(),
        photo: savedPhoto,
        place: place_id,
      },
    });
  } catch (err) {
    res.status(500).send({
      status: 'error',
      message: err.message
    })
  } finally {
    if (connect) connect.release();
  }
};
module.exports = postPhoto;
