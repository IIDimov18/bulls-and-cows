import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import MySql from './database'


let mySql = MySql.getConnection()

const app: Express = express();
const port = process.env.PORT;



app.get('/', (req: Request, res: Response) => {
   mySql.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
  });
  res.send('Express + TypeScript Server');
});


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});