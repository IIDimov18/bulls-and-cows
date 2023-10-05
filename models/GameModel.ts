import MySql from '../database'
import BaseModel from './BaseModel';
import { resolve } from 'dns/promises';
import { reject } from 'bluebird';

export default class GameModel extends BaseModel{

    public async submitGame(username: string, guesses: number,points: number, timeInSeconds: number){
        const query = 'INSERT INTO game (user_id, guesses, points, time_seconds) (SELECT id, ?, ?, ? FROM user WHERE username = ?)'
        return new Promise((resolve, reject)=>{
            let result = this.connection.query(query,[guesses, points, timeInSeconds, username], (err,result)=>{
                if(err){
                    return reject(err);
                }
                resolve(result);
            })
        })
    }

    public async getLeaderboard(){
        const query = 'SELECT game.points, user.username FROM game INNER JOIN user ON game.user_id=user.id ORDER BY game.points ASC LIMIT 10;'
        return new Promise((resolve,reject)=>{
            let result = this.connection.query(query, (err,result)=>{
                if(err){
                    return reject(err);
                }
                resolve(result);
            })
        })
    }
    
} 