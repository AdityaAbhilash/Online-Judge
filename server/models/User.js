import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name :{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique :true
    },
    username:{
        type: String,
        require : true,
        unique : true
    },
    password:{
        type: String,
        require: true
    }
})

const UserModel = mongoose.model("user",UserSchema)  // save in the database as user 
export {UserModel}