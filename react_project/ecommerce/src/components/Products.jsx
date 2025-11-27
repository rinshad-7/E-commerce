import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "./navbar";

function ProductList() {
  const [products, setproducts] = useState([]);
  const user = localStorage.getItem("userId");

  const getProducts = async () => {
    try {
      const res = await api.get("/product");
      console.log(res.data);
      setproducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  async function addtocart(id, name) {
    try {
      const res = await api.post("/cart", {
        productId: id,
        quantity: 1,
        productName:name,

      });
      console.log(res.data);
    } catch (error) {
      console.error(
        "Add to cart failed",
        error.response?.data || error.message
      );
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="min-h-screen bg-white p-10">
      <Navbar />

      {/* TITLE */}
      <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center">Products</h1>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

        {products.map((element, ind) => (
          <div
            key={ind}
            className="bg-white shadow-md rounded-xl p-4 w-[300px] mx-auto 
                       transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            {/* BIG IMAGE - Card Background Style */}
            <div className="w-full h-72 bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={`http://localhost:3000/productImages/${element.productImage}`}
                alt={element.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>

            {/* NAME */}
            <h2 className="mt-3 text-lg font-semibold text-gray-800">
              {element.name}
            </h2>

            {/* PRICE */}
            <p className="text-blue-600 font-bold text-xl mt-1">
              ₹{element.price}
            </p>

            {/* BUTTON */}
           {!user ? (
        <></>
      ) : (<button
              onClick={() => addtocart(element._id,element.name)}
              className="mt-4 w-full py-2 bg-blue-600 text-white rounded-md 
                         hover:bg-blue-700 transition duration-200"
            >
              Add to Cart
            </button>)}
          </div>
        ))}

      </div>
    </div>
  );
}

export default ProductList;


// async function getorder (){
//   const result = await api.get("/order")
// } 