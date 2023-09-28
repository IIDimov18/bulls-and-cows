import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import MySql from './database'
import { Server } from 'socket.io';
import * as socket from './socket';
import http from 'http';
import { User } from './user';

const login = require("./routes/login");
const register = require("./routes/register");
const game = require("./routes/game")

let mySql = MySql.getConnection()

const app: Express = express();
const port = process.env.PORT;

const httpServer = new http.Server(app);


app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.get('/', (req: Request, res: Response) => {
   mySql.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
  });
  res.send('Express + TypeScript Server');
});

app.use('/login',login)
app.use('/register',register)
app.use('/game',game)

const io = new Server(httpServer, { cors: { origin: '*' } });

io.on('connection', (client: any) => {
  io.emit('users-online', User.getUserList());

  socket.disconnectClient(client, io);
  socket.addUserOnline(client, io);
  socket.removeUserOnline(client, io);
});



app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});