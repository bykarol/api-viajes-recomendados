const jwt = require('jsonwebtoken');
const { getDB } = require('../db');

const loginUser = async (req, res) => {
  try {
    const connect = await getDB();
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send('Faltan datos');
    }

    const [user] = await connect.query(
      `
      SELECT id, role, active
      FROM users
      WHERE email = ? AND password = SHA(?, 512)
      `,
      [email, password]
    );

    if (user.length === 0) {
      return res.status(401).send('Email o password incorrectos');
    }

    const info = {
      id: user[0].id,
      role: user[0].role,
    };

    const token = jwt.sign(info, process.env.SECRET_TOKEN, { expiresIn: '1h' });

    res.status(200).send({
      status: 'ok',
      message: 'Login',
      data: {
        token,
      },
    });
    connect.release();
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

module.exports = loginUser;