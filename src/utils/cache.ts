import mcache from "memory-cache"
import { Request, Response, NextFunction, RequestHandler } from "express";


const cache =  (duration: number): RequestHandler => {
    return async (req: Request, res:Response, next: NextFunction) :Promise< void > => {
        
        const key = '__express__' + req.originalUrl || req.url
        const cachedBody = mcache.get(key)
        if (cachedBody) {
            console.log("Hello from cache")
            res.send(cachedBody)
            return 
        } else {
            console.log("Hello from response")

            mcache.put(key, req.user, duration * 1000);
            next()
        }
    }


}

export default cache;