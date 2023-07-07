const getDB = require('../../db/db');
const autoMail = require('../../service/sendMail');
const savePhoto = require('../../service/savePhoto');
const generateErr = require('../../service/generateErr');
const { v4: uuidv4 } = require('uuid');

const updateUser = async (req, res, next) => {
  let connect;

  try {
    connect = await getDB();
    const { id } = req.params;
    const { name, email } = req.body;

    if (req.userInfo.id != Number(id)) {
      generateErr('You do not have permissions to edit this user', 400);
    }

    const [currentUser] = await connect.query(
      `
        SELECT email
        FROM users
        WHERE id=?
      `,
      [id]
    );

    if (req.files && req.files.avatar) {
      const nameImgAvatar = await savePhoto(req.files.avatar);

      await connect.query(
        `
          UPDATE users
          SET avatar=?
          WHERE id=?
        `,
        [nameImgAvatar, id]
      );
      res.send({
        status: 'ok',
        message: 'Datos del usuario actualizados correctamente.',
      });
    }

    if (email && email != currentUser[0].email) {
      const [mailExists] = await connect.query(
        `
          SELECT id
          FROM users
          WHERE email=?
        `,
        [email]
      );

      if (mailExists.length > 0) {
        generateErr('A user with that email already exists.', 400);
      }
      const regCode = uuidv4();

      const emailMessage = `
        You have just updated your email in the Travel Experiences app. Click on this link to validate your new email: ${process.env.PUBLIC_HOST}${regCode}
      `;

      await autoMail(email, 'Confirm your new email', emailMessage);

      await connect.query(
        `
          UPDATE users
          SET name=?, email=?, lastAuthUpdate=?, active=0, regCode=?
          WHERE id=?
        `,
        [name, email, new Date(), regCode, id]
      );

      res.send({
        status: 'ok',
        message:
          'User data updated. Check your email to validate the new address.',
      });
    } else if (name && name != currentUser[0].email) {
      await connect.query(
        `
          UPDATE users
          SET name=?
          WHERE id=?
        `,
        [name, id]
      );

      res.send({
        status: 'ok',
        message: 'Datos del usuario actualizados correctamente.',
      });
    }
  } catch (err) {
    next(err);
  } finally {
    if (connect) connect.release();
  }
};

module.exports = updateUser;
