import {Router} from 'express'
import { authRoutes } from './authRoutes';
import { postRoutes } from './postRoutes';
import { userRoutes } from './userRoutes';

const routesV1 = Router();

routesV1.use(authRoutes);
routesV1.use(userRoutes);
routesV1.use(postRoutes);


export default routesV1;