import React, { useState } from "react";
import AdminProducts from "../admin/AdminProducts";
import CategoriesPage from "../admin/Categorie";
import AdminGetUsers from "../admin/admingetusers";
import { useNavigate } from "react-router-dom"; 
import api from "../api/api";


const Categories = () => <CategoriesPage />;
const Products = () => <AdminProducts />;
const AddProduct = () => (
  <div>
    <h2 className="text-2xl font-bold text-[#07484A] mb-4">Add Product</h2>
    <p className="text-gray-700">Form to add a new product.</p>
  </div>
);
const UsersList = () => <AdminGetUsers />;

function Admin() {
  const [activeComponent, setActiveComponent] = useState("categories");
  const navigate = useNavigate(); // redirect 

  const renderComponent = () => {
    switch (activeComponent) {
      case "categories":
        return <Categories />;
      case "addCategory":
        return <div>Add Category Form</div>;
      case "products":
        return <Products />;
      case "addProduct":
        return <AddProduct />;
      case "users":
        return <UsersList />;
      default:
        return <Categories />;
    }
  };

  // Logout handler
  const handleLogout = async () => {
    await api.get("/logout")
    
    navigate("/admin/login");
  };

  return (
    <div className="flex w-full h-[100vh]">
      {/* Sidebar */}
      <div className="w-[20%] h-[100vh] bg-[#07484A] text-white shadow-2xl flex flex-col justify-between">
        <div className="p-6 text-center border-b border-[#0b5c5e]">
          <h1 className="text-2xl font-bold tracking-wide">Admin Panel</h1>
        </div>

        <ul className="flex flex-col p-6 space-y-4 text-lg">
          <li
            onClick={() => setActiveComponent("categories")}
            className={`cursor-pointer px-4 py-2 rounded-lg transition-all duration-200 ${
              activeComponent === "categories" ? "bg-[#096c6e]" : "hover:bg-[#096c6e]"
            }`}
          >
            Categories
          </li>
          <li
            onClick={() => setActiveComponent("addCategory")}
            className={`cursor-pointer px-4 py-2 rounded-lg transition-all duration-200 ${
              activeComponent === "addCategory" ? "bg-[#096c6e]" : "hover:bg-[#096c6e]"
            }`}
          >
            Add Category
          </li>
          <li
            onClick={() => setActiveComponent("products")}
            className={`cursor-pointer px-4 py-2 rounded-lg transition-all duration-200 ${
              activeComponent === "products" ? "bg-[#096c6e]" : "hover:bg-[#096c6e]"
            }`}
          >
            Products
          </li>
          <li
            onClick={() => setActiveComponent("addProduct")}
            className={`cursor-pointer px-4 py-2 rounded-lg transition-all duration-200 ${
              activeComponent === "addProduct" ? "bg-[#096c6e]" : "hover:bg-[#096c6e]"
            }`}
          >
            Add Product
          </li>
          <li
            onClick={() => setActiveComponent("users")}
            className={`cursor-pointer px-4 py-2 rounded-lg transition-all duration-200 ${
              activeComponent === "users" ? "bg-[#096c6e]" : "hover:bg-[#096c6e]"
            }`}
          >
            Users List
          </li>
        </ul>

        {/* Logout Button */}
        <div className="p-6 border-t border-[#0b5c5e]">
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white transition"
          >
            Logout
          </button>
          <p className="text-center text-sm mt-2 opacity-80">© 2025 Admin Dashboard</p>
        </div>
      </div>

      {/* Right Side - Dynamic Content */}
      <div className="w-[80%] bg-gray-100 p-8 overflow-y-auto">{renderComponent()}</div>
    </div>
  );
}

export default Admin;
