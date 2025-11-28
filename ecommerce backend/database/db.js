import mongoose from "mongoose";

 export async function connectDb (){
    try{
       await mongoose.connect("mongodb+srv://rinshadmelethalakkal123_db_user:6MY31ixFTpuI9qmg@cluster0.i9tpogi.mongodb.net/?appName=Cluster0/clotheCommerce")
       console.log("database connection successfull");
       
    }catch(err){
        console.log("database connection failed", err);
        
    }
}

connectDb()

