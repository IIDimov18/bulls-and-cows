let Validator = require('validatorjs');


export default class Validation{
    static validateRegisterUser(body: {}){
        let rules = {
            username: 'required|max:50',
            email: 'required|email',
            password: 'required|min:3',
            confirmPassword: 'required|same:password'
        }
        let validation = new Validator(body, rules);
        return this.runValidation(body, rules);
    }

    static validateLoginUser(body: {}){
        let rules = {
            email: 'required|email',
            password: 'required'
        }
        return this.runValidation(body, rules);
    }

    static validateSubmitGame(body: {}){
        let rules= {
            username: 'required',
            guesses: 'required',
            timeInSeconds: 'required'
        }
        return this.runValidation(body, rules);
    }

    static runValidation(body, rules){
        let validation = new Validator(body, rules);
        if(validation.passes()){
            return true;
        }else{
            return validation.errors.errors;
        }
    }
}