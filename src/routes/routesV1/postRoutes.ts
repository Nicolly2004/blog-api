import { apiAuth } from './../../middlewares/apiAuth';
import { Router } from "express";
import * as postController from "../../controllers/postController"

const postRoutes = Router();

postRoutes.get("/posts",postController.getPosts);
postRoutes.get("/posts/:id",postController.getPostById);
postRoutes.post("/posts",apiAuth,postController.createPost);
postRoutes.put("/posts/:id",apiAuth,postController.updatePost);
postRoutes.delete("/posts/:id",apiAuth,postController.deletePost);
postRoutes.put("/posts/:id/midias",apiAuth,postController.uploadMedia);

export { postRoutes };