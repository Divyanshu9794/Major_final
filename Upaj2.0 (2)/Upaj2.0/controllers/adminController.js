const userModel = require("../models/user");
const bcrypt = require('bcrypt');
const path = require('path');
var session = require("express-session");

const signIn = async(req,res)=>{
    const {email, password} =req.body;
    try{
        const existingUser = await userModel.findOne({ email : email});
        if(!existingUser){
            return res.status(404).json({message : "User not found"});
        }

        const matchPassword = await bcrypt.compare(password, existingUser.password);

        if(!matchPassword){
            return res.status(400).json({message: "Invalid Credentials"});
        }
        req.session.isLoggedIn = true;
        req.session.email = email;
        req.session.username = existingUser.username;
        // const token = jwt.sign({email: existingUser.email, id: existingUser._id},SECRET_KEY);
        // res.status(201).json({user: existingUser, token: token});
        res.redirect('http://localhost:5000/admin/');

    } catch(error){
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
}
const signin = async(req,res)=>{
    const {email, password} =req.body;
    try{
        if(email!="admin@gmail.com"){
            return res.status(404).json({message : "User not found"});
        }

        if(password!="admin"){
            return res.status(400).json({message: "Invalid Credentials"});
        }
        req.session.isLoggedIn = true;
        req.session.email = email;
        req.session.username = "admin";
        // const token = jwt.sign({email: existingUser.email, id: existingUser._id},SECRET_KEY);
        // res.status(201).json({user: existingUser, token: token});
        res.redirect('http://localhost:5000/admin/');

    } catch(error){
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
}
module.exports = {signin};