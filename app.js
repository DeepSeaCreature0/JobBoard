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
dotenv.config({path: "./config/config.env"});

app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
});

app.use(cors({
    origin: '*',  // For debugging; change to process.env.FRONTEND_URL in production
    methods: ['GET','PUT','POST','DELETE'],
    credentials: true,
}));

app.options('*', cors({
    origin: '*',  // For debugging; change to process.env.FRONTEND_URL in production
    methods: ['GET','PUT','POST','DELETE'],
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp/"
}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");  // For debugging; change to process.env.FRONTEND_URL in production
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/app", appRouter);
app.use("/api/v1/job", jobRouter);

dbConnection();

app.use(errorMiddleware);

export default app;
