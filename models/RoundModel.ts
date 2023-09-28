import MySql from '../database'
import BaseModel from './BaseModel';
import { AssociativeArray } from '../types';

export default class RoundModel extends BaseModel{

    private gameId: number;

    playerOneId: number;

    playerTwoId: number;
    public constructor(players: string,){
        super()
        
    }

} 