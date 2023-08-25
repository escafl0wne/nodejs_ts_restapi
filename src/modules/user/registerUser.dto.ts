export interface registerUserDto{
    name: string;
    email: string;
    password: string;
    role:string

}

export interface loginUserDto{
    email: string;
    password: string;
}