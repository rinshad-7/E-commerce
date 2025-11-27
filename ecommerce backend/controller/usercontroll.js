import orders from "../model/orderschema.js";
import cart from "../model/cartmodel.js";
import products from "../model/productmodel.js";
import mongoose from "mongoose";




export async function userAddCart(req, res) {
  try {
    const { productName, productId, quantity } = req.body;
    const userId = req.session.userId;


    const product = await products.findOne({ _id: productId });
    if (!product) {
      return res.status(404).json("Product not found");
    }


    let userCart = await cart.findOne({ userId });

    if (!userCart) {
      userCart = await cart.create({
        userId,
        items: [],
      });
    }


    if (!Array.isArray(userCart.items)) userCart.items = [];


    const qty = Number(quantity);
    const existingItem = userCart.items.find((i) => i.productId.toString() === productId
    );
    console.log(existingItem)

    if (existingItem) {
      existingItem.quantity += qty;
    } else {
      userCart.items.push({
        productId,
        quantity: qty,
        price: product.price,
        productName: productName,
      });
    }


    userCart.totalAmount = userCart.items.reduce(
      (sum, i) => sum + i.quantity * i.price,
      0
    );

    await userCart.save();
    // await userCart.populate("items.productId");

    res.json(userCart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}



//user update cart 

export async function updatecart(req, res) {
  try {
    const id = req.params.id;
    const { productId, action } = req.body;

    const Cart = await cart.findOne({ _id: id }).populate("items.productId");
    console.log(Cart);

    if (!Cart) {
      return res.status(404).json("Cart not found");
    }


    const item = Cart.items.find(i => i.productId._id.toString() === productId);

    if (!item) {
      return res.status(404).json("Product not in cart");
    }

    if (action === "increase") {
      item.quantity += 1;
    } else if (action === "decrease" && item.quantity > 1) {
      item.quantity -= 1;
    } else if (action === "decrease" && item.quantity === 1) {

      Cart.items = Cart.items.filter(i => i.productId._id.toString() !== productId);
    } else {
      return res.status(400).json("No valid action detected");
    }

    Cart.totalAmount = Cart.items.reduce((sum, i) => sum + i.quantity * i.price, 0);

    await Cart.save();
    await Cart.populate("items.productId");

    res.status(200).json(Cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}


// user view cart



export async function usercart(req, res) {
  try {
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const cartData = await cart.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } }, // <-- fixed
      { $unwind: "$items" },
      {
        $lookup: {
          from: "products",
          localField: "items.productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" },
      {
        $project: {
          _id: 1,
          userId: 1,
          totalAmount: 1,
          productImage: 1,
          "items.quantity": 1,
          "items.price": 1,
          product: "$productDetails",
        },
      },

    ]);

    res.status(200).json(cartData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}



//delete cart by user 


export async function deletecart(req, res) {
  try {
    const id = req.params.id

    const found = await cart.findByIdAndDelete(id);

    if (!found) {
      res.status(404).json("product not found")
    }
    res.status(200).json({
      message: `${found._id}is deleted`,
      success: true
    })
  } catch (err) {
    console.error("delete cart error ", err)
    res.status(500).json({ message: "server error", error: err.message })
  }
}

// ================= user add a order =================

export async function placeorder(req, res) {
  try {
    const userId = req.session.userId;
    const status = req.body.orderStatus;


    const cartfound = await cart.findOne({ userId });
    if (!cartfound) {
      return res.status(404).json("User has no cart");
    }
    console.log(cartfound)

    const order = await orders.create({
      userId,
      items: cartfound.items,
      totalAmount: cartfound.totalAmount,
      orderStatus: status, 
    });


    cartfound.items = [];
    cartfound.totalAmount = 0;
    await cartfound.save();


    await order.populate("items.productId");

    res.status(200).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}



export async function orderview(req, res) {
  try {
    const userId = req.session.userId;
    const found = await orders.find({ userId: userId });

    if (!found) {
      res.status(404).json("there is no order found in this user ")
    }
    res.status(200).json(found);
  } catch (err) {
    console.error(err)
  }
}



//========================= get specific order =======

export async function getspecificorder(req, res) {
  try {
    const id = req.params.id;
    const found = await orders.findOne({ _id: id });

    if (!found) {
      res.status(404).json("no order found")
    }

    res.status(200).json(found)
  } catch (err) {
    console.error(err)
  }
}


