import { Router } from "express";
import * as userController  from "../../controllers/UserControllers";
import { checkSchema } from "express-validator";
import { UserService } from "../../services/userService";

const userRoutes = Router();

userRoutes.post("/users",userController.saveUser);
userRoutes.get("/users",userController.getUsers)
userRoutes.get("/users/:id",userController.getUser);

export {userRoutes};