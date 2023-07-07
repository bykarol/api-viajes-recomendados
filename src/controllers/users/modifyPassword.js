const getDB = require('../../db/db');

const modifyPassword = async (req, res) => {
  let connect;
  try {
    connect = await getDB();
    const { oldPwd, newPwd } = req.body;

    const [user] = await connect.query(
      `
                  SELECT id
                  FROM users
                  WHERE id=? AND password=SHA2(?, 512)
              `,
      [req.userInfo.id, oldPwd]
    );
    console.log(user.length);
    if (user.length === 0) {
      return res.status(401).send({
        status: 'error',
        message: 'La contraseña anterior es incorrecta',
      });
    }

    await connect.query(
      `
                  UPDATE users
                  SET password=SHA2(?, 512), lastAuthUpdate=?
                  WHERE id=?
              `,
      [newPwd, new Date(), req.userInfo.id]
    );

    res.send({
      status: 'ok',
      message: 'Contraseña cambiada correctamente',
      data: {
        id: req.userInfo.id,
        name: req.userInfo.name,
      },
    });
  } catch (err) {
    return res.status(400).send({
      status: 'error',
      message: err.message,
    });
  } finally {
    if (connect) connect.release();
  }
};

module.exports = modifyPassword;
