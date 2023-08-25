import {Router, Request, Response, NextFunction} from 'express';
import Controller from '@/utils/interfaces/controller';
import HttpException from '@/utils/exceptions/http';
import validationMiddleware from '@/middleware/validation';
import dto from '@/modules/post/post.dto'
import PostService from '@/modules/post/post.service';
import authenticatedMiddleware from '@/middleware/authenticated';
import cache from "@/utils/cache"



class PostController implements Controller{
    public path = '/posts';
    public router = Router();
    private PostService = new PostService();
    constructor(){
        this.initialiseRoutes();
    }
    
    private initialiseRoutes(): void{
        this.router.post(
            `${this.path}`,
            authenticatedMiddleware,
            validationMiddleware(dto.createPostDto),
            this.createPost
        );
        this.router.get(
          `${this.path}`,
          cache(60),
          this.getPosts
      );
        
    }


    private createPost = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
      try {
        let {author} = req.body;
        if(!author) req.body.author = req.user.name
        const post = await this.PostService.createPost(req.body);
        res.status(201).json(post);
      }
       catch (error:any) {
            next(new HttpException(400, error.message));
      }
    }
    private getPosts = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
      try {
       
        const posts = await this.PostService.getPosts();
        res.status(200).json(posts);
      }
       catch (error:any) {
            next(new HttpException(400, error.message));
      }
    }

}

export default PostController;