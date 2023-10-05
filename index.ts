import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

import MySql from './database'
import http from 'http';

const login = require("./routes/login");
const register = require("./routes/register");
const game = require("./routes/game")

let mySql = MySql.getConnection()

const app: Express = express();
const port = process.env.PORT;

app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    next();
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/login',login)
app.use('/register',register)
app.use('/game',game)


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});