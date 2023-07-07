const getDB = require('../../db/db');

const getUsers = async (req, res) => {
  let connect;
  try {
    connect = await getDB();

    const [users] = await connect.query(
      `SELECT * FROM travelexperience.users;
      `
    );

    res.status(200).send({
      status: 'ok',
      message: 'Datos de usuario registrado',
      data: users,
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

module.exports = getUsers;
