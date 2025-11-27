import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "./navbar";

function CategoryProductsCombined() {
  const [categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  // Load all categories
  const getCategories = async () => {
    const res = await api.get("/category");
    setCategories(res.data);
  };

  // Load ALL products ONCE
  const getAllProducts = async () => {
    const res = await api.get("/product");
    setAllProducts(res.data); // all products here
    setFilteredProducts(res.data); // show all by default
  };

  // Filter products by category id (NO API CALL)
  const filterByCategory = (id, name) => {
    const filtered = allProducts.filter(p => p.category === id);
    setFilteredProducts(filtered);
    setCategoryName(name);
  };

  useEffect(() => {
    getCategories();
    getAllProducts();
  }, []);

  return (
    <>
      <Navbar />

      <div className="p-6">

        <h1 className="text-3xl font-bold text-[#07484A] mb-5">Categories</h1>

        {/* Category list */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-10">
          {categories.map(cat => (
            <div
              key={cat._id}
              onClick={() => filterByCategory(cat._id, cat.name)}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 transition cursor-pointer"
            >
             
              <div className="p-3">
                <h2 className="text-lg font-semibold">{cat.name}</h2>
              </div>
            </div>
          ))}
        </div>

        {/* Selected category title */}
        {categoryName && (
          <h2 className="text-2xl font-bold mb-4 text-[#07484A]">
            {categoryName} Products
          </h2>
        )}

        {/* Filtered product list */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {filteredProducts.map(p => (
            <div key={p._id} className="bg-white shadow-md rounded-lg p-3">
              <img
              src={`http://localhost:3000/productImages/${p.productImage}`}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="text-gray-600">₹{p.price}</p>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}

export default CategoryProductsCombined;
