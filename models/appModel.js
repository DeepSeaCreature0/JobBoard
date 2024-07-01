import mongoose from 'mongoose';
import validator from 'validator';

const appSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true,'Please provide your name !'],
        minLength: [3,'Name must contain atleast 3 characters !'],
        maxLength: [25,'Name cannot exceed 25 characters !'],
    },
    
    email:{
        type: String,
        required: [true, 'Please provide your email !'],
        validate: [validator.isEmail, 'Please provide a valid email !'],
    },

    coverLetter:{
        type:String,
        required:[true,"Please provide your cover letter !"],
    },

    phone:{
        type: Number,
        required: [true, 'Please provide your phone number !'],
    },

    address:{
        type:String,
        required:[true,"Please provide your address !"],
    },

    resume:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        }
    },

    applicantID:{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        role:{
            type:String,
            required:true,
            enum: ['Job Seeker'],
        }
    },

    employerID:{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        role:{
            type:String,
            required:true,
            enum: ['Employer'],
        }
    }
});

export const Application = mongoose.model("Application",appSchema);