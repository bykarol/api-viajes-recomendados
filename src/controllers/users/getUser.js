const getDB = require('../../db/db');

const getUser = async (req, res) => {
  let connect;
  try {
    connect = await getDB();
    const { id } = req.params;
    const [user] = await connect.query(
      `SELECT id, email, name, date FROM users 
        WHERE id=?;`,
      [id]
    );

    res.status(200).send({
      status: 'ok',
      message: 'Data of user by id',
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
