import { Router } from "express";
import * as userController  from "../../controllers/UserControllers";
import { exceptionHandler } from "../../middlewares/exceptionHandler";
import { requestValidation } from "../../middlewares/requestValidation";
import { createUser } from "../../validations/createUser";

const userRoutes = Router();

userRoutes.post("/users",requestValidation(createUser),userController.saveUser);
userRoutes.get("/users",userController.getUsers)
userRoutes.get("/users/:id",userController.getUser);

export {userRoutes};