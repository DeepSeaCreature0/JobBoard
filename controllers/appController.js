import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from '../middlewares/errors.js';
import {Application} from '../models/appModel.js';
import {Job} from '../models/jobModel.js';
import cloudinary from 'cloudinary';

export const postApp = catchAsyncError(async(req,res,next)=>{
    const {role} = req.user;

    if(role === "Employer"){
        return next(new ErrorHandler("Employer can't access these resources !",400));
    }

    if(!req.files || Object.keys(req.files).length===0){
        return next(new ErrorHandler("!! Upload your Resume !!",400));
    }

    const {resume} = req.files;
    const allowedFormats = ["image/png","image/jpg","image/jpeg","image/webp"];

    if(!allowedFormats.includes(resume.mimetype)){
        return next(new ErrorHandler("!! Invalid File Type. Please upload your resume in a PNG,JPG,JPEG or WEBP format file !!",400));
    }

    const cloudinaryResponse= await cloudinary.uploader.upload(
        resume.tempFilePath
    );  

    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.error("Cloudinary Error: ",cloudinaryResponse.error||" Encountered unknown cloudinary error");
        return next(new ErrorHandler("Failed to upload Resume",400));
    }

    const {name,email,coverLetter,phone,address,jobID} = req.body;
    const applicantID = {
        user:req.user._id,
        role:"Job Seeker"
    };

    if(!jobID){
        return next(new ErrorHandler("Job not found",404));
    }

    const job = await Job.findById(jobID);

    if(!job){
        return next(new ErrorHandler("Job not found",404));
    }

    const employerID={
        user:job.postedBy,
        role:"Employer"
    };

    if(!name || !email || !coverLetter || !phone || !address || !employerID || !applicantID || !resume){
        return next(new ErrorHandler("Please provide all details",400));
    }

    const application = await Application.create({name,email,coverLetter,phone,address,applicantID,employerID,
        resume:{
            public_id:cloudinaryResponse.public_id,
            url:cloudinaryResponse.secure_url
        }
    });

    res.status(200).json({
        success:true,
        message:"Application Posted Successfully !",
        application,
    });
});

export const employerGetAllApps = catchAsyncError(async(req,res,next)=>{
    const {role} = req.user;

    if(role === "Job Seeker"){
        return next(new ErrorHandler("Job Seeker can't access these resources !",400));
    }

    const {_id}=req.user;

    const apps= await Application.find({'employerID.user': _id});

    res.status(200).json({
        success:true,
        message:"Applications Fetched Successfully !",
        apps,
    });
});

export const jobSeekerGetAllApps = catchAsyncError(async(req,res,next)=>{
    const {role} = req.user;

    if(role === "Employer"){
        return next(new ErrorHandler("Employer can't access these resources !",400));
    }

    const {_id}=req.user;

    const apps= await Application.find({'applicantID.user': _id});

    res.status(200).json({
        success:true,
        message:"Applications Fetched Successfully !",
        apps,
    });
});


export const jobSeekerDeleteApp = catchAsyncError(async(req,res,next)=>{
    const {role} = req.user;

    if(role === "Employer"){
        return next(new ErrorHandler("Employer can't access these resources !",400));
    }

    const {id}=req.params;
    const app = await Application.findById(id);

    if(!app){
        return next(new ErrorHandler("Application not found !",404));
    }

    await app.deleteOne();

    res.status(200).json({
        success:true,
        message:"Applications deleted Successfully !",
    });
});

