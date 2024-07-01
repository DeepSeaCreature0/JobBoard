import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Please provide job title !"],
        minLength: [3,'Job Title must contain atleast 3 characters !'],
        maxLength: [50,'Job Title cannot exceed 25 characters !'],
    },

    description:{
        type:String,
        required:[true,"Please provide job description !"],
        minLength: [20,'Job Description must contain atleast 50 characters !'],
        maxLength: [500,'Job Description cannot exceed 500 characters !'],
    },

    category:{
        type:String,
        required:[true,"Job Category is required !"],
    },

    country:{
        type:String,
        required:[true,"Country is required !"],
    },

    city:{
        type:String,
        required:[true,"City is required !"],
    },

    location:{
        type:String,
        required:[true,"location is required !"],
        minLength: [20,'location must contain atleast 20 characters !'],
    },

    fixedSalary:{
        type:Number,
        minLength: [4,'Fixed salary must contain atleast 4 digits !'],
        maxLength: [10,'Fixed salary cannot exceed 10 digits !'],
    },

    salaryFrom:{
        type:Number,
        minLength: [4,'Salary From must contain atleast 4 digits !'],
        maxLength: [10,'Salary From cannot exceed 10 digits !'],
    },

    salaryTo:{
        type:Number,
        minLength: [4,'Salary To must contain atleast 4 digits !'],
        maxLength: [10,'Salary To cannot exceed 10 digits !'],
    },

    expired:{
        type:Boolean,
        default:false,

    },

    jobPostedOn:{
        type:Date,
        default:Date.now,
    },

    postedBy:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    }
});

export const Job = mongoose.model("Job",jobSchema);