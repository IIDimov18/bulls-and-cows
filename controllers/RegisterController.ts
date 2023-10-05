import BaseController from "./BaseController";
import RegistrationModel from "../models/RegistrationModel";
import Validation from "../validate";
import Mailer from "../mailer";
import { createHash } from "crypto";
import { RegisterResponse } from "../types";

export default class RegisterController extends BaseController {

    private registrationModel: RegistrationModel;

    public constructor(){

        super();
        this.registrationModel = new RegistrationModel();

    }

    async checkUsername(req: Request, res: Response){

        let result = await this.registrationModel.checkUsernameOREmailAvailability('username',req.query.username);
        res.send(result.length?false:true);

    }

    async checkEmail(req: Request, res:Response){

        let result = await this.registrationModel.checkUsernameOREmailAvailability('email',req.query.email);
        res.send(result.length?false:true);

    }
    
    async registerUser(req:Request,res:Response){
        let params = req.body;
        let validate = Validation.validateRegisterUser(params);

        let response: RegisterResponse={
            errors: [],
            registered:false
        };
        
        if(validate!=true){

            Object.keys(validate).forEach(key =>{
                response.errors.push(validate[key])
            })

        }

        let emailAvailable = await this.registrationModel.checkUsernameOREmailAvailability('email',params.email);

        if(emailAvailable.length){
            response.errors.push("There is already an account with this email");
        }

        let usernameAvailable = await this.registrationModel.checkUsernameOREmailAvailability('username',params.username);
        
        if(usernameAvailable.length){
            response.errors.push("Username taken")
        }

        if(response.errors.length==0){

            let passowrd = createHash('sha256').update(params.password).digest('hex');
            let result = await this.registrationModel.Register(params,passowrd)

            if(result.affectedRows==1){

                let token = createHash('sha256').update(params.email+params.username + Date.now()).digest('hex');
                let id = await this.registrationModel.GetIdByEmail(params.email);

                await this.registrationModel.GenerateToken(id[0].id,token,0);
                this.sendEmail(id[0].id,"Confirm account", `Go to this link to confirm your account ${process.env.HOST}:${process.env.PORT}/register/confirm-email?token=${token}` )
                
                response.registered = true;

            }else{
                response.errors.push("Something went wrong!")
            }
        }

        res.send(response);
    }

    async sendEmail(id:number, subject: string, text:string){
        let email = await this.registrationModel.GetEmailById(id);
        
        if(email.length){

            Mailer.sendMail(email[0].email,subject,text);

        }
    }

    async confirmAccount(token:string, req:Request=null){

        let result = await this.registrationModel.ConfirmAccount(token);
        
        if(req!=null){

            req.redirect('http://localhost:4200/login')

        }else{ 

            return result;

        }
    }
}