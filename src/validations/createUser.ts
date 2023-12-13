import { Schema } from "express-validator";
import { UserService } from "../services/userService";


export const createUser: Schema = {
    email:{
        isEmail: true,
        notEmpty: true,
        custom: {
            options: async(value) => {
                const userService: UserService = new UserService();
                try{
                const user = await userService.getUserByEmail(value);
                if(user){
                    return false;
                }
                  return true;
              }catch(e:any){
                    return true;
                }
            },
        },
    },
    birthDate:{notEmpty:true},
    name:{notEmpty:true, isLength:{
        options:{
            min:7,
        },
        errorMessage:"Informe seu nome completo",
    }, 
  },
  password:{
    isLength:{
        options:{
            min:8,
            max:20,
        },
        errorMessage:"Sua senha deve conter entre 8 e 20 caracteres"
    },
    notEmpty: true,
  },
  gender: {
    notEmpty:true,
    custom:{
        options:(value) => {
            return ["Male","Female"].includes(value);
        },
    },
  },
}