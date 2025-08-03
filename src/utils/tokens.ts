import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


const ACCESSTOKEN = process.env.SECRET_KEY as string;
const REFRESHTOKEN = process.env.REFRESH_SECRET_KEY as string;



const createtokens = (userId:number) =>{
    const accessToken = jwt.sign({userId},ACCESSTOKEN , {expiresIn: '15m'});
    const refreshToken = jwt.sign({userId}, REFRESHTOKEN, {expiresIn:'5d'});
    return {accessToken, refreshToken}
}

export default createtokens;