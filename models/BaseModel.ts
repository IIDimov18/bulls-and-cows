import { Connection } from 'mysql';
import MySql from '../database'

export default class BaseModel{
    connection: Connection;

    constructor(){
        this.connection = MySql.getConnection();
    }

}