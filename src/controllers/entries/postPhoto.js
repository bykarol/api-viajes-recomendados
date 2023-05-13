const getDB = require('../../db/db');
const savePhoto  = require('../../service/savePhoto');

const postPhoto = async (req, res) => {

    let connection;

    try{
        connection = await getDB();

        const { place_id } = req.params;
        let savedPhoto;

        if (req.files && Object.keys(req.files).length > 0) {
            savedPhoto = await savePhoto(Object.values(req.files)[0]);
            await connection.query(
                `
                INSERT INTO photos(photo, place_id) VALUES (?, ?)
                `,
                [savedPhoto, place_id]
              );
        }
        res.status(200).send({
            status: 'ok',
            data: {
            info:req.files.data,   
            date: new Date(),
            photo: savedPhoto,
            place: place_id
            },
        })
    } catch (err) {
        res.send(err)
    } finally {
        if (connection) connection.release();
    }
};
module.exports = postPhoto;