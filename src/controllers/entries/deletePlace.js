const getDB = require('../../db/db');

const deletePlace = async (req, res) => {
  try {
    const connect = await getDB();
    const { id } = req.params;

    await connect.query(`DELETE FROM votes WHERE place_id=?`, [id]);

    await connect.query(`DELETE FROM places WHERE id=?`, [id]);

    res.send({
      status: 'ok',
      message: `The entry with id ${id} was successfully deleted`,
    });
  } catch (err) {

    res.send(err.message);
  } finally {
    if (connect) connect.release();
  }
};

module.exports = deletePlace;
