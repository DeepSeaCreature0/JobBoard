import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from '../middlewares/errors.js';
import {User} from '../models/userModel.js';
import {sendToken} from '../utils/jwtTokens.js';

export const register = catchAsyncError(async(req,res,next)=>{
    const {name,email,phone,role,password} = req.body;

    if(!name || !email || !phone || !role || !password){
        return next(new ErrorHandler("Please provide all details !",400));
    }

    const isEmail = await User.findOne({email});

    if(isEmail){
        return next(new ErrorHandler("Email already exists !",400));
    }

    const user = await User.create({name,email,phone,role,password});

    sendToken(user,200,res,"User Registered Successfully !");
});


export const login = catchAsyncError(async(req,res,next)=>{
    const {email,password,role} = req.body;

    if(!email || !role || !password){
        return next(new ErrorHandler("Please provide all details !",400));
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid Email or Password !",400));
    }

    const isCorrectPassword = await user.comparePassword(password);

    if(!isCorrectPassword){
        return next(new ErrorHandler("Invalid Email or Password !",400));
    }

    if(user.role !== role){
        return next(new ErrorHandler(`User with ${role} role not found !`,400));
    }

    sendToken(user,200,res,"User logged in successfully !");
});

export const logout = catchAsyncError(async(req,res,next)=>{
    res.status(201).cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly: true,
        secure: true,
        sameSite: "None",
    }).json({
        success:true,
        message:"User logged out Successfully! ",
    });
});

export const getUSer = catchAsyncError(async(req,res,next)=>{
    const user = req.user;
    res.status(200).json({
        success:true,
        user,
    });
});