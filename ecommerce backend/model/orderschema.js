import { Timestamp } from "bson";
import mongoose from "mongoose";


const ordermodel = mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "users",
        required: true
    },
    items :[
        { productId : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
            required : true
        },
        quantity : {type:Number,required:true},
        price :{ type : Number,required:true},
        productName :{
            type: String,
            required: true
        }

        }
    ],
    totalAmount: {
        type:Number,
        required:true
    },
    orderStatus: {
        type:String,
        required:true,
        enum: ["shipped","Pending","deliverd"],
        default:"Pending"
    }
},{timestamps:true});

const orders = mongoose.model("orders",ordermodel);
export default orders;