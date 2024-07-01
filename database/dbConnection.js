import mongoose from 'mongoose';

export const  dbConnection = ()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"JobBoard"
    }).then(()=>{
        console.log('Connected to Database');
    }).catch((err)=>{
        console.log(`Failed to Connect to the Database : ${err}`);
    })
};

