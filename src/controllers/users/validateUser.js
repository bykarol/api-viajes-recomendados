const getDB = require('../../db/db');
const  generateErr  = require('../../service/generateErr');

const validateUser = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();
    const { regCode } = req.params;

    const [user] = await connection.query(
      `
      SELECT id
      FROM users
      WHERE regCode = ?
    `,
      [regCode]
    );

    if (user.length === 0) {
      generateErr('No user with this validation code.', 404);
    }

    await connection.query(
      `
      UPDATE users
      SET active=1, regCode=NULL
      WHERE regCode = ?
    `,
      [regCode]
    );

    res.status(200).send({
      status: 'ok',
      message: 'User validate',
    });
  } catch (err) {
    next(err.message);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = validateUser;