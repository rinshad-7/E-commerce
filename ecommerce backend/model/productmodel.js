import mongoose, { Schema } from "mongoose";

const productsmodel = mongoose.Schema({
    productImage: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories",
        required: true
    }


}, { timestamps: true })

const products = mongoose.model("products", productsmodel);
export default products