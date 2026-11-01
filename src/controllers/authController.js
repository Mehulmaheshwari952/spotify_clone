const User = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
require("dotenv").config()

async function registerUser(req,res)
{
    try{
        const {username,email,password,role} = req.body;
        const existing = await User.findOne({$or:[{username:username},{email:email}]});
        if(existing)
        {
            console.log("user already exists")
            return res.status(409).json({message:"User already exists"});
        }
        const hashed = await bcrypt.hash(password,10)
        const user = await User.create({
            username,
            email,
            password: hashed,
            role,
        })
        console.log(process.env.JWT_SECRET)
        const token = jwt.sign({
            id:user._id,
            role:user.role,
        },process.env.JWT_SECRET)

        res.cookie("token",token)

        res.status(201).json({message:"User Registered Successfully",user})
    }
    catch(err){
        res.status(401).json({message:err.message})
    }
}

async function isAuthenticated(req,res)
{
    try{
        const {username,email,password} = req.body

        const userDetails = await User.findOne({$or:[{username:username},{email:email}]})
        if(!userDetails || (userDetails.username!==username && userDetails.email!==email))
        {
            return res.status(409).json({mesage:"Invalid Credentials"})
        }

        const isPasswordValid = await bcrypt.compare(password,userDetails.password)
        
        if(!isPasswordValid)
        {
            return res.status(409).json("Password Incorrect")
        }
        
        const token = jwt.sign({
            id:userDetails._id,
            role:userDetails.role
        },process.env.JWT_SECRET)

        res.cookie("token",token)
    
        res.status(200).json({message:"User logged in successully",user:userDetails})
    
    }
    catch(err){
        res.status(401).json({message:err.message})
    }
}

module.exports = {registerUser,isAuthenticated}