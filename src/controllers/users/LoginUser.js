const jwt = require('jsonwebtoken');
const getDB = require('../../db/db');

const loginUser = async (req, res) => {
  try {
    const connect = await getDB();
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send('Data is missing');
    }

    const [user] = await connect.query(
      `
      SELECT id, role, active
      FROM users
      WHERE email = ? AND password = SHA2(?,512)
      `,
      [email, password]
    );

    connect.release();
    if (user.length === 0) {
      return res.status(401).send('Incorrect email or password');
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
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = loginUser;
