import express from 'express'
import { fontendauth, isUser } from '../middlewares/auth.js'
import { deletecart, getspecificorder, orderview, placeorder, updatecart, userAddCart, usercart } from '../controller/usercontroll.js'

const userRouter = express.Router()

userRouter.post("/cart",isUser ,userAddCart)

userRouter.put("/cart/:id", isUser,updatecart)
userRouter.get("/cart",isUser,usercart)
userRouter.delete("/cart/:id",isUser,deletecart)
userRouter.post("/orders",isUser,placeorder)
userRouter.get("/order",isUser,orderview)
userRouter.get("/order/:id",isUser,getspecificorder)
userRouter.get("/authcheck",fontendauth)


export default userRouter;