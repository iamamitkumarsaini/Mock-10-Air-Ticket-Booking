const express = require("express");
const { User } = require("../Models/User.Model");
require("dotenv").config();

const userRoutes = express.Router();

userRoutes.post("/register",async(req,res) => {
    const {name,email,password} = req.body;

    const userEmail = await User.findOne({email});

    if(userEmail){
        res.status(409).send({"Message":"This Email is already registered"})
    }
    else{

        try {
            const user = new User({name,email,password});
            await user.save();
            res.status(201).send({"Message":"Signup Successfully"})
        } 
        
        catch (err) {
            console.log(err);
            res.status(500).send({"Message":"Signup failed, try again"})
        }
    }
})



userRoutes.post("/login",async(req,res) => {

    try {
        const {email,password} = req.body;

        const byEmail = await User.find({email});

        if(byEmail.length>0){
            console.log(byEmail)
            const prevPassword = byEmail[0].password;
            if(prevPassword === password){
                res.status(201).send({"Message":"Logged-In Successfully",byEmail})
            }
            else{
                res.status(401).send({"Message":"The Password you Entered is Wrong"})
            }
        }
        else{
            res.status(404).send({"Message":"User not found"})
        }
    } 
    
    catch (err) {
        console.log(err);
        res.status(500).send({"Message":"Login failed, try again"})
    }
})

module.exports = { userRoutes }
