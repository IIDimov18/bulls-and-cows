
import BaseController from "./BaseController";
import Validation from "../validate";
import GameModel from "../models/GameModel";


export default class GameController extends BaseController {

  private gameModel: GameModel;

  public constructor(){
      super();
      this.gameModel = new GameModel()
  }

  async SubmitGame(req: Request, res: Response){
    let params = req.body;

    let validate = Validation.validateSubmitGame(params)

    if(validate){

      let points = params.guesses * params.timeInSeconds
      let result = await this.gameModel.submitGame(params.username, params.guesses, points, params.timeInSeconds)

    }

  }

  async GetLeaderboard(res: Response){

    let result = await this.gameModel.getLeaderboard();
    res.send(result)

  }
}