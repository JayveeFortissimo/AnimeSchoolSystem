export interface UserAuthentication{
    username: string;
    email:string;
    age: number;
    password: string; 
    isAdmin?: boolean;
    image?: string | null;
    contact?: string;
}