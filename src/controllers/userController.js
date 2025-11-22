import userSchema from "../models/userSchema.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import dotenv from 'dotenv/config'
import { verifyMail } from "../emailVerify/verifyMail.js";

export const register = async (req, res) => {
  try {
    const { userName, password, email } = req.body;
    const existing = await userSchema.findOne({ email: email });
    // console.log(existing);
    
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Email already in use",
      });
    } 


    const hashedPassword = await bcrypt.hash(password,10)
    // console.log(hashedPassword);

    const user =  await userSchema.create({userName , email, password:hashedPassword});


    const token = jwt.sign({id:user._id},process.env.secretKey, {
        expiresIn:"5m",
    } )
    // console.log(token);
    verifyMail(token, email, userName)
    user.token = token;
    await user.save();
    
    return res.status(201).json({
      success: true,
      message: "User Register Succesfully",
      user,
    
    })

  } catch (error) {
     return res.status(500).json({
      success: false,
      message: "User Not Register",
    });

  }
};
