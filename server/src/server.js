
import dotenv from 'dotenv';
import connectDB from './db';

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




