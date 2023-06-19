const getDB = require('../db/db');
const {categories, placeCategories, places, users, votes} = require('../db/data')

const autoInsert = async () => {
  let connect;

  try {
    connect = await getDB();

    for (const user of users) {
      await connect.query(
        'INSERT INTO users (email, password) VALUES (?, ?)',
        [user.email, user.password]
      );
    }

    for (const place of places) {
      await connect.query(
        'INSERT INTO places (title, shortDescription, city, country, user_id) VALUES (?, ?, ?, ?, ?)',
        [place.title, place.shortDescription, place.city, place.country, place.user_id]
      );
    }

    for (const vote of votes) {
      await connect.query(
        'INSERT INTO votes (vote, comment, user_id, place_id) VALUES (?, ?, ?, ?)',
        [vote.vote, vote.comment, vote.user_id, vote.place_id]
      );
    }

    for (const category of categories) {
      await connect.query(
        'INSERT INTO categories (name) VALUES (?)',
        [category.name]
      );
    }

    for (const object of placeCategories) {
      await connect.query(
        'INSERT INTO place_category (place_id, category_id) VALUES (?, ?)',
        [object.place_id, object.category_id]
      );
    }
  } catch (err) {
    console.log(err);
  } finally {
    if (connect) connect.release();
  }
};

module.exports = autoInsert;