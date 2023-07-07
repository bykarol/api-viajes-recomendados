const getDB = require('../db/db');

const userExists = async (req, res, next) => {
  try {
    const { id } = req.params;
    const connect = await getDB();
    const [user] = await connect.query(
      `
            SELECT id
            FROM users
            WHERE id = ?
            `,
      [id]
    );

    if (user.length === 0) {
      return res.status(404).send({
        status: 'error',
        message: 'El usuario no existe',
      });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = userExists;
