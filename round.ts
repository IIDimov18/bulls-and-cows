import { createHash } from "crypto";

export default class Round {
    public roundToken: string;

    public playerOne: string;
    
    public playerTwo: string;

    public playerToGuess:string;

    public numberToGuess: string;

    public guesses!: string[];

    public roundStartedAt: Date;

    public roundTime!: string;
  
    public constructor(playerOne:string, playerTwo:string, numberToGuess:string, playerToGuess: string ){
        this.playerOne = playerOne;
        this.playerTwo = playerTwo;
        this.playerToGuess = playerToGuess
        this.numberToGuess = numberToGuess,
        this.roundStartedAt = new Date()
        this.roundToken = createHash('sha256').update(this.playerOne+this.playerTwo + Date.now()).digest('hex')

    }
  
    // public CreateNewGame(key: string){
    //   let newGame = new GameModel();
    //   this.games.push()
    // }
    public test(){
      console.log('TEST');
    }
  
    public CreateLobby(){
      
    } 
  }