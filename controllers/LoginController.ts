
import BaseController from "./BaseController";
import { createHash } from "crypto";
import LoginModel from "../models/LoginModel";
import Validation from "../validate";
import { LoginResponse } from "../types";


export default class LoginController extends BaseController {

  private loginModel: LoginModel;

  public constructor(){

      super();
      this.loginModel = new LoginModel();

  }

  async login(req: Request, res: Response) {

    let params = req.body;

    let response: LoginResponse = {
      error: '',
      token: '',
      username: ''
    };

    let validate = Validation.validateLoginUser(params)

    let passowrd = createHash('sha256').update(params.password).digest('hex'); 

    let result = await this.loginModel.Login(params.email,passowrd);

    if(!result.length){

      response.error = "There is no account with that credentials"
      res.send(response)

    }else{

      response.username = result[0].username

      if(!result[0].is_active){

        res.send("You need to confirm your account through the link send to your email")

      }else{
        
          if(params.rememberMe && result.length>0){

            let token = createHash('sha256').update(result[0].username+ Date.now()).digest('hex');
            let tokenResult = await this.loginModel.GenerateToken(result[0].id,token,1);
            response.token = token;

          }
      
          res.send(response);
          
        }
      }
  }

}