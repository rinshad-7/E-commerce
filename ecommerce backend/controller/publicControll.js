import users from '../model/usermodel.js'
import session from 'express-session'
import bcrypt from 'bcrypt'
import products from '../model/productmodel.js'
import categories from '../model/categorymodel.js'

export async function registerUser(req, res) {
    try {
        const { username, Email, password, repassword } = req.body


        if (!username || !Email || !password || !repassword) {
            return res.status(400).json({ message: "all fields are required" })
        }



        if (password !== repassword) {
            return res.json({ message: "passwords do not match" })

        }

        const existingUser = await users.findOne({ $or: [{ username }, { Email }] });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Username or Email alredy registerd"
            })
        }

        const hashpassword = await bcrypt.hash(password, 10);

        const newUser = new users({
            username,
            Email,
            password: hashpassword
        });

        await newUser.save()

        return res.status(201).json({
            success: true,
            message: "user registration successfull"
        })


    } catch (err) {
        console.error(err)
    }

}



//=========================login user ========================




export async function loginuser(req, res) {

    try {
        const { Email, password } = req.body

        const existinguser = await users.findOne({ Email: Email })

        if (!existinguser) {
            return res.json("Email not found")
        }

        const pass = await bcrypt.compare(password, existinguser.password);

        if (!pass) {
            return res.json("password is incorrect")
        }

        if (existinguser.role === "admin") {
            return res.json("this page for users")
        }


        req.session.role = existinguser.role
        req.session.userId = existinguser._id


        res.status(200).json({
            message: `${existinguser.username} you successfully loggedin`,
            success: true,
            userId: existinguser._id
        })

    } catch (err) {
        console.error(err)
    }
}



//================================ logout user ============================


export async function logoutuser(req, res) {
    try {
        req.session.destroy((err) => {
            if (err) {
                console.error(err)
                res.status(500).json("logout fail")
            }

            res.status(200).json("logout successful")
        })
    } catch (err) {
        console.error("error")
    }
}




//================================ public category view ============================



export async function publicCategory(req, res) {
    try {
        const showuser = await categories.find({})

        console.log(showuser)

        res.json(showuser)
    } catch (err) {
        console.error(err)
    }
}



//================================ public product view ============================


export async function publicProduct(req, res) {
    try {
        console.log("api reached here")
        const showProduct = await products.find({})

        res.json(showProduct)
    } catch (err) {
        console.error(err)
    }
}

export async function probycategory(req,res) {
    try{

        const { id } = req.params;

        const selectedProducts = await products.find({categories: id});
        const catName = await categories.findById(id)

        return res.status(200).json({
            products:selectedProducts,
            category_name: catName.name
        });

    }catch (err) {
        console.error("error fetching products by category" ,err);
        return res.status(500).json([]);


    }
    
}