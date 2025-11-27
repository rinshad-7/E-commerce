import mongoose from "mongoose";

 export async function connectDb (){
    try{
       await mongoose.connect("mongodb://127.0.0.1:27017/clotheCommerce")
       console.log("database connection successfull");
       
    }catch(err){
        console.log("database connection failed", err);
        
    }
}

connectDb()

