import express from "express"
import { loginuser, logoutuser, probycategory, publicCategory, publicProduct, registerUser } from "../controller/publicControll.js";


const publicRouter = express.Router()

publicRouter.post("/register",registerUser)

publicRouter.post("/login",loginuser)
publicRouter.get("/logout",logoutuser)
publicRouter.get("/category",publicCategory)
publicRouter.get("/category/:id",probycategory)
publicRouter.get("/product",publicProduct)

export default publicRouter;