const getDB = require('../../db/db');

const deletePlace = async (req, res) => {
  let connect;
  try {
    connect = await getDB();
    const { id } = req.params;

    const [entry] = await connect.query(
      `SELECT p.id, p.title, p.shortDescription, p.largeDescription, p.city, p.country, p.user_id, 
      ph.id AS idPhoto, ph.date AS datePhoto, ph.photo
      FROM places p
      INNER JOIN photos ph ON p.id=ph.place_id
      WHERE p.id =?`,
      [id]
    );
    await connect.query(`DELETE FROM place_category WHERE place_id=?`, [id]);
    await connect.query(`DELETE FROM photos WHERE place_id=?`, [id]);
    await connect.query(`DELETE FROM votes WHERE place_id=?`, [id]);
    await connect.query(`DELETE FROM places WHERE id=?`, [id]);

    res.send({
      status: 'ok',
      message: `The entry with id ${id} was successfully deleted`,
      data: entry
    });
  } catch (err) {
    res.status(500).send({
      status: 'error',
      message: err.message
    });
  } finally {
    if (connect) connect.release();
  }
};

module.exports = deletePlace;
