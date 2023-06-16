const jwt = require('jsonwebtoken');
const getDB = require('../../db/db');

const loginUser = async (req, res) => {
  let connect;
  try {
    connect = await getDB();
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send('Data is missing');
    }

    const [user] = await connect.query(
      `
      SELECT id, name, avatar, role, active
      FROM users
      WHERE email = ? AND password = SHA2(?,512)
      `,
      [email, password]
    );

    if (user.length === 0) {
      return res.status(401).send('Incorrect email or password');
    }

    const info = {
      id: user[0].id,
      role: user[0].role,
      name: user[0].name,
      avatar: user[0].avatar
    };

    const token = jwt.sign(info, process.env.SECRET_TOKEN, { expiresIn: '1h' });

    res.status(200).send({
      status: 'ok',
      message: 'Login',
      token: token,
      data: {
        info
      },
    });
  } catch (err) {
    res.status(400).send(err);
  } finally {
    if (connect) connect.release();
  }
};

module.exports = loginUser;
