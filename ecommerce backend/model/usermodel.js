import mongoose from "mongoose";


const userSchema= mongoose.Schema({
    username :{
        type:String, required : true
    },
    Email : {
        type:String, required : true , unique:true
    },
    password : {
        type:String , required:true
    },
    role : {
        type:String,enum:['user','admin'],default:'user' 
    },
    status:{
        type:String,enum:['active','inactive'],default:"active"
    }

})  
const users = mongoose.model("users",userSchema);
export default users;