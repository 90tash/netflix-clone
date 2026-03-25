import { User } from '../models/user.model.js';

import bcryptjs from 'bcryptjs';
import { generateTokenAndSetCookie } from '../utils/generateToken.js';

export async function signup(req, res) {
    try {
        const { email, password, username } = req.body;

        if (!email || !password || !username) {
            return res.status(400).json({ success: false, message: "All fields are required" })
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" })
        }
        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "Password must be at least 6 characters" })
        }

        const existingUserByEmail = await User.findOne({ email: email })
        if (existingUserByEmail) {
            return res.status(400).json({ success: false, message: "Email already exists" })
        }

        const existingUserByUsername = await User.findOne({ username: username })

        if (existingUserByUsername) {
            return res.status(400).json({ success: false, message: "Username alredy exists" })
        }


        //hiding the password and encoding it nearly impossible to decode from the database in MongoBB
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);



        const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
        const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];


        const newUser = new User({
            image: image,
            email: email,
            password: hashedPassword,
            username: username,
        });

        await newUser.save();
        generateTokenAndSetCookie(newUser._id, res);


        //Remove password from the response i.e postman
        res.status(201).json({
            success: true,
            user: {
                ...newUser._doc,
                password: "",
            },
        })

    } catch (error) {
        console.log("Error in Singup Controller ", error.message);
        res.status(500).json({ success: false, message: "Internal Server error" });
    }

}
export async function logout(req, res) {
    try {
      res.clearCookie("jwt-token-netflix", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {
      console.error("Error in Logout controller:", error.message);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }
  
export async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: true, message: "All fields are Requireds" });
        }
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(404).json({ success: false, message: " Account not found! please check Password or Email" })
        }
        const isPasswordCorrect = await bcryptjs.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ success: false, message: "Password is incorrect" });
        }
    
        generateTokenAndSetCookie(user._id,res);
         //Remove password from the response i.e postman
        res.status(200).json({
            success:true,
            user:{
                ...user._doc,
                password:""
            }
        })
    } catch (error) {
        console.log("Error in Login controller", error.message);
        res.status(500).json({ success: false, message: "Internal Server error" });
    }


}

export async function authCheck(req,res) {

   try {
    console.log("req.user:",req.user);
    res.status(200).json({success:true,user:req.user});
    
   } catch (error) {
    console.log("Error in AuthCheck Controller",error.message);
    res.status(500).json({success:false,message:"Internal Server Error in the AuthCheck Controller"});
   }
    
};