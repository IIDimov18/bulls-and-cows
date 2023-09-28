
import BaseController from "./BaseController";
import { createHash } from "crypto";
import Validation from "../validate";
import GameModel from "../models/GameModel";
import { AssociativeArray } from "../types";


export default class GameController extends BaseController {
  // private games: [AssociativeArray<GameModel>];

  public constructor(){
      super();
  }

  // public CreateNewGame(key: string){
  //   let newGame = new GameModel();
  //   this.games.push()
  // }
  // public test(){
  //   console.log('TEST');
  // }

  // public CreateLobby(){

  // } 
}