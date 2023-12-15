import { Response,Request ,NextFunction} from 'express';
import { PostService } from './../services/PostService';
import { MediaService } from '../services/MediaService';
import { uploadMedia } from './../services/UploadFileService';
import { Post } from '@prisma/client';



const postService: PostService = new PostService();
const mediaService: MediaService = new MediaService();

const upload = async (images:string[],post: Post) => {
    for(let media of images){
        const {filename,filePath} = await uploadMedia(media,[
            "posts",
            post.id,
        ]);
        const mediaPayload = {
            name: filename,
            path: filePath,
            postId: post.id,
       };
        await mediaService.createMedia(mediaPayload);
       }
}

export const createPost = async(
    request:any, 
    response:Response,
    next: NextFunction

): Promise<Response | undefined> => {
    const postImages = request.body.images;
    delete request.body.images;
    try{
        const postPayload = request.body;
        postPayload.authorId = request.user.id;  
    const post = await postService.createPost(request.body);

    if(postImages && postImages.length > 0) {
       await upload(postImages,post);
    }

    return response.status(201).json(post);
    }catch(error:any) {
      next(error);
}
};

export const getPostById = async (
    request:Request, 
    response:Response,
    next: NextFunction

): Promise<Response | undefined> => {
    try{
    const post = await postService.getById(request.params.id);
    return response.status(200).json(post);
    }catch (error:any) {
        next(error);
    }
};

export const getPosts = async(
    request:Request,
    response:Response
): Promise<Response> => {
    const posts = await postService.getAll();
    return response.status(200).json(posts);
};

export const updatePost = async(
    request:Request,
    response:Response,
    next: NextFunction
): Promise<Response | undefined> => {
    const images = request.body.images;
    delete request.body.images;

    try{
    const post = await postService.updatePost(request.params.id, request.body);
    if (images && images.length > 0) {
        await upload(images,post);
    }
    return response.status(200).json(post);
}   catch(error: any) {
    next(error);
}
};

export const deletePost = async (
    request:Request,
    response:Response
): Promise<Response> => {
    await postService.deletePost(request.params.id);
    return response.status(204).json();
};

