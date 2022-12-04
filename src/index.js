import express from 'express';
const app = express();
app.use(express.json());
import database from "../src/databaseConnectivity.js";
import { validatePassword, validateUsername } from "../src/validationFunctions.js";
const hostname = 'localhost';
const port = 3000;

//----------------------------------------------------------
//API routes for user authentication and account creation
app.post('/sign-up', async (request, response) => {
    const credentials = request.body
    const username = credentials.username;
    const password = credentials.password
    if (validatePassword(password) && validateUsername(username)) {
        await database.raw(`insert into loginInfo (username, password) values ('${username}','${password}')`)
        const newAccount = await database.raw(`SELECT * FROM loginInfo ORDER BY id DESC LIMIT 1;`)
        response.status(200)
        response.json(newAccount)
    } else if (!validatePassword(password)) {
        response.json("Password is invalid")
    } else {
        response.json("Username is invalid")
    }
});


app.post('/sign-in', async (request, response) => {
    const credentials = request.body
    const username = credentials.username;
    const password = credentials.password
    const authentication = await database.raw(`select username from loginInfo where username='${username}' AND password='${password}'`)
    if (authentication.length == 0) {
        response.status(401)
        response.json("Username and passowrd do not match!")
    } else {
        response.status(200)
        response.json(authentication)
    }
});

//---------------------------------------------------------
//API routes for trips
app.get('/trips', async (request, response) => {
    const result = await database.raw('select * from trips')
    response.status(200)
    response.json(result)
});


app.get('/trips/:id', async (request, response) => {
    const id = Number(request.params.id)
    const result = await database.raw(`select * from trips where id = ${id}`)
    response.status(200)
    response.json(result)
});


app.post('/trips', async (request, response) => {  //not yet finished
    const trip = request.body
    const insertResult = await database.raw(`insert into trips (date, destination) values ('${trip.date}','${trip.destination}')`)
    const newTrip = await database.raw(`SELECT * FROM trips ORDER BY id DESC LIMIT 1;`)
    response.status(200)
    response.json(newTrip)
});


app.put('/trips/:id', async (request, response) => {
    try {
        const id = Number(request.params.id)
        const trip = request.body
        await database.raw(`update trips set date=${trip.date}, destination = '${trip.destination}' where id = ${id};`)
        const result = await database.raw(`select * from trips where id=${id}`)
        response.status(200)
        response.json(result)
    } catch (error) {
        response.status(404)
    }
});


app.delete('/trips/:id', async (request, response) => {
    const id = Number(request.params.id)
    await database.raw(`delete from trips where id=${id}`)
    response.status(200)
    response.json(true)
});


app.all('/*', async (request, response) => {
    response.status(404);
    response.json({ error: 'This route does not exist' });
});


app.listen(port, hostname, () => {
    console.log(`Server listening on http://${hostname}:${port}`)
});