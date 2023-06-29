/**
 *  Este archivo inicializa una base de datos
 * la base de datos tiene 5 usuarios creados
 * 4 entradas creadas
 * 6 categorías
 * algunas votaciones
 */
const mysql = require('mysql2/promise');
require('dotenv').config();

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD } = process.env;

async function createDB() {
  let connect;
  try {
    //conexión con la db
    connect = await getDB();
    await connect.query(`CREATE DATABASE IF NOT EXISTS travelexperience`);
    await connect.query(`USE travelexperience`);
    await connect.query(
      `
        CREATE TABLE users (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(512) NOT NULL,
        name VARCHAR(100),
        avatar VARCHAR(100) DEFAULT 'avatarDefault.png',
        active TINYINT DEFAULT 1,
        role ENUM('admin', 'normal') DEFAULT 'normal' NOT NULL,
        regCode CHAR(36),
        deleted TINYINT DEFAULT 0,
        lastAuthUpdate DATETIME,
        recoverCode CHAR(36),
        date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        );`
    );
    await connect.query(
      `
      CREATE TABLE places (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
          title VARCHAR(100) NOT NULL,
          shortDescription VARCHAR(200) NOT NULL,
          largeDescription TEXT,
          date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          city VARCHAR(100) NOT NULL,
          country VARCHAR(100) NOT NULL,
          user_id INT UNSIGNED NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users(id)
      );
      `
    );
    await connect.query(
      `
      CREATE TABLE photos (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
          date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          photo VARCHAR(100) NOT NULL,
          place_id INT UNSIGNED NOT NULL,
          FOREIGN KEY (place_id) REFERENCES places(id)
      );
      `
    );
    await connect.query(
      `
      CREATE TABLE votes (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
          vote TINYINT NOT NULL CHECK (vote IN (1,2,3,4,5)),
          comment TEXT,
          date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          user_id INT UNSIGNED NOT NULL,
          place_id INT UNSIGNED NOT NULL,
          FOREIGN KEY (place_id) REFERENCES places(id),
        FOREIGN KEY (user_id) REFERENCES users(id)
      );        
        `
    );
    await connect.query(
      `
      CREATE TABLE categories (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
          name VARCHAR(100) DEFAULT "experience" NOT NULL
      );
    `
    );
    await connect.query(
      `
      CREATE TABLE place_category (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
          category_id INT UNSIGNED NOT NULL,
          place_id INT UNSIGNED NOT NULL,
          FOREIGN KEY (place_id) REFERENCES places(id),
        FOREIGN KEY (category_id) REFERENCES categories(id),
        UNIQUE(place_id, category_id)
      );
    `
    );
    //poblar data
    await connect.query(
      `
      INSERT INTO users (email, password, name) values
      ("ilethem0@google.com.au","993870144", "Ile"),
      ("kmungan1@howstuffworks.com","497494899", "Kelly"),
      ("ydibbert2@businesswire.com","776631050", "Yeiko"),
      ("tmcgorley3@studiopress.com","921948685", "Tim"),
      ("eimbrey4@cpanel.net","304168000", "Eve");
      `
    );
    await connect.query(
      `
      INSERT INTO places (title, shortDescription, city, country, user_id) values
      ("Nadando con los tiburones","un día de submarinismo con los tiburones blancos", "Ningaloo", "Australia", 1),
      ("Avistamiento de ballenas","Ven a ver a las ballenas jorobadas", "Santo Domingo", "Dominican Republic", 1),
      ("El Salto Ángel","Ven a conocer el salto de agua más alto del mundo", "Canaima", "Venezuela", 2),
      ("Mercado de San Miguel","Mercado emblemático para los amantes de la buena gastronomía", "Madrid", "Spain", 5);
      `
    );
    await connect.query(
      `
      INSERT INTO photos (photo, place_id) values 
    ("default_place1.jpg", 1),
    ("default_place2.jpg", 2),
    ("default_place3.jpg", 3),
    ("default_place4.jpg", 4);
      `
    );
    await connect.query(
      `
      INSERT INTO votes (vote, comment, user_id, place_id) values
      (5,"100% Recommended", 3, 1),
      (3,"not so good", 2, 2),
      (1,"so bad", 3, 2),
      (5,"Amazing", 5, 1),
      (5,"Must do", 4, 3),
      (5,"Stunning", 1, 4);
      `
    );
    await connect.query(
      `
      INSERT INTO categories (name) values
      ("Aventura"),
      ("Cultura"),
      ("Deportes"),
      ("Naturaleza"),
      ("Relajación"),
      ("Romántico");        
      `
    );
    await connect.query(
      `
      INSERT INTO place_category (place_id, category_id) values 
      (1, 1),
      (1, 2),
      (2, 1),
      (2, 2),
      (3, 3),
      (3, 5),
      (3, 6),
      (4, 4);      
    `
    );

    console.log('Database and tables created succesfully');
    process.exit(0);
  } catch (error) {
    console.log(error.sqlMessage);
    process.exit(1);
  } finally {
    if (connect) connect.release();
  }
}

let pool;
const getDB = async () => {
  if (!pool) {
    pool = mysql.createPool({
      connectionLimit: 10,
      host: MYSQL_HOST,
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
      timezone: 'Z',
    });
  }
  return await pool.getConnection();
};

createDB();
