const getDB = require('../../db/db');

const postUser = async (req, res) => {
  let connect;
  try {
    const { email, password, name } = req.body;
    connect = await getDB();

    const [userExist] = await connect.query(
      `SELECT id, date FROM users WHERE email=?`,
      [email]
    );

    if (userExist.length > 0) {
      return res.status(409).send({
        status: 'error',
        mensaje: 'user already exists',
      });
    }

    const [user] = await connect.query(
      `INSERT INTO users (email, password, name) VALUES (?,SHA2(?,512),?)`,
      [email, password, name]
    );

    return res.status(200).send({
      status: 'ok',
      mensaje: 'user created successfully',
      data: user,
    });
  } catch (err) {
    res.status(500).send(err.message);
  } finally {
    if (connect) connect.release();
  }
};

module.exports = postUser;
