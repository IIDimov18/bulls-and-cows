import { rejects } from 'assert';
import MySql from '../database'
import BaseModel from './BaseModel';

export default class LoginModel extends BaseModel{

    public async Login(email:string,passowrd: string){
        const query = 'SELECT username, id, is_active FROM user WHERE email = ? AND password = ?'
        return new Promise((resolve, reject)=>{
            let result = this.connection.query(query,[email,passowrd], (err,result)=>{
                if(err){
                    return reject(err);
                }
                resolve(result);
            })
        })
    }

    public async GenerateToken(id:number,token:string, for_session:boolean){
        const query = 'INSERT INTO token (user_id, token, for_session, is_active, expires_at) VALUES (?, ?, ?, 1, DATE_ADD( NOW(), INTERVAL 30 DAY )                                                                                                                                                                                                                                                                                                                                                                                                 )'
        return new Promise((resolve, reject)=>{
            let result = this.connection.query(query,[id, token, for_session], (err,result)=>{
                if(err){
                    return reject(err);
                }
                resolve(result);
            })
        })
    }
} 