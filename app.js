import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import userRouter from './routes/userRouter.js';
import appRouter from './routes/appRouter.js';
import jobRouter from './routes/jobRouter.js';
import {dbConnection} from './database/dbConnection.js';
import {errorMiddleware} from './middlewares/errors.js';

const app = express();
dotenv.config({path:"./config/config.env"});
console.log("CORS allowed origin:", process.env.FRONTEND_URL);

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ['GET','PUT','POST','DELETE'],
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/temp/"
}));

app.use("/api/v1/user",userRouter);
app.use("/api/v1/app",appRouter);
app.use("/api/v1/job",jobRouter);

dbConnection();

app.use(errorMiddleware);
export default app;
