const jwt = require('jsonwebtoken');
const getDB = require('../db/db');

const isUser = async (req, res, next) => {
  let connect;
  let tokenInfo;
  try {
    connect = await getDB();

    const authorization = req.headers['authorization'];

    if (!authorization)
      return res.status(401).send({
        status: 'error',
        message: 'No autorizado.',
      });

    try {
      tokenInfo = jwt.verify(authorization, process.env.SECRET_TOKEN);
    } catch (error) {
      return res.status(401).send({
        status: 'error',
        message: 'Token no válido',
      });
    }

    const [user] = await connect.query(
      `
            SELECT lastAuthUpdate
            FROM users
            WHERE id=?
            `,
      [tokenInfo.id]
    );

    const lastAuthUpdate = new Date(user[0].lastAuthUpdate);
    const timestampCreateToken = new Date(tokenInfo.iat * 1000);

    if (timestampCreateToken < lastAuthUpdate) {
      return res.status(401).send({
        status: 'error',
        message: 'Token caducado',
      });
    }

    req.userInfo = tokenInfo;
    next();
  } catch (error) {
    return res.status(500).send({
      status: 'error',
      message: error.message,
    });
  } finally {
    if (connect) connect.release();
  }
};

module.exports = isUser;
