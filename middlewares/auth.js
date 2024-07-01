import { catchAsyncError } from './catchAsyncError.js';
import ErrorHandler from './errors.js';
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';

export const isAuthorized = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler("User not Authorized", 400));
    }

    const decoded_token = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decoded_token.id);

    if (!req.user) {
        return next(new ErrorHandler("User not found", 404));
    }

    next();
});
