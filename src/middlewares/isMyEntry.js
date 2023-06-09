const getDB = require('../db/db');

const isMyEntry = async (req, res, next) => {
  let connect;
  try {
    connect = await getDB();

    const { id } = req.params;

    const [[entry]] = await connect.query(
      `
        SELECT user_id
        FROM places
        WHERE id=?
      `,
      [id]
    );

    if (req.userInfo.id !== entry.user_id && req.userInfo.role !== 'admin') {
      return res.status(401).send({
        status: 'error',
        message: 'No tienes permiso',
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.send(error);
  } finally {
    if (connect) connect.release();
  }
};

module.exports = isMyEntry;
