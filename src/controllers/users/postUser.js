const getDB = require('../../db/db');

const postUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const connect = await getDB();

    const [userExist] = await connect.query(
      `SELECT id, date FROM users WHERE email=?`,
      [email]
    );

    if (userExist.length > 0) {
      return res.status(409).send({
        status: 'error',
        mensaje: 'El usuario ya existe',
      });
    }

    const [user] = await connect.query(
      `INSERT INTO users (email, password, name) VALUES (?,SHA2(?,512),?)`,
      [email, password, name]
    );

    connect.release();

    return res.status(200).send({
      status: 'ok',
      mensaje: 'Usuario creado correctamente',
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = postUser;
