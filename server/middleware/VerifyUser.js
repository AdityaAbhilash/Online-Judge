import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.js";
import dotenv from 'dotenv'

dotenv.config({path: '../config/.env'})

export const VerifyUser =(req,res,next) =>{
    // const authHeader = req.headers.authorization;            //  Authorization: `Bearer ${Cookies.get('authToken')}`
    // const token = req.cookies.authToken;
     const token = req.headers.authorization.split(" ")[1];
    if(token){
        // const token = authHeader.split(" ")[1]
        jwt.verify(token,process.env.JWT_SECRET_KEY,async (err,playload)=>{
        try{
            if(err){
                return res.status(401).json({error: "Unauthorized."})
            }
            const user = await UserModel.findOne({_id: playload._id}).select("-password")
            req.user = user;
            next();
        } catch(err){
            return res.status(500).json({error : err.message});
        }
        })
    }
    else{
        return res.status(403).json({error: "Forbidden"});
    }
}