import React from "react";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    
    <div className="w-[20%] h-[90vh] bg-[#07484A] text-white shadow-2xl  flex flex-col justify-between left-0 top-0">
      <div className="p-6 text-center border-b border-[#0b5c5e]">
        <h1 className="text-2xl font-bold tracking-wide">Admin Panel</h1>
      </div>

      <ul className="flex flex-col p-6 space-y-4 text-lg">
        <li>
             <Link
            to="/admin/categories"
            className="block hover:bg-[#096c6e] px-4 py-2 rounded-lg transition-all duration-200"
          >
           RESULT
          </Link>
          <Link
            to="/admin/categories"
            className="block hover:bg-[#096c6e] px-4 py-2 rounded-lg transition-all duration-200"
          >
           CATEGORIES
          </Link>
        </li>

        <li>
          <Link
            to="/admin/add-category"
            className="block hover:bg-[#096c6e] px-4 py-2 rounded-lg transition-all duration-200"
          >
           ADD CATEGORY
          </Link>
        </li>

        <li>
          <Link
            to="/admin/products"
            className="block hover:bg-[#096c6e] px-4 py-2 rounded-lg transition-all duration-200"
          >
           PRODUCTS
          </Link>
        </li>

        <li>
          <Link
            to="/admin/add-product"
            className="block hover:bg-[#096c6e] px-4 py-2 rounded-lg transition-all duration-200"
          >
           ADD PRODUCT
          </Link>
        </li>

        <li>
          <Link
            to="/admin/users"
            className="block hover:bg-[#096c6e] px-4 py-2 rounded-lg transition-all duration-200"
          >
            USERS LIST
          </Link>
        </li>
      </ul>

      <div className="p-4 text-center border-t border-[#0b5c5e] text-sm opacity-80">
         Admin Dashboard
      </div>
    </div>
        
  );
};
   

export default AdminSidebar;
