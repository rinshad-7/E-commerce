import express from "express"
import { adminAddProduct, adminDeleteOrder, adminDeleteProduct, adminOrderList, adminOrderUpdate, adminProductView, adminUpdateProduct, adminUpdateUser, adminViewUSers, categoriAdminView, CategoriDeleteAdmin, categorieAddAdmin, updateCategoriAdmin } from "../controller/admincontroll.js"
import { adminLogin } from "../controller/admincontroll.js"
import { isAdmin } from "../middlewares/auth.js"
import multer from "multer"
import path from "path"


const adminRouter = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        cb(null, "productImages")
    },
    filename: function (req, file, cb) {
        const name = Date.now() + path.extname(file.originalname)
        cb(null, name)
    }

})

const productUpload = multer({ storage: storage })

//====================category manage by admin===========================                   
adminRouter.post("/login", adminLogin)

adminRouter.use((req, res, next) => {
    if (req.session.admin) {
        next()
    } else {
        res.status(401).json({ message: "admin not logged in" })
    }
})



adminRouter.get("/category", categoriAdminView)//
adminRouter.post("/category", categorieAddAdmin)//
adminRouter.put("/category/:id", updateCategoriAdmin)//
adminRouter.delete("/category/:id", CategoriDeleteAdmin)//


//====================product manage by admin=========================== 

adminRouter.get("/products", adminProductView)//
adminRouter.post("/products", productUpload.single("productImage"), adminAddProduct)//
adminRouter.put("/products/:id", productUpload.single("productImage"), adminUpdateProduct)//
adminRouter.delete("/products/:id", adminDeleteProduct)//




//========================= users manage by admin ==========================

adminRouter.get("/users",   adminViewUSers)//
adminRouter.put("/users/:id", adminUpdateUser)

//orders manage by admin

adminRouter.get("/orders", adminOrderList)//
adminRouter.put("/orders/:id", adminOrderUpdate)//
adminRouter.delete("/orders/:id", adminDeleteOrder)

export default adminRouter;