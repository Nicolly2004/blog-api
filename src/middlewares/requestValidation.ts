import {Request,Response,NextFunction}  from 'express';
import { checkSchema } from 'express-validator';

export const requestValidation = (validationSchema: any) => {
  return async (request: Request,response: Response,next: NextFunction) => {
    const validations = await checkSchema(validationSchema).run(request);
    
    const errosArray = [];
    for(let validation of validations){
        if(validation.isEmpty()){
            continue;
        }
        errosArray.push(...validation.array());
    }

    if(errosArray.length > 0){
        return response.status(422).json({
            message: "Ta viajando parça?",
            errors: errosArray,
        });
       }

       next();
    };
};