import { rejects } from 'assert';
import MySql from '../database'
import BaseModel from './BaseModel';
import { AssociativeArray } from '../types';
import RoundModel from './RoundModel'

export default class GameModel extends BaseModel{

    private gameId: number

    private playerOneId: number

    private playerTwoId: number

    private rounds: [RoundModel]

    private matchMaking: string[];

    public constructor(players: string,){
        super()
        this.matchMaking = ['','']        
    }
    public checkForLobby(){

    }
    
    public startGame(username:string){
        if(this.matchMaking[0]!='' && this.matchMaking[1]==''){
            
        }
    }
} 