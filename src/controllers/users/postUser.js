const getDB = require('../../db/db');

const postUser = async (req, res) => {
  let connect;
  try {
    const { email, password, name } = req.body;
    connect = await getDB();

    const [userExists] = await connect.query(
      `
            SELECT id
            FROM users
            WHERE email = ?
            `,
      [email]
    );

    if (userExists.length > 0) {
      return res.status(409).send({
        status: 'error',
        message: 'User already exists',
      });
    }

    const [result] = await connect.query(
      `INSERT INTO users (email, password, name) VALUES (?,SHA2(?,512),?)`,
      [email, password, name]
    );


    const [user] = await connect.query(
      `SELECT u.id, u.email, u.name
      FROM users u
      WHERE u.id =?`,
      [result.insertId]
    );

    return res.status(200).send({
      status: 'ok',
      mensaje: 'user created successfully',
      data: user,
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

module.exports = postUser;
