# S1-08-T-BACKEND

# Gout API

---
Permite porveer servicios necesarios para el funcionamiento de la app web  "name app"

---
## Tecnoligias 

- [Nodejs](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- [Jsonwebtoken](https://jwt.io/)
- [Jest](https://jestjs.io/)
- [Supertet](https://www.npmjs.com/package/supertest)

---

## Roles

- Eduardo Arevalo (Team Leader)
- Cristian Palomeque (Full Stack)
- Victor Olivera (Frontend)
- Nicolas Bonder (Frontend)
- Mauricio Ferreyra (Frontend)
- Hugo Tatarino (Backend)
- Brenda Quispe (Full Stack)
---

## Como correr el proyecto

se requiere tener instalado [Node.js](https://nodejs.org/en/).

Una vez clonado o copiado el proyecto en tu equipo y ubicado en la carpeta del mismo, deberás ejecutar los siguiente comando:

npm install
npm start o npm run dev

---

# Documentacion API rest Gout

---

## ENDPOINTS

## USERS ENDPOINT

API users devuelve un array de objetos con todos los datos de cada usuario

## URL de Users

### Peticion GET

api-gout.herokuapp.com/api/users

Respuesta exitosa (200 OK)

ejemplo

[

    {
        "id": "33"
        "username": "prueba",
        "email": "prueba@gmail.com",
        "password": "123456789",
        "nickname": "nickprueba",
        "avatar": "https://res.cloudinary.com/dkr9yv2oa/image/upload/v1647008148/gout/wdq0wuotyluvghms6jrp.jpg",
        "backgroundImage": "https://res.cloudinary.com/dkr9yv2oa/image/upload/v1647009064/gout/j31gw9q2mxgqagiflmub.jpg",
        "biography", "comida italiana"
    },

    {
        "username": "prueba2",
        "email": "prueba2@gmail.com",
        "password": "987654321",
        "nickname": "prueba2",
        "avatar": "https://res.cloudinary.com/dkr9yv2oa/image/upload/v1647008132/gout/wdq0wuotyluvghms6jrp.jpg",
        "backgroundImage": "https://res.cloudinary.com/dkr9yv2oa/image/upload/v16470090632/gout/j31gw9q2mxgqagiflmub.jpg",
        "biography", "comida japonesa"
    }

]

## Data:

## Users object

Estos objetos contienen una variedad de información referente a los usuarios registrados

Propiedad Ejemplo

id: string
id único de este usuario "33"

username: string
nombre del ussuario "prueba"

email: string  
direccion de correo
electronico del usuario "prueba@gmail.com"

nickname: string
Apodo del usuario "nickprueba"

## USERS/ID ENDPOINT

devuelve un objetos con todos los datos del usuario

### Peticion GET

api-gout.herokuapp.com/api/users/:id

Respuesta exitosa (200 OK)

ejemplo

api-gout.herokuapp.com/api/users/33

    {
        "id": "33"
        "username": "prueba",
        "email": "prueba@gmail.com",
        "password": "123456789",
        "nickname": "nickprueba",
        "avatar": "https://res.cloudinary.com/dkr9yv2oa/image/upload/v1647008148/gout/wdq0wuotyluvghms6jrp.jpg",
        "backgroundImage": "https://res.cloudinary.com/dkr9yv2oa/image/upload/v1647009064/gout/j31gw9q2mxgqagiflmub.jpg",
        "biography", "comida italiana"
    },

## USERS/REGISTER ENDPOINT

para utilizar este endpoint se necesita enviar un objeto contenido con los datos requeridos por la base de datos:

username: string
email: string
password: string
nickname: string

### Peticion POST

api-gout.herokuapp.com/api/users/register

ejemplo

let url = "api-gout.herokuapp.com/api/users/register";

let data = {
"username": "prueba",
"email": "prueba@gmail.com",
"password": "123456789",
"nickname": "nickprueba"
}

fetch(url, {
method: 'POST',
body: JSON.stringify(data),
headers:{
'Content-Type': 'application/json'
}
}).then(res => res.json())
.catch(error => console.error('Error:', error))
.then(response => console.log('Success:', response));

Respuesta exitosa (201 OK)

{
ok: true,
msg: "Registered user"
}

Respuesta fallida (400)

{
ok: false,
msg: "Invalid password"
}

Respuesta fallida (500 )

{
ok: false,
msg: "An error has arisen in the process, please review"
}

## USERS/LOGIN ENDPOINT

para utilizar este endpoint se necesita enviar un objeto contenido con los datos requeridos por la base de datos:

email: string
password: string

### Peticion POST

api-gout.herokuapp.com/api/users/login

ejemplo

let url = "api-gout.herokuapp.com/api/users/login";
let data = {
"email": "prueba@gmail.com",
"password": "123456789"
}

fetch(url, {
method: 'POST',
body: JSON.stringify(data),
headers:{
'Content-Type': 'application/json'
}
}).then(res => res.json())
.catch(error => console.error('Error:', error))
.then(response => console.log('Success:', response));

Respuesta exitosa (200 OK)

{
ok: true,
id: idDB,
username: usernameDB,
emial: emailDB,
token
}

Respuesta fallida (400)

{
ok: false,
msg: "User not exist with email"
}

Respuesta fallida (500 )

{
ok: false,
msg: "An error has arisen in the process, please review"
}

## USERS/PROFILE ENDPOINT

para utilizar este endpoint se necesita enviar un objeto contenido con los datos requeridos por la base de datos:

id: number
username: string
email: string
password: string
nickname: string

y adicionalmente se necesita un header de autorizacion con el token del usuario logueado

### Peticion PUT

api-gout.herokuapp.com/api/users/profile

ejemplo

let url = "api-gout.herokuapp.com/api/users/profile";

let data = {
"id": "8",
"username": "update prueba",
"email": "updateprueba@gmail.com",
"password": "938472829",
"nickname": " updateprueba"
"avatar": "https://res.cloudinary.com/dkr9yv2oa/image/upload/v1647008148/gout/wdq0wuotyluvghms6jrp.jpg",
"backgroundImage": "https://res.cloudinary.com/dkr9yv2oa/image/upload/v1647009064/gout/j31gw9q2mxgqagiflmub.jpg",
"biography", "el gusto por la comida de mar"
}

fetch(url, {
method: 'PUT',
body: JSON.stringify(data),
headers:{
'Content-Type': 'application/json',
Authorization: `Bearer ${token}`
}
}).then(res => res.json())
.catch(error => console.error('Error:', error))
.then(response => console.log('Success:', response));

Respuesta exitosa (201 OK)

{
ok: true,
msg: "User updated successfully",
updatedUser: {
username: username ,
email: email,
nickname: nickname,
"avatar": "https://res.cloudinary.com/dkr9yv2oa/image/upload/v1647008148/gout/wdq0wuotyluvghms6jrp.jpg",
"backgroundImage": "https://res.cloudinary.com/dkr9yv2oa/image/upload/v1647009064/gout/j31gw9q2mxgqagiflmub.jpg",
"biography", "el gusto por la comida de mar"
token: token
}
}

Respuesta fallida (404)

{
ok: false,
msg: "User not found"
}

Respuesta fallida (500 )

{
ok: false,
msg: "An error has arisen in the process, please review"
}

## USERS/EDIT/ID ENDPOINT

para utilizar este endpoint se necesita especificar en el id en el end point y enviar un objeto contenido con los datos requeridos por la base de datos:

id: number
username: string
email: string
password: string
nickname: string

necesita un header de autorizacion con el token del usuario logueado

### Peticion PUT

api-gout.herokuapp.com/api/users/edit/id

ejemplo

let url = "api-gout.herokuapp.com/api/users/edit/7";

let data = {
"username": "update prueba",
"email": "updateprueba@gmail.com",
"password": "938472829",
"nickname": " updateprueba"
}

fetch(url, {
method: 'PUT',
body: JSON.stringify(data),
headers:{
'Content-Type': 'application/json',
Authorization: `Bearer ${token}`
}
}).then(res => res.json())
.catch(error => console.error('Error:', error))
.then(response => console.log('Success:', response));

Respuesta exitosa (201 OK)

{
ok: true,
msg: "User updated successfully"
}

Respuesta fallida (404)

{
ok: false,
msg: "User not found"
}

Respuesta fallida (500 )

{
ok: false,
msg: "An error has arisen in the process, please review"
}

## USERS/DELETE/ID ENDPOINT

para utilizar este endpoint se necesita especificar en el id en el end point

necesita un header de autorizacion con el token del usuario logueado

### Peticion PUT

api-gout.herokuapp.com/api/users/delete/id

ejemplo

let url = "api-gout.herokuapp.com/api/users/delete/7";

fetch(url, {
method: 'DELETE',
headers:{
Authorization: `Bearer ${token}`
}
}).then(res => res.json())
.catch(error => console.error('Error:', error))
.then(response => console.log('Success:', response));

Respuesta exitosa (201 OK)

{
ok: true,
msg: "User removed successfully"
}

Respuesta fallida (404)

{
ok: false,
msg: "User not found"
}

Respuesta fallida (500 )

{
ok: false,
msg: "An error has arisen in the process, please review"
}