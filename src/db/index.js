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
      ("La ciudad de la luz","Paris es sin duda la ciudad del romanticismo con suds cafés y boulevares", "Paris", "Francia", 5),
      ("Safari en Tanzania","Aventúrate en la naturaleza salvaje del Ngorongoro y las indómitas planicies del Serengueti", "Arusha", "Tanzania", 1),
      ("Shock entre lo moderno y lo milenario","una semana en la capital de Japón bastará para enamorarte", "Tokio", "Japón", 2), 
      ("Bajo las auroras boreales", "Disfruta de uno de los fenómenos más espectaculares de la naturaleza en Islandia. ", "Reikiavik", "Islandia", 1), 
      ("En globo por la Capadocia","Disfruta desde el aire de sus características “chimeneas de hadas”", "Capadocia", "Turquía", 1), 
      ("Paseando por los Andes","Mérida está situada en la cordillera de los Andes. Es famosa por su arquitectura colonial española", "Mérida", "Venezuela", 2), 
      ("En bicicleta por la Selva Negra","Recorriendo sus densos bosques de hoja perenne y pintorescas villas de cuentos de hadas", "Selva Negra", "Alemania", 3),  
      ("Chill out en Santorini","Disfruta de casas encaladas y cubiformes que se aferran a los acantilados sobre una caldera submarina", "Santorini", "Grecia", 4), 
      ("Un aperol en Manarola","Manarola es la segunda más pequeña de las famosas Cinque Terre con una población de 353 habitantes y sobrada de encanto", "Manarola", "Italia", 1),
      ("Vive el deporte rey","Ver un partido en el Bernabeú es una obligación para los amantes del fútbol", "Madrid", "España", 3), 
      ("Navegando por la Costa Azul","Dos días de navegación en la Costa Azul a bordo de un velero con 5 camarotes", "Costa Azul", "Francia", 3), 
      ("En el Parque del Retiro","Dar una vuelta por el Retiro y acercarse al Palacio de Cristal es una opción a tener muy en cuenta ", "Madrid", "España", 5), 
      ("Relax en Tahíti","Con playas de arena negra, lagunas, cascadas y dos volcanes extintos, es un destino vacacional muy popular para desconectar", "Tahíti Nui", "Tahíti", 5), 
      ("La playa más famosa del mundo","Zante no sólo es famosa por su belleza expcepcional, sino por la tortuga caretta, en peligro de extinción", "Zante", "Grecia", 4),  
      ("Caminando por un glaciar","La imponente masa de hielo rodeada de bosques y montañas es un espectáculo que pocos se quieren perder", "Perito Moreno", "Argentina", 4), 
      ("La perla del Golfo Pérsico","Entre las modernas torres y los megacentros comerciales destacan unas cúpulas de mármol blanco, la gran mezquita Sheikh Zayed ", "Abu Dhabi", "Emiratos Árabes Unidos", 2), 
      ("Voleibol de playa en Copacabana","Disfruta del deporte más popular de la playa", "Rio de Janeiro", "Brasil", 3), 
      ("Té en Londres","Sube al London Eye que ofrece vistas panorámicas del complejo cultural South Bank y de toda la ciudad", "Londres", "Reino Unido", 2), 
      ("Una torre de hierro","Subir a la alto de la Torre Eiffel de noche es una experiencia única", "Paris", "Francia", 2),
      ("Burbujas en Sanxenxo","Ven a disfrutar de unos días en un spa de Sanxenxo con vistas a la playa y circuito termal", "Sanxenxo", "España", 5),
      ("Un aperitivo con vistas","Sube a la terraza del círculo de Bellas Artes y disfruta de una vistas espectaculares de Madrid", "Madrid", "España", 5), 
      ("Buceo en el Mar Rojo","Bucear en el Mar Rojo es una de las experiencias más increíbles para cualquier buceador", "Mar Rojo", "Egipto", 3),
      ("Buscando a Heidi","Sus casas y callejuelas alpinas del siglo XVI albergan cafés y  y sus colinas recuerdan a los dibujos animados", "Hallstatt", "Suiza", 3), 
      ("A los pies del mar Caribe","Puerto de la cruz es una de las ciudades más turística de Venezuela con playas, ríos, montañas, llanos y valles", "Puerto de la Cruz", "Venezuela", 5),
      ("Dunas en Maspalomas","Relájate en un espacio natural único en las Islas Canarias por su belleza y la variedad de ecosistemas que alberga", "Maspalomas", "España", 5),
      ("En el Louvre","Visita obligada a uno de los mejores museos del mundo", "Paris", "Francia", 2),
      ("Bajo el sol de la Toscana","Ven a conocer la increíble belleza y la gastronomía de la Toscana", "Toscana", "Italia", 5), 
      ("De vidrieras","Notre Dame es la espectacular catedral de Paris, llena de antiquísimas vidrieras", "Paris", "Francia", 2),
      ("La Tierra del Sol Amada","Así es como llaman los locales a Maracaibo,bellísima ciudad llena de colorido en sus iglesias y casas", "Maracaibo", "Venezuela", 2),
      ("De toros","Ir a las Ventas a ver una corrida de toros es una experiencai", "Madrid", "España", 3);`
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
      ("default_place26.jpg", 26),
      ("default_place27.jpg", 27),
      ("default_place28.jpg", 28),
      ("default_place29.jpg", 29),
      ("default_place30.jpg", 30),
      ("default_place31.jpg", 31),
      ("default_place32.jpg", 32),
      ("default_place33.jpg", 33),
      ("default_place34.jpg", 34),
      ("default_place35.jpg", 35),
      ("default_place36.jpg", 36); `
    );
    await connect.query(
      `
      INSERT INTO votes (vote, comment, user_id, place_id) values 
      (5,"100% Recommended", 3, 32),
      (3,"Slightly recommended", 2, 36),
      (1,"So bad", 3, 2),
      (5,"Amazing", 5, 1),
      (5,"Must do", 4, 3),
      (3,"So, so", 3, 7),
      (3,"Not so good", 2, 2),
      (1,"So bad", 3, 36),
      (5,"Amazing", 5, 14),
      (5,"Absolutley yes!!", 4, 12),
      (5,"Awesome", 3, 10),
      (5,"Cool", 2, 19),
      (1,"Awful", 3, 16),
      (5,"Mind-blowing", 5, 29),
      (5,"Must do", 4, 28),
      (4,"Great", 3, 31),
      (5,"Insane", 5, 11),
      (5,"super", 4, 21),
      (5,"Wow", 3, 20),
      (4,"Very good", 2, 26),
      (2,"Not quite good", 3, 4),
      (5,"Amazing", 5, 5),
      (5,"Spiritual!!", 4, 6),
      (5,"Awesome", 3, 15),
      (3,"not so good", 2, 27),
      (5,"Unbelievable", 3, 35),
      (1,"Disappointed", 4, 34),
      (4,"Very good", 1, 26),
      (3,"So so", 1, 7),
      (2,"Not quite good", 1, 5),
      (5,"Amazing", 1, 8),
      (5,"Must do!", 1, 13),
      (5,"Awesome", 1, 15),
      (4,"Cool", 1, 17),
      (1,"Boring", 1, 18),
      (4,"Cool", 1, 25),
      (1,"Disappointed", 1, 34),
      (4,"Very good", 2, 23),
      (2,"Not quite good", 3, 24),
      (5,"Amazing", 5, 8),
      (5,"Absolutley yes!!", 4, 30),
      (5,"Unbelievable", 3, 22),
      (4,"Cool", 5, 9),
      (5,"Stunning", 1, 4); `
    );
    await connect.query(
      `
      INSERT INTO categories (name) values 
("Aventura"),
("Cultura"),
("Deporte"),
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
      (4, 2),
      (4, 5),
      (5, 1),
      (5, 4),
      (6, 1),
      (6, 4),
      (7, 5),
      (7, 2),
      (8, 1),
      (8, 4),
      (9, 2),
      (9, 6),
      (10, 1),
      (10, 4),
      (10, 6),
      (11, 1),
      (11, 4),
      (11, 2),
      (12, 4),
      (12, 6),
      (13, 3),
      (13, 1),
      (14, 6),
      (14, 4),
      (15, 5),
      (15, 4),
      (16, 3),
      (17, 3),
      (17, 4),
      (18, 5),
      (19, 6),
      (19, 5),
      (20, 5),
      (20, 4),
      (21, 1),
      (21, 4),
      (22, 4),
      (22, 6),
      (23, 4),
      (23, 3),
      (24, 2),
      (24, 5),
      (25, 5),
      (25, 6),
      (25, 2),
      (26, 5),
      (26, 6),
      (27, 2),
      (27, 4),
      (28, 3),
      (28, 4),
      (29, 5),
      (29, 4),
      (30, 4),
      (30, 5),
      (31, 4),
      (31, 5),
      (32, 2),
      (32, 5),
      (33, 4),
      (33, 6),
      (33, 5),
      (34, 2),
      (34, 5),
      (35, 2),
      (35, 5),
      (35, 6),
      (36, 2);  
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
