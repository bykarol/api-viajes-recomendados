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
        date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP);`
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
        FOREIGN KEY (user_id) REFERENCES users(id),
          UNIQUE(place_id, user_id)
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
("Avistamiento de ballenas","Ven a ver a las ballenas jorobadas", "Santo Domingo", "República Dominicana", 1),
("El Salto Ángel","Ven a conocer el salto de agua más alto del mundo", "Canaima", "Venezuela", 2),
("Mercado de San Miguel","Mercado emblemático para los amantes de la buena gastronomía", "Madrid", "España", 5),
("En la cumbre de los Alpes suizos","un día en Schilthorn viendo las cumbres nevadas desde un restaurante giratorio", "Schilthorn", "Suiza", 4), 
("Recorriendo plataciones de café", "Es fácil encontrar a la fauna local dando un paseo", "Karnataka", "India", 4), 
("Bajo el sol de la Toscana","Ven a conocer la increíble belleza y la gastronomía de la Toscana", "Toscana", "Italia", 5), 
("Safari en Tanzania","Aventúrate en la naturaleza salvaje del Ngorongoro y las indómitas planicies del Serengueti", "Arusha", "Tanzania", 1),
("Shock entre lo moderno y lo milenario","una semana en la capital de Japón bastará para enamorarte", "Tokio", "Japón", 2), 
("Bajo las auroras boreales", "Disfruta de uno de los fenómenos más espectaculares de la naturaleza en Islandia. ", "Reikiavik", "Islandia", 1), 
("En globo por la Capadocia","Disfruta desde el aire de sus características “chimeneas de hadas”", "Capadocia", "Turquía", 1), 
("Dunas en Maspalomas","Relájate en un espacio natural único en las Islas Canarias por su belleza y la variedad de ecosistemas que alberga", "Maspalomas", "España", 5),
("En bicicleta por la Selva Negra","Recorriendo sus densos bosques de hoja perenne y pintorescas villas de cuentos de hadas", "Selva Negra", "Alemania", 3),  
("Chill out en Santorini","Disfruta de casas encaladas y cubiformes que se aferran a los acantilados sobre una caldera submarina", "Santorini", "Grecia", 4), 
("Un aperol en Manarola","Manarola es la segunda más pequeña de las famosas Cinque Terre con una población de 353 habitantes y sobrada de encanto", "Manarola", "Italia", 2), 
("Buceo en el Mar Rojo","Bucear en el Mar Rojo es una de las experiencias más increíbles para cualquier buceador", "Mar Rojo", "Egipto", 3),
("Navegando por la Costa Azul","Dos días de navegación en la Costa Azul a bordo de un velero con 5 camarotes", "Costa Azul", "Francia", 3), 
("Buscando a Heidi","Sus casas y callejuelas alpinas del siglo XVI albergan cafés y  y sus colinas recuerdan a los dibujos animados", "Hallstatt", "Suiza", 3), 
("Relax en Tahíti","Con playas de arena negra, lagunas, cascadas y dos volcanes extintos, es un destino vacacional muy popular para desconectar", "Tahíti Nui", "Tahíti", 5), 
("La playa más famosa del mundo","Zante no sólo es famosa por su belleza expcepcional, sino por la tortuga caretta, en peligro de extinción", "Zante", "Grecia", 4),  
("Caminando por un glaciar","La imponente masa de hielo rodeada de bosques y montañas es un espectáculo que pocos se quieren perder", "Perito Moreno", "Argentina", 4), 
("La perla del Golfo Pérsico","Entre las modernas torres y los megacentros comerciales destacan unas cúpulas de mármol blanco, la gran mezquita Sheikh Zayed ", "Abu Dhabi", "Emiratos Árabes Unidos", 2), 
("Voleibol de playa en Copacabana","Disfruta del deporte más popular de la playa", "Rio de Janeiro", "Brasil", 3), 
("Té en Londres","Sube al London Eye que ofrece vistas panorámicas del complejo cultural South Bank y de toda la ciudad", "Londres", "Reino Unido", 2), 
("En la ciudad del amor","Nada más romántico que París, la capital de Francia y centro mundial del arte, la moda , la gastronomía y la cultura", "Paris", "Francia", 4),
("Burbujas en Sanxenxo","Ven a disfrutar de unos días en un spa de Sanxenxo con vistas a la playa y circuito termal", "Sanxenxo", "España", 5);`
    );
    await connect.query(
      `
      INSERT INTO photos (photo, place_id) values 
("default_place1.jpg", 1),
("default_place2.jpg", 2),
("default_place3.jpg", 3),
("default_place4.jpg", 4),
("default_place5.jpg", 5),
("default_place6.jpg", 6),
("default_place7.jpg", 7),
("default_place8.jpg", 8),
("default_place9.jpg", 9),
("default_place10.jpg", 10),
("default_place11.jpg", 11),
("default_place12.jpg", 12),
("default_place13.jpg", 13),
("default_place14.jpg", 14),
("default_place15.jpg", 15),
("default_place16.jpg", 16),
("default_place17.jpg", 17),
("default_place18.jpg", 18),
("default_place19.jpg", 19),
("default_place20.jpg", 20),
("default_place21.jpg", 21),
("default_place22.jpg", 22),
("default_place23.jpg", 23),
("default_place24.jpg", 24),
("default_place25.jpg", 25),
("default_place26.jpg", 26); `
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
(1, 4),
(2, 1),
(2, 4),
(3, 1),
(3, 4),
(4, 2);      
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
