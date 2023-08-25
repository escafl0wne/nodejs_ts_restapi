import UserModel from '@/modules/user/user.model';
import token from "@/utils/token"
import { registerUserDto,loginUserDto } from '@/modules/user/registerUser.dto';


class UserService{
    private user = UserModel
    /**
    *Register a new user
 */

    public async register(registerUserDto: registerUserDto): Promise<string | Error> {
        try {
            console.log(registerUserDto)
            const user = await this.user.create(registerUserDto);
            return token.createToken(user);
        
        } catch (error) {
            throw new Error("Unable to create user",{cause:error});
        }
    }
      /**
    *Login a user
 */
    public async login(loginUserDto:loginUserDto): Promise<string | Error> {
        try {
            const user = await this.user.findOne({email:loginUserDto.email});

            if(!user){
                throw new Error("User not found");
            }
            if(await user.isValidPassword(loginUserDto.password)){
                return token.createToken(user);
            } else{
                throw new Error("Wrong Credentials given");
            
            }
            
        }
         catch (error) {
            throw new Error("Unable to login user",{cause:error});
        
        }
    }
}

export default UserService;