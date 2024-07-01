import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
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

    phone:{
        type: Number,
        required: [true, 'Please provide your phone number !'],
    },

    password:{
        type: String,
        required: [true, 'Please provide your password !'],
        minLength: [8, 'Password length must be atleast 8'],
        maxLength: [30, 'Password length should not exceed 30'],
        select: false,
    },

    role:{
        type: String,
        required: [true, 'Please select your role'],
        enum: ['Job Seeker', 'Employer'],
    },

    createdAt:{
        type: Date,
        default: Date.now,
    }

});

// Password Encryption using hashing

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
});

// Password comparison when user enter password for login

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

// For generating json Web token for authorization
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{
        expiresIn: process.env.JWT_EXPIRE,
    });
}

export const User = mongoose.model("USer",userSchema);

