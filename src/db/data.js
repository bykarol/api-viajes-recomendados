function Category(name) {
  this.name = name;
}

const categories = [
  new Category("Naturaleza"),
  new Category("Aventura"),
  new Category("Cultura"),
  new Category("Deportes"),
  new Category("Relajación"),
  new Category("Romántico")
];

//placeCategory

function PlaceCategory(place_id, category_id) {
  this.place_id = place_id;
  this.category_id = category_id;
}

const placeCategories = [
  new PlaceCategory(1, 1),
  new PlaceCategory(1, 2),
  new PlaceCategory(2, 1),
  new PlaceCategory(2, 2),
  new PlaceCategory(3, 3),
  new PlaceCategory(3, 5),
  new PlaceCategory(3, 6),
  new PlaceCategory(4, 4)
];

//places

function Place(title, shortDescription, city, country, user_id) {
  this.title = title;
  this.shortDescription = shortDescription;
  this.city = city;
  this.country = country;
  this.user_id = user_id;
}

const places = [
  new Place(
    "Nadando con los tiburones",
    "un día de submarinismo con los tiburones blancos",
    "Ningaloo",
    "Australia",
    1
  ),
  new Place(
    "Avistamiento de ballenas",
    "Ven a ver a las ballenas jorobadas",
    "Santo Domingo",
    "República Dominicana",
    1
  ),
  new Place(
    "El Salto Ángel",
    "Ven a conocer el salto de agua más alto del mundo",
    "Canaima",
    "Venezuela",
    2
  ),
  new Place(
    "Mercado de San Miguel",
    "Mercado emblemático para los amantes de la buena gastronomía",
    "Madrid",
    "España",
    5
  )
];

//users

function User(email, password) {
  this.email = email;
  this.password = password;
}

const users = [
  new User("ilethem0@google.com.au", "993870144"),
  new User("kmungan1@howstuffworks.com", "497494899"),
  new User("ydibbert2@businesswire.com", "776631050"),
  new User("tmcgorley3@studiopress.com", "921948685"),
  new User("eimbrey4@cpanel.net", "304168000")
];

//votes

function Vote(vote, comment, user_id, place_id) {
  this.vote = vote;
  this.comment = comment;
  this.user_id = user_id;
  this.place_id = place_id;
}

const votes = [
  new Vote(5, "100% Recommended", 1, 3),
  new Vote(3, "not so good", 2, 2),
  new Vote(1, "so bad", 2, 3),
  new Vote(5, "Amazing", 1, 4),
  new Vote(5, "Must do", 3, 4),
  new Vote(5, "Stunning", 4, 1)
];

module.exports = { categories, placeCategories, places, users, votes };
