const mongoose = require('mongoose');
const URI= process.env.DATABASE_KEY

const connectDB=async()=>{
    try{
    await mongoose.connect(URI);
    console.log("Database connection Successful From DB");
    }catch(e){
        console.log("Connection Failed From DB",e);
        return{
         error:true,
         details:e
        }
    }
}
module.exports={connectDB};