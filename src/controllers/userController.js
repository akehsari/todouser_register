import userSchema from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv/config";
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

    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log(hashedPassword);

    const user = await userSchema.create({
      userName,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.secretKey, {
      expiresIn: "5m",
    });
    // console.log(token);
    verifyMail(token, email, userName);
    user.token = token;
    await user.save();

    return res.status(201).json({
      success: true,
      message: "User Register Succesfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User Not Register",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userSchema.findOne({ email: email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Email not register",
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(402).json({
        success: false,
        message: "incorrect Password",
      });
    } else if (checkPassword && user.isVerfied === true) {

      const accessToken = jwt.sign({id:user._id} , process.env.secretKey,{
        expiresIn: "2days"
      })

      const refershToken = jwt.sign({id:user._id} , process.env.secretKey,{
        expiresIn: "4days"
      })


      user.isLoggedIn = true;
      await user.save();
      return res.status(200).json({
        success: true,
        message: "Logged In Succesfully",
        accessToken:accessToken,
        refershToken:refershToken,
        user,
      });
    } else{
      return res.status(400).json({
        success: false,
        message: "Comptele email verfity then login",
      });
    }

    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
