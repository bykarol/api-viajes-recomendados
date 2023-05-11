const jwt = require('jsonwebtoken');
const getDB = require('../db/db');

const isUser = async (req, res, next) => {
  try {
    const connect = await getDB();

    const authorization = req.headers['authorization'];

    if (!authorization) return res.status(401).send('Not authorized');

    let tokenInfo;
    try {
      tokenInfo = jwt.verify(authorization, process.env.SECRET_TOKEN);
    } catch (error) {
      res.status(401).send('Token not valid');
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
      res.status(401).send('Token caducado');
    }

    req.userInfo = tokenInfo;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = isUser;
