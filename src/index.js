import express from 'express';
import database from "../src/databaseConnectivity.js";
import { validatePassword, validateUsername } from "../src/validationFunctions.js";

const app = express();
app.use(express.json());
app.use('/', express.static('./public', { extensions: ['html'] }));

//----------------------------------------------------------
//API routes for user authentication and account creation
app.post('/api/sign-up', async (request, response) => {
    const credentials = request.body
    const username = credentials.username;
    const password = credentials.password
    console.log(username, password);
    if (validatePassword(password) && await validateUsername(username)) {
        await database.raw(`insert into loginInfo (username, password) values ('${username}','${password}')`)
        const newAccount = await database.raw(`SELECT * FROM loginInfo ORDER BY id DESC LIMIT 1;`)
        response.status(200)
        response.json(newAccount)
    } else if (!validatePassword(password)) {
        response.status(401)
        response.json("Password is invalid")
    } else {
        response.status(401)
        response.json("Username is invalid")
    }
});

app.post('/api/sign-in', async (request, response) => {
    const credentials = request.body
    const username = credentials.username;
    const password = credentials.password
    const authentication = await database.raw(`select username from loginInfo where username='${username}' AND password='${password}'`)
    if (authentication.length == 0) {
        response.status(401)
        response.json("Username and password do not match!")
    } else {
        response.status(200)
        response.json(authentication[0])
    }
});

//---------------------------------------------------------
//API routes for trips

app.get('/api/trips', async (request, response) => {
    const result = await database.raw('select * from trips')
    response.status(200)
    response.json(result)
});


app.get('/api/trips/:id', async (request, response) => {
    const id = Number(request.params.id)
    const result = await database.raw(`select * from trips where id = ${id}`)
    response.status(200)
    response.json(result)
    console.log(result);
});


app.post('/api/trips', async (request, response) => {
    const trip = request.body
    await database.raw(`insert into trips (date, destination) values ('${trip.date}','${trip.destination}')`)
    const newTrip = await database.raw(`SELECT * FROM trips ORDER BY id DESC LIMIT 1;`)
    response.status(200)
    response.json(newTrip)
});


app.put('/api/trips/:id', async (request, response) => {
    try {
        const id = Number(request.params.id)
        const { date, destination } = request.body
        await database.raw(`update trips set date = '${date}', destination = '${destination}' where id = ${id};`)
        response.status(200)
    } catch (error) {
        response.status(404)
        console.log("Error in update");
    }
});


app.delete('/api/trips/:id', async (request, response) => {
    const id = Number(request.params.id)
    await database.raw(`delete from trips where id=${id}`)
    response.status(200)
    response.json(true)
});


app.all('/*', async (request, response) => {
    response.status(404);
    response.json({ error: 'This route does not exist' });
});

const hostname = 'localhost';
const port = 3000;
app.listen(port, hostname, () => {
    console.log(`Server listening on http://${hostname}:${port}`)
});