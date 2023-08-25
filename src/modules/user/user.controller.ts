import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller';
import HttpException from '@/utils/exceptions/http';
import validationMiddleware from '@/middleware/validation';
import UserService from '@/modules/user/user.service';
import authenticatedMiddleware from '@/middleware/authenticated';
import validate from "@/modules/user/user.validation"
import cache from '@/utils/cache';
class UserController implements Controller{
    public path = '/users';
    public router = Router();

    private UserService = new UserService();


    constructor(){
        this.initialiseRoutes();

    }

    private initialiseRoutes(): void{
        this.router.post(`${this.path}/register`, validationMiddleware(validate.register), this.register);
        this.router.post(`${this.path}/login`, validationMiddleware(validate.login), this.login);
        this.router.get(`${this.path}`, authenticatedMiddleware,cache(60), this.getUser);
    
    }

    private register = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
       
        try {
           
            const token = await this.UserService.register({...req.body,"role":"user"}) 
            res.status(201).json({"message":"User created successfully","token":token}) 
        } catch (error:any) {
          next(new HttpException(400, error.message));
        }
       
           
            
    }

    private login = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
     
            const token = await this.UserService.login( req.body);
            res.status(200).json({"message":"User logged in successfully","token":token})
        }
         catch (error:any) {
            next(new HttpException(400, error.message));
        }
    }

    private getUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        if(!req.user){
            return next(new HttpException(400, "No user found"))
        
        }

        res.status(200).json(req.user)
    }
}

export default UserController;