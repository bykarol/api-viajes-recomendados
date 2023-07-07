const getDB = require('../../db/db');

const getUser = async (req, res) => {
  let connect;
  try {
    connect = await getDB();

    const [user] = await connect.query(
      `SELECT id, email, name, avatar, date, active, password FROM users 
        WHERE id=?;`,
      [req.userInfo.id]
    );

    res.status(200).send({
      status: 'ok',
      message: 'Datos de usuario registrado',
      data: user,
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

module.exports = getUser;
