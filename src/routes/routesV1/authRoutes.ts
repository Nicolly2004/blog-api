import { Router } from 'express'
import { requestValidation } from '../../middlewares/requestValidation';
import { loginValidation } from '../../validations/loginValidation';
import { login } from '../../controllers/UserControllers';

const authRoutes = Router();

authRoutes.post("/login", requestValidation(loginValidation),login);

export {authRoutes};