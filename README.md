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
  - Email: ilethem0@google.com.au
  - password: 993870144
  - id: 2
  - Email: kmungan1@howstuffworks.com
  - password: 497494899
  - id: 3
  - Email: ydibbert2@businesswire.com
  - password: 776631050
  - id: 4
  - Email: tmcgorley3@studiopress.com
  - password: 921948685
  - id: 5
  - Email: eimbrey4@cpanel.net
  - password: 304168000

### Tabla Places

  - id: 1
  - Title: Nadando con los tiburones
  - ShortDescription: Un día de submarinismo con los tiburones blancos
  - City: Ningaloo
  - Country: Australia
  - User_id: 1

  - id: 2
  - Title: Avistamiento de ballenas
  - ShortDescription: Ven a ver a las ballenas jorobadas
  - City: Santo Domingo
  - Country: Dominican Republic
  - User_id: 1

  - id 3:
  - Title: El Salto Ángel
  - ShortDescription: Ven a conocer el salto de agua más alto del mundo
  - City: Canaima
  - Country: Venezuela
  - User_id: 2

  - id: 4
  - Title: Mercado de San Miguel
  - ShortDescription: Mercado emblemático para los amantes de la buena gastronomía
  - City: Madrid
  - Country: Spain
  - User_id: 5

### Tabla Votes

- Votes 1:
  - Vote: 5
  - Comment: 100% Recommended
  - User_id: 3
  - Place: Place 1
- Votes 2:
  - Vote: 3
  - Comment: not so good
  - User_id: User_id 2
  - Place: Place 2
- Votes 3:
  - Vote: 1
  - Comment: so bad
  - User_id: User_id 3
  - Place: Place 2
- Votes 4:
  - Vote: 5
  - Comment: Amazing
  - User_id: User_id 5
  - Place: Place 1
- Votes 5:
  - Vote: 5
  - Comment: Must do
  - User_id: User_id 4
  - Place: Place 3
- Votes 6:
  - Vote: 5
  - Comment: Stunning
  - User_id: User_id 1
  - Place: Place 4

### Categories

- Category 1: Nature
- Category 2: Adventure
- Category 3: Cultural
- Category 4: Sport
- Category 5: Relax
- Category 6: Romantic


## ENDPOINTS DEL USUARIOS

- **POST** - [&quot;/user_ids/login&quot;] - Logea a un User_id retornando un token.
- **POST** - [&quot;/user_ids/newuser_id &quot;] – Crea un nuevo User_id.

## ENDPOINTS DE LUGARES
- **GET** - [&quot;/&quot;] – Devuelve información general de todas las entradas ordenadas de forma
descendente (la más nueva arriba).
- **GET** - [&quot;/places/listvotes&quot;] – Devuelve una lista de todas las entradas ordenadas por la
más votada.
- **GET** - [&quot;/places/:id&quot;] - Devuelve la entrada correspondiente al id pasado como
parámetro.
- **GET** - [&quot;/places/category/:category&quot;] - Devuelve una lista de todas las entradas
agrupadas por Categories.
- **GET** - [&quot;/places/city/:city&quot;] - Devuelve todas los Placees que coincidan con la City
pasada como parámetro.
- **GET** - [&quot;/places/country/:country&quot;] - Devuelve todas los Placees que coincidan con el Country
pasado como parámetro.
- **POST** - [&quot;/places/newplace&quot;] – Permite postear una nueva entrada (Place o experiencia).
`Token requerido`
- **POST** - [&quot;/places/newvote&quot;] – Permite votar un Place y agregar un Comment. `Token
requerido`
- **POST** - [&quot;/places/addPhoto/:place_id&quot;] – Permite añadir fotos al Place indicado por
parámetro. `Token requerido`
- **DELETE** - [&quot;/places/delete/:id&quot;] – Permite eliminar la entrada correspondiente al id
pasado como parámetro. `Token requerido`

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
   
  
  

  
  
  

   

  
