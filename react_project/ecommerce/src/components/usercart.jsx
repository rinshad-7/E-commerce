import { useEffect, useState } from "react";
import Navbar from "./navbar";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState("");
  const [orderError, setOrderError] = useState("");
  const navigate = useNavigate();

  const user = localStorage.getItem("userId");

  // ----------------------------- GET CART -----------------------------
  async function listcart() {
    try {
      const result = await api.get("/cart");
      const items = result.data || [];

      const mapped = items.map((item) => ({
        cartId: item._id,
        productId: item.product._id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.items.quantity,
        productImage: item.product.productImage,
      }));

      setCartItems(mapped);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      listcart();
    }
  }, []);

  // -------------------------- UPDATE QUANTITY --------------------------
  async function updateQuantity(cartId, productId, action) {
    try {
      await api.put(`/cart/${cartId}`, { productId, action });
      listcart(); // refresh UI
    } catch (err) {
      console.error(err);
    }
  }

  // -------------------------- REMOVE ITEM --------------------------
  const handleRemove = async (cartId, productId) => {
    try {
      await api.put(`/cart/${cartId}`, { productId, action: "decrease" });
      listcart();
    } catch (err) {
      console.error(err);
    }
  };

  // -------------------------- PLACE ORDER --------------------------
  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) return;
    setLoading(true);
    setOrderSuccess("");
    setOrderError("");

    try {
      const res = await api.post("/orders", {
        orderStatus: "Pending",
      });

      setOrderSuccess("Order placed successfully!");
      console.log("Order details:", res.data);

      setCartItems([]);

    
    } catch (err) {
      console.error(err.response?.data || err.message);
      setOrderError(err.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const shipping = 50;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Navbar />

      <h1 className="text-3xl font-bold text-gray-800 mt-8 text-center">
        Your Cart
      </h1>

      <div className="max-w-4xl mx-auto mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.cartId}
                className="bg-white shadow-md p-5 rounded-lg flex items-center justify-between"
              >
                {/* PRODUCT IMAGE */}
                <img
                  src={`http://localhost:3000/productImages/${item.productImage}`}
                  alt={item.name}
                  className="w-28 h-28 object-contain rounded-md bg-gray-50"
                />

                {/* DETAILS */}
                <div className="flex-1 ml-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h2>
                  <p className="text-blue-600 font-bold mt-1">₹{item.price}</p>
                </div>

                {/* QUANTITY */}
                <div className="flex items-center space-x-3">
                  <button
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    onClick={() =>
                      updateQuantity(item.cartId, item.productId, "decrease")
                    }
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold">{item.quantity}</span>
                  <button
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    onClick={() =>
                      updateQuantity(item.cartId, item.productId, "increase")
                    }
                  >
                    +
                  </button>
                </div>

                {/* REMOVE */}
                <button
                  className="ml-6 text-red-500 hover:text-red-700 font-semibold"
                  onClick={() => handleRemove(item.cartId, item.productId)}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {/* RIGHT SUMMARY */}
        <div className="bg-white shadow-md p-6 rounded-lg h-fit">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>

          <div className="flex justify-between mb-3">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">₹{subtotal}</span>
          </div>

          <div className="flex justify-between mb-3">
            <span className="text-gray-600">Shipping</span>
            <span className="font-medium">₹{shipping}</span>
          </div>

          <div className="flex justify-between border-t pt-3 mt-3">
            <span className="text-lg font-semibold">Total</span>
            <span className="text-lg font-bold text-blue-600">₹{total}</span>
          </div>

          {/* PLACE ORDER BUTTON */}
          <button
            onClick={handlePlaceOrder}
            disabled={loading || cartItems.length === 0}
            className="mt-6 w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Placing Order..." : "Proceed to Checkout"}
          </button>

          {orderSuccess && <p className="text-green-600 mt-2">{orderSuccess}</p>}
          {orderError && <p className="text-red-600 mt-2">{orderError}</p>}
        </div>
      </div>
    </div>
  );
}

export default CartPage;
