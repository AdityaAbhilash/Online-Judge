import express from 'express';
import { validationResult } from 'express-validator';   // to check the request body 
import { ProfileModel } from '../models/profile.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { UserModel } from '../models/user.js';
import CryptoJS from 'crypto-js';
import nodemailer from 'nodemailer';
import { VerificationModel } from '../models/verification.js';

dotenv.config({path: "../config/.env"})

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

const sendVerificationEmail = async (email, verificationCode) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Your Verification Code',
        text: `Your verification code is ${verificationCode}`
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

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

        // Generate a 6-digit verification code
        const verificationCode = Math.floor(100000 + Math.random() * 900000);

        // Save the verification code in a temporary collection
        const newVerification = new VerificationModel({ email, verificationCode, hashPassword, name, username });
        await newVerification.save();

        // Send the verification email
        await sendVerificationEmail(email, verificationCode);
        
        // save the new user to the database 
        // const result = await newUser.save();

        
        // const newProfile = new ProfileModel({
        //     userId: result._id,
        //     name: result.name,
        //     username: result.username,
        //     photo: "",
        //     dob: "",
        //     institute: "",
        //     gender: "other" // default value
        // });

        // await newProfile.save();

        // the _doc is sent to the client , we we should not give the password 
        // const token = jwt.sign({_id: result._id},process.env.JWT_SECRET_KEY,{expiresIn: "1d"})
        // res.cookie('authToken', token, { httpOnly: true, secure: true, sameSite: "None" });

        // const user = {...result._doc,password: undefined}
        return res.status(201).json({ success: true});
    } catch (err) {
        console.log(err);
        return res.status(500).json({ err: err.message });
    }
};

const VerifyCode = async (req, res) => {
    const { email, code } = req.body;

    try {
        const verificationRecord = await VerificationModel.findOne({ email });

        if (!verificationRecord) {
            return res.status(400).json({ errors: [{ msg: 'Invalid or expired verification code.' }] });
        }

        if (verificationRecord.verificationCode !== code) {
            return res.status(400).json({ errors: [{ msg: 'Invalid verification code.' }] });
        }

        // Create a new user with the verified details
        const newUser = new UserModel({
            name: verificationRecord.name,
            email,
            username: verificationRecord.username,
            password: verificationRecord.hashPassword
        });

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

        // Delete the verification record
        await VerificationModel.deleteOne({ email });

        // Create JWT token
        const token = jwt.sign({ _id: result._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });

        // Set cookie with the token
        res.cookie('authToken', token, { httpOnly: true, secure: true, sameSite: "None" });

        const user = {...result._doc,password: undefined}
        return res.status(201).json({ success: true,user,token});
    } catch (error) {
        return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
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


export { Register , Login ,Auth ,VerifyCode};
