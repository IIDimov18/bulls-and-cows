import { rejects } from 'assert';
import MySql from '../database'
import BaseModel from './BaseModel';

export default class RegistrationModel extends BaseModel{

    public async checkUsernameOREmailAvailability(field:string,value: string){
        const query = 'SELECT Id FROM user WHERE '+field+' = ?'
        return new Promise((resolve, reject)=>{
            let result = this.connection.query(query,[value], (err,result)=>{
                if(err){
                    return reject(err);
                }
                resolve(result);
            })
        })
    }
    
    public async Register(params: {},password){
        const query = 'INSERT INTO user (username, email, password) VALUES (?,?,?)'
        return new Promise((resolve, reject)=>{
            let result = this.connection.query(query,[params.username,params.email,password], (err,result)=>{
                if(err){
                    return reject(err);
                }
                resolve(result);
            })
        })
    }

    public async GetEmailById(id:number){
        const query = 'SELECT email FROM user WHERE id = ?'
        return new Promise((resolve, reject)=>{
            let result = this.connection.query(query,[id], (err,result)=>{
                if(err){
                    return reject(err);
                }
                resolve(result);
            })
        })
    }

    public async GetIdByEmail(email:string){
        const query = 'SELECT id FROM user WHERE email = ?'
        return new Promise((resolve, reject)=>{
            let result = this.connection.query(query,[email], (err,result)=>{
                if(err){
                    return reject(err);
                }
                resolve(result);
            })
        })
    }

    public async GenerateToken(id:number,token:string, for_session:boolean){
        const query = 'INSERT INTO token (user_id, token, for_session, is_active) VALUES (?, ?, ?, 1)'
        return new Promise((resolve, reject)=>{
            let result = this.connection.query(query,[id, token, for_session], (err,result)=>{
                if(err){
                    return reject(err);
                }
                resolve(result);
            })
        })
    }

    public async ConfirmAccount(token:string){
        const query = 'UPDATE `user` INNER JOIN token ON `user`.id = token.user_id SET `user`.is_active = 1, token.is_active = 0 WHERE token.token = ? AND token.is_active = 1';
        return new Promise((resolve, reject)=>{
            let result = this.connection.query(query,[token], (err,result)=>{
                if(err){    
                    return reject(err);
                }
                resolve(result);
            })
        })
    }
} 