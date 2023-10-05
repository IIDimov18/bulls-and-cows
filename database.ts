import mysql, { Connection } from 'mysql';
const util = require("util"); 


export default class MySql{
    private connection!: Connection;

    private static pool: MySql;
    
    public static getConnection() {

        if(!this.pool){
            this.pool = new MySql();
        }

        return this.pool.connection;
    }

    private constructor() {

        this.connection = mysql.createConnection({
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASS,
          database: process.env.DB_DB,
        });
    
        this.connect();

      }
    
      connect() {

        this.connection.connect();

      }
}