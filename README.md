## PROYECTO
Viajes recomendados

## DESCRIPCIÓN
Desarrollo de una API que permite gestionar un portal donde los usuarios puedan publicar recomendaciones de viaje, tanto de lugares como de experiencias poco conocidas. En ella, hay dos tipos de usuarios: USUARIOS SIN REGISTRAR y USUARIOS REGISTRADOS.          

## ¿CÓMO COMENZAR?
- Configurar el archivo .env (utilizar el archivo .env.example que hemos añadido como ejemplo).
  
- Instalar las dependencias:
```bash
npm install
```

- Inicializar la base de datos con el siguiente comando:
```bash
npm run initDB
```

- Levantar el servidor:
   - Modo desarrollo (nodemon):
```bash
npm run dev
```
   - Modo normal:
```bash
npm start
```

- Ayuda adicional:
   - Exportar la colección Postman para probar las rutas. El mismo lo consigues en el root del repositorio bajo el siguiente nombre: travelexperience.postman_collection.json


## BASE DE DATOS (travelexperience)

Este proyecto inicializa una base de datos llamada travelexperience, la cual está diseñada para almacenar información sobre lugares turísticos, usuarios, votaciones y categorías relacionadas con experiencias de viajes. La misma consta de las siguientes tablas:

![Diagrama entridad relación](https://bykarol.github.io/api-viajes-recomendados/src/db/travelExperience-DER.png)

Los campos `users.active`, `users.role`, `users.deleted`, `users.date`, `votes.date`, `places.date`, `photos.date` se registran con valores predeterminados si no se especifican al momento de crear los registros.

## Datos de ejemplo

La base de datos travelexperience se inicializa con los siguientes datos de ejemplo:

### Tabla users

  - id: 1
  - email: ilethem0@google.com.au
  - password: 993870144
  
  - id: 2
  - email: kmungan1@howstuffworks.com
  - password: 497494899
  
  - id: 3
  - email: ydibbert2@businesswire.com
  - password: 776631050
  
  - id: 4
  - email: tmcgorley3@studiopress.com
  - password: 921948685
  
  - id: 5
  - email: eimbrey4@cpanel.net
  - password: 304168000

### Tabla Places

  - id: 1
  - title: Nadando con los tiburones
  - shortDescription: Un día de submarinismo con los tiburones blancos
  - city: Ningaloo
  - country: Australia
  - user_id: 1

  - id: 2
  - title: Avistamiento de ballenas
  - shortDescription: Ven a ver a las ballenas jorobadas
  - city: Santo Domingo
  - country: Dominican Republic
  - user_id: 1

  - id 3:
  - title: El Salto Ángel
  - shortDescription: Ven a conocer el salto de agua más alto del mundo
  - city: Canaima
  - country: Venezuela
  - user_id: 2

  - id: 4
  - title: Mercado de San Miguel
  - shortDescription: Mercado emblemático para los amantes de la buena gastronomía
  - city: Madrid
  - country: Spain
  - user_id: 5

### Tabla Votes

  - id: 1
  - vote: 5
  - comment: 100% Recommended
  - user_id: 3
  - place_id: 1
  
  - id: 2
  - vote: 3
  - comment: not so good
  - user_id: User_id 2
  - place_id: 2
  
  - id: 3
  - vote: 1
  - comment: so bad
  - user_id: 3
  - place_id: 2
  
  - id: 4
  - vote: 5
  - comment: Amazing
  - user_id: User_id 5
  - place_id: 1
  
  - id: 5
  - vote: 5
  - comment: Must do
  - user_id: User_id 4
  - place_id: 3
  
  - id: 6
  - vote: 5
  - comment: Stunning
  - user_id: 1
  - place_id: 4

### Categories

- Category 1: Nature
- Category 2: Adventure
- Category 3: Cultural
- Category 4: Sport
- Category 5: Relax
- Category 6: Romantic


## ENDPOINTS DEL USUARIOS

- **POST** - [&quot;/users/login&quot;] - Logea a un usuario retornando un token.
- **POST** - [&quot;/users/newuser&quot;] – Crea un nuevo usuario.
- **PATCH** - [&quot;/users/newpassword&quot;] – Crea un nuevo usuario.

## ENDPOINTS DE LUGARES
- **GET** - [&quot;/&quot;] – Devuelve información general de todas las entradas ordenadas de forma descendente (la más nueva arriba).
- **GET** - [&quot;/places/listcategories&quot;] – Devuelve una lista de todas las entradas agrupadas por categorías.
- **GET** - [&quot;/places/listvotes&quot;] – Devuelve una lista de todas las entradas ordenadas por la más votada.
- **GET** - [&quot;/places/:id&quot;] - Devuelve la entrada correspondiente al id pasado como parámetro.
- **GET** - [&quot;/places/category/:category&quot;] - Devuelve una lista de todas las entradas que se encuentren en la categoría enviada como parámetro.
- **GET** - [&quot;/places/city/:city&quot;] - Devuelve todas los lugares que coincidan con la City enviada como parámetro.
- **GET** - [&quot;/places/country/:country&quot;] - Devuelve todas los lugares que coincidan con el Country enviado como parámetro.
- **POST** - [&quot;/places/newplace&quot;] – Permite postear una nueva entrada (lugar o experiencia). `Token requerido`
- **POST** - [&quot;/places/newvote&quot;] – Permite votar un lugar y agregar un commentario. `Token requerido`
- **POST** - [&quot;/places/addPhoto/:place_id&quot;] – Permite añadir fotos al lugar indicado por parámetro, el archivo se envía por el body (form-data). `Token requerido`
- **DELETE** - [&quot;/places/delete/:id&quot;] – Permite eliminar la entrada correspondiente al id pasado como parámetro. `Token requerido`

## PERMISOS
USUARIO ANÓNIMO
   BUSCAR RECOMEDACIONES
   GET / - listar todas las entradas, la más reciente arriba
   GET /places/:id – ver detalle de una entrada
   GET /places/listvotes – lista las entradas ordenadas de las más votadas a las menos
   GET /places/listcategories – lista las entradas ordenadas por Categories
   GET /places/category/:category – filtra la entrada de una Category dada
   GET /places/city/:city – lista las entradas filtrada por City
   GET /places/city/:country – filtra entradas por Country
   POST /user_ids/newuser_id – crear nuevo User_id
   POST /user_ids/login – permite logear a un User_id

USUARIO REGISTRADO
   POST /places/newplace – permite crear una nueva entrada
   POST /places/newvote – permite votar
   POST /places/addPhoto – permite añadir fotos   

 ## HERRAMIENTAS Y LENGUAJES UTILIZADOS
 
<p>
<img align="left" alt="Visual Studio Code" width="26px" src="https://camo.githubusercontent.com/5fa137d222dde7b69acd22c6572a065ce3656e6ffa1f5e88c1b5c7a935af3cc6/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f7673636f64652f7673636f64652d6f726967696e616c2e737667" data-canonical-src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" style="max-width: 100%;">
<img align="left" alt="JavaScript" width="26px" src="https://camo.githubusercontent.com/442c452cb73752bb1914ce03fce2017056d651a2099696b8594ddf5ccc74825e/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f6a6176617363726970742f6a6176617363726970742d6f726967696e616c2e737667" data-canonical-src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" style="max-width: 100%;">
<img align="left" alt="MySQL" width="26px" src="https://camo.githubusercontent.com/2582ec2237a3a1fbd34e9b57332b72be27a7facb32abe7c2335e5f86e5f457a8/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f6d7973716c2f6d7973716c2d6f726967696e616c2e737667" data-canonical-src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" style="max-width: 100%;">
<img align="left" alt="Node.js" width="26px" src="https://camo.githubusercontent.com/900baefb89e187c8b32cdbb3b440d1502fe8f30a1a335cc5dc5868af0142f8b1/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f6e6f64656a732f6e6f64656a732d6f726967696e616c2e737667" data-canonical-src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" style="max-width: 100%;">
<img align="left" alt="GitHub" width="26px" src="https://user-images.githubusercontent.com/3369400/139448065-39a229ba-4b06-434b-bc67-616e2ed80c8f.png" style="max-width: 100%;"></p><BR>

## AUTORES
  KAROL BRACHO, [bykarol](https://www.linkedin.com/in/karolbrachoyanez/)
  
  JON MARTÍNEZ BIDEZABAL, [JonBidezabal](https://www.linkedin.com/in/jonmartinezdev)
  
  ISABEL ABAD,  [IsaAbad](https://www.linkedin.com/in/isabel-abad-cami%C3%B1os/)
  
  MERCEDES IÑIGUEZ, [mercedesiniguez](https://www.linkedin.com/in/mercedes-iniguez-quintela-1424ba7/)

## AGRADECIMIENTOS
[Hack a Boss](https://www.hackaboss.com/)
    
## CONTRIBUCIONES
 Si quieres contribuir en este proyecto, ponte en contacto con nosotros
   
  
  

  
  
  

   

  
