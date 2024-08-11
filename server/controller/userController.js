import express from 'express';
import { validationResult } from 'express-validator';   // to check the request body 
import { ProfileModel } from '../models/profile.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { UserModel } from '../models/user.js';
import CryptoJS from 'crypto-js';

dotenv.config({path: "../config/.env"})

// register controller

const Register = async (req, res) => {
    // it checks the request body for any error 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // get all the data from the request body 
    const { name, email, username, password } = req.body;
    
    try {
        const decryptedPassword = CryptoJS.AES.decrypt(password, process.env.ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
        // check if the user already exists 
        const userExist = await UserModel.findOne({ email });
        if (userExist) {
            return res.status(400).json({
                errors: [{ msg: 'User already exists' }],
            });
        }

        const userExist1 = await UserModel.findOne({ username });
        if (userExist1) {
            return res.status(400).json({
                errors: [{ msg: 'username is taken,try a new one' }],
            });
        }

        // encrypt the password 
        const hashPassword = await bcrypt.hash(decryptedPassword, 12);

        // we store the encrypt password , so we have to create a dummy like user and pass it to store it 
        const newUser = new UserModel({ name, email, username, password: hashPassword });
        
        // save the new user to the database 
        const result = await newUser.save();

        
        const newProfile = new ProfileModel({
            userId: result._id,
            name: result.name,
            username: result.username,
            photo: "",
            dob: "",
            institute: "",
            gender: "other" // default value
        });

        await newProfile.save();

        // the _doc is sent to the client , we we should not give the password 
        const token = jwt.sign({_id: result._id},process.env.JWT_SECRET_KEY,{expiresIn: "1d"})
        res.cookie('authToken', token, { httpOnly: true, secure: true, sameSite: "None" });

        const user = {...result._doc,password: undefined}
        return res.status(201).json({ success: true,user,token});
    } catch (err) {
        console.log(err);
        return res.status(500).json({ err: err.message });
    }
};






// login controller 

const Login = async (req, res) => {
    // it checks the request body for any error 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // get all the data from the request body 
    const { username, password } = req.body;
    
    try {
        const decryptedPassword = CryptoJS.AES.decrypt(password, process.env.ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
        // check if the user already exists 
        const userExist = await UserModel.findOne({ username });
        if (!userExist) {
            return res.status(400).json({
                errors: [{ msg: 'User Not Registered ' }],
            });
        }


        // check the password
        const isPasswordOk = await bcrypt.compare(decryptedPassword,userExist.password);

        if(!isPasswordOk){
            return res.status(400).json({
                errors: [{ msg: 'Wrong Password' }],
            });
        }
        
        // token generation

        const token = jwt.sign({_id: userExist._id},process.env.JWT_SECRET_KEY,{expiresIn: "1d"})
        res.cookie('authToken', token, { httpOnly: true, secure: true, sameSite: "None" });

        const user = {...userExist._doc,password: undefined}
        return res.status(201).json({ success: true,user,token});
    } catch (err) {
        console.log(err);
        return res.status(500).json({ err: err.message });
    }
};

// auth function

const Auth =(req,res)=>{
    return res.status(200).json({success:true, user: {...req.user._doc}})
    // we will return the user and use in verify middleware.
}


export { Register , Login ,Auth };
