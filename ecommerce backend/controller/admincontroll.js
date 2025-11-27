import categories from "../model/categorymodel.js";
import products from "../model/productmodel.js";
import users from "../model/usermodel.js";
import orders from "../model/orderschema.js";
import multer from "multer";
import bcrypt from "bcrypt"
import mongoose from "mongoose";



export const adminLogin = async (req, res) => {
    try {
        console.log("reached here");

        console.log(req.body);

        const { email, password } = req.body;

        const dataBaseUrl = "mongodb://127.0.0.1:27017/clotheCommerce";
        let data = await mongoose.connect(dataBaseUrl);
        let db = data.connection.db;
        let adminFound = await db.collection("admin").findOne({ email });
        if (!adminFound) {
            return res.status(401).json({ message: "incorrect Email Address" });
        }

        const ismatched = await bcrypt.compare(password, adminFound.password);
        if (!ismatched) {
            return res.status(401).json({ message: "incorrect password", success: false });
        }

        req.session.admin = {
            Id: adminFound._id,
            email: adminFound.email,
        };

        return res.status(200).json({ message: req.session.admin, success: true })

    } catch (err) {
        console.log(err);
        console.log("error in login woked");
        return res.status(500).json({ message: err, success: false })

    }

};


//============================category admin view ================================

export async function categoriAdminView(req, res) {
    try {
        const showuser = await categories.find({});
        console.log(showuser)

        res.json(showuser)
    } catch (err) {
        console.error(err)
    }
}



//====================================admin category add =============================

export async function categorieAddAdmin(req, res) {
    console.log("inside add c");


    try {


        const { name, description } = req.body

        const existingcategorie = await categories.findOne({ name: name });
        if (existingcategorie) {
            return res.json("this category exists")
        }
        const result = await categories.create({
            name: name,
            description: description
        })
        console.log(result);

        res.json({
            message: "category is added",
            success: true,
            categoryId: result._Id
        })

    } catch (err) {
        console.log(err)

    }


}


export async function updateCategoriAdmin(req, res) {
    try {

        const id = req.params.id;

        const found = await categories.findByIdAndUpdate(id, req.body, { new: true })

        if (found) {
            res.status(200).json({
                messaage: `${found.name} is updated`,
                success: true
            })
        } else {
            res.json("no updation found")
        }
    } catch (err) {
        console.error("Delete cart error", err)
        res.status(500).json({ messaage: "server error", error: err.messaage })
    }


}


//========================================= categori delete admin ===============================

export async function CategoriDeleteAdmin(req, res) {
    try {
        const id = req.params.id

        const found = await categories.findByIdAndDelete(id)
        if (found) {
            res.status(200).json({
                messaage: `${found.name} is deleted`,
                success: true
            })
        } else {
            res.json("not deletd")
        }

    } catch (err) {
        console.error("delete cart error", err);
        res.status(500).json({ messaage: "server error", error: err.messaage })
    }

}



//========================================= admin product view ===============================

export async function adminProductView(req, res) {
    try {
        const product = await products.find().populate("category")

        console.log(product);


        res.json(product)
    } catch (error) {
        console.error(error)
        throw new Error("error found")
    }
}

//========================================= admin add product ===============================

export async function adminAddProduct(req, res) {
    try {
        console.log("api reached at adminaddproduct")
        let proImage = "";
        if (req.file) {
            proImage = req.file.filename;
        }
        console.log(proImage)
        const {
            name,
            category,
            price,
            description,
        } = req.body;
        const product = new products({
            name,
            category,
            price,
            description,
            productImage: proImage,
        });
        console.log(product,"jjjjjjjjjj");
        
        await product.save();
        res.json({ message: product });
    } catch (err) {
        console.log(err);
        res.json({ message: err });
    }
}


//========================================= admin update product ===============================

export async function adminUpdateProduct(req, res) {
  try {
    const id = req.params.id;

    // Build update object
    const updateData = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category
    };

    // Only add productImage if a new file was uploaded
    if (req.file) {
      updateData.productImage = req.file.filename; // or req.file.path if you save full path
    }

    const update = await products.findByIdAndUpdate(id, updateData, { new: true });

    if (update) {
      res.status(200).json({
        message: `${update.name} product is updated`
      });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}




//========================================= admin delete product ===============================


export async function adminDeleteProduct(req, res) {
    console.log("reached here");

    try {
        const id = req.params.id;
        const deleted = await products.findByIdAndDelete(id)

        if (!deleted) {
            res.status(404).json("not found the product")
        }
        res.status(200).json({
            message: `${deleted.name} is deleted`
        })
    } catch (err) {
        console.error(err)
    }
}





//========================================= admin view users =============================== 

export async function adminViewUSers(req, res) {
    try {
        const user = await users.find({})
        // console.log(user)

        if (!user) {
            res.status(500).json("no user found")
        }
        res.status(200).json(user)
    } catch (err) {
        console.error(err)
    }
}



//========================================= admin update user =============================== 

export async function adminUpdateUser(req, res) {

    try {
        const id = req.params.id;
        const { status } = req.body;
        const found = await users.findByIdAndUpdate(id, { status: status }, { new: true });
        if (!found) {
            return res.status(404).json("user not found")
        }
        console.log(found);

        res.status(200).json({
            message: `${found.username} is updated`,
            success: true
        })

    } catch (err) {
        console.error(err)
    }

}


//========================================= admin order list  =============================== 

export async function adminOrderList(req, res) {
    try {
        const order = await orders.find({})

        if (!order) {
            res.status(404).json("no orders found")
        }
        res.status(200).json(order)
    } catch (err) {
        console.error(err)
    }
}


//========================================= admin order update  =============================== 


export async function adminOrderUpdate(req, res) {

    try {
        const id = req.params.id

        console.log(id)

        const found = await orders.findByIdAndUpdate(id, req.body, { new: true })

        if (!found) {
            res.status(404).json("order not found")
        }

        res.status(200).json(`${found} is updated`)

    } catch (err) {
        console.error(err)
    }

}


//========================================= admin delete orders =============================== 


export async function adminDeleteOrder(req, res) {
    try {
        const id = req.params.id;

        const found = await orders.findByIdAndDelete(id)

        if (!found) {
            res.status(404).json("user not found")
        }

        res.status(200).json("order delet successfully")
    } catch (err) {
        console.error(err)
    }
}
