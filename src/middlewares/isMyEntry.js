const getDB = require('../db/db');

const isMyEntry = async (req, res, next) => {
  try {
    const connect = await getDB();

    const { id } = req.params;

    const [[entry]] = await connect.query(
      `
        SELECT user_id
        FROM places
        WHERE id=?
      `,
      [id]
    );

    connect.release();

    if (req.userInfo.id !== entry.user_id && req.userInfo.role !== 'admin') {
      res.status(401).send('You do not have permission');
    }
    next();
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

module.exports = isMyEntry;
