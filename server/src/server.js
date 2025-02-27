
import dotenv from 'dotenv';
import connectDB from './db/index.js';
import app from './app.js';

dotenv.config({
    path: "./.env"
})

console.log("this is server page ");

connectDB().then(()=>{
    app.on('error',(error)=>{
        console.log("Error in server",error);
        process.exit(1);
    })


    app.listen(process.env.PORT||5000,()=>{
        console.log(`Server is running on http://localhost:${process.env.PORT}`);
    })
})




