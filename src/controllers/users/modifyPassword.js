const getDB = require('../../db/db');

const modifyPassword = async (req, res) => {
  try {
    const connect = await getDB();
    const { oldPwd, newPwd } = req.body;

    const [user] = await connect.query(
      `
                  SELECT id
                  FROM users
                  WHERE id=? AND password=SHA2(?, 512)
              `,
      [req.userInfo.id, oldPwd]
    );

    if (user.length === 0) {
      return res.status(401).send('The old password is wrong');
    }

    await connect.query(
      `
                  UPDATE users
                  SET password=SHA2(?, 512), lastAuthUpdate=?
                  WHERE id=?
              `,
      [newPwd, new Date(), req.userInfo.id]
    );
    connect.release();
    res.send({
      status: 'ok',
      message: 'password changed successfully',
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = modifyPassword;
