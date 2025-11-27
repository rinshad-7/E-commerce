import express from 'express'
import mongoose from 'mongoose'


const categorymodel = mongoose.Schema({
    name: {
        type: String,
        required : true,
        unique : true
    },
     description: {
        type : String,
        required : true
     }
},{timestamps : true});

const categories = mongoose.model("categories",categorymodel)
export default categories;