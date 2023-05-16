## TÍTULO
Viajes recomendados

## DESCRIPCIÓN
Desarrollo de una API que permite gestionar un portal donde los usuarios puedan publicar recomendaciones de viaje, tanto de lugares como de experiencias poco conocidas. En ella, hay dos tipos de usuarios:

   USUARIOS SIN REGISTRAR:
    
    - Buscar recomendaciones por lugar, categoría
    
    - Ordenar los resultados de búsqueda por votos
    
    - Ver detalle de una recomendación
    
    - Login (con email y password)
    
    - Registrarse
    
   USUARIOS REGISTRADOS, tienen acceso a:
   
    - Publicar recomendaciones (título, categoría, lugar, entradilla, texto, foto)
    
    - Votar recomendaciones de otros usuarios                                         

## ¿CÓMO COMENZAR?
- Configurar el archivo .env (utilizar el archivo .env.example que hemos añadido como
  ejemplo).
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
​-Ayuda adicional​:
- Exporta de la carpeta &quot;db&quot; la colección Postman para probar las rutas.
​
## BASE DE DATOS (ESTRUCTURA)
- **`users:`** id, email`*`, password`*`, name`*`, avatar, active, role (&quot;admin&quot;, &quot;normal&quot;),
regCode , delete, lastAuthUpdate, recoverCode, date.

- **`places:`** id, title`*`, shortDescription`*` largeDescription, date, city`*`, country`*`,
user_id.
​
- **`photos:`** id, date, photo`*`, place_id`*`.
​
- **`votes:`** id, vote IN(1,2,3,4,5), comment, date, user_id, place_id`*`.

- **`categories:`** id, name`*`.

- **`place_category:`** id, category_id`*`, place_id`*`.
​
## ENDPOINTS DEL USUARIO

   - **POST** - [&quot;/users/login&quot;] - Logea a un usuario retornando un token.
- **POST** - [&quot;/users/newuser &quot;] – Crea un nuevo usuario.
​
## ENDPOINTS DE LUGARES
- **GET** - [&quot;/&quot;] – Devuelve información general de todas las entradas ordenadas de forma
descendente (la más nueva arriba).
- **GET** - [&quot;/places/listvotes&quot;] – Devuelve una lista de todas las entradas ordenadas por la
más votada.
- **GET** - [&quot;/places/:id&quot;] - Devuelve la entrada correspondiente al id pasado como
parámetro.
- **GET** - [&quot;/places/category/:category&quot;] - Devuelve una lista de todas las entradas
agrupadas por categorías.
- **GET** - [&quot;/places/city/:city&quot;] - Devuelve todas los lugares que coincidan con la ciudad
pasada como parámetro.
- **GET** - [&quot;/places/country/:country&quot;] - Devuelve todas los lugares que coincidan con el país
pasado como parámetro.
- **POST** - [&quot;/places/newplace&quot;] – Permite postear una nueva entrada (lugar o experiencia).
`Token requerido`
- **POST** - [&quot;/places/newvote&quot;] – Permite votar un lugar y agregar un comentario. `Token
requerido`
- **POST** - [&quot;/places/addPhoto/:place_id&quot;] – Permite añadir fotos al lugar indicado por
parámetro. `Token requerido`
- **DELETE** - [&quot;/places/delete/:id&quot;] – Permite eliminar la entrada correspondiente al id
pasado como parámetro. `Token requerido`

## PERMISO
USUARIO ANONIMO
   BUSCAR RECOMEDACIONES
   GET / - listar todas las entradas, la más reciente arriba
   GET /places/:id – ver detalle de una entrada
   GET /places/listvotes – lista las entradas ordenadas de las más votadas a las menos
   GET /places/listcategories – lista las entradas ordenadas por categorías
   GET /places/category/:category – filtra la entrada de una categoría dada
   GET /places/city/:city – lista las entradas filtrada por ciudad
   GET /places/city/:country – filtra entradas por país
   POST /users/newuser – crear nuevo usuario
   POST /users/login – permite logear a un usuario

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
<img align="left" alt="GitHub" width="26px" src="https://user-images.githubusercontent.com/3369400/139448065-39a229ba-4b06-434b-bc67-616e2ed80c8f.png" style="max-width: 100%;"> </p><br>

## AUTORES
  KAROL BRACHO, [bykarol](https://github.com/bykarol)
  
  JON MARTÍNEZ BIDEZABAL, [JonBidezabal](https://github.com/JonBidezabal)
  
  ISABEL ABAD,  [IsaAbad](https://github.com/IsabelAbad)
  
  MERCEDES IÑIGUEZ, [mercedesiniguez](https://github.com/mercedesiniguez)

## AGRADECIMIENTOS
  Hack a Boss
    
## CONTRIBUCIONES
 Si quieres contribuir en este proyecto, ponte en contacto con nosotros
   
 
 
  
  
  

  
  
  

   

  
