const userModel = require("../models/user");
const bcrypt = require('bcrypt');
const path = require('path');
var session = require("express-session");

const signup = async (req,res)=>{
    
    //Existing user check
    //hashed password
    //user Creation
    //Token Generate

    const { username, email, password} = req.body;
    try{
        const existingUser = await userModel.findOne({ email : email});
        if(existingUser){
            return res.status(400).json({message : "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await userModel.create({
            email : email,
            password : hashedPassword,
            username : username
        });

        req.session.isLoggedIn = true;
        req.session.email = email;
        req.session.username = username;
        res.redirect('http://localhost:5000/users/');
        // res.status(201).json({user: result, token: token});
        
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }

}

const signin = async(req,res)=>{
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
        res.redirect('http://localhost:5000/users/');

    } catch(error){
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
}

module.exports = { signup , signin };