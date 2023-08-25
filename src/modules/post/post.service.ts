import PostModel from '@/modules/post/post.model';
import Post from '@/modules/post/post.interface';
import { isMainThread,parentPort,Worker, workerData } from 'worker_threads';

class PostService{
    private post = PostModel;

    public async createPost(postDto: Post): Promise<Post>{
        try {
            console.log(postDto)
            return await this.post.create(postDto);
        } catch (error) {
            throw new Error('Cannot create post');
        }
       
    }
    public async getPosts(): Promise<Post[]>{
        try {
            return await this.post.find();
        } catch (error) {
            throw new Error('Cannot get posts');
        }
    }
        
       
    
  

} 

export default PostService;