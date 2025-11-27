import React from "react";

const MainContent = () => {
  return (
    <div className="space-y-8 w-[80%] flex flex-col items-end  ">
      <div>
        <h1 className="text-3xl font-bold text-[#07484A] mb-4">
          Dashboard Overview
        </h1>
        <p className="text-gray-600">
          Welcome to your admin dashboard. Here you can manage categories,
          products, and users.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white shadow-md p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-[#07484A] mb-2">
            Total Categories
          </h3>
          <p className="text-2xl font-bold text-gray-800">12</p>
        </div>

        <div className="bg-white shadow-md p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-[#07484A] mb-2">
            Total Products
          </h3>
          <p className="text-2xl font-bold text-gray-800">156</p>
        </div>

        <div className="bg-white shadow-md p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-[#07484A] mb-2">
            Registered Users
          </h3>
          <p className="text-2xl font-bold text-gray-800">1,024</p>
        </div>
      </div>

      <div className="bg-white shadow-md p-6 rounded-xl">
        <h2 className="text-xl font-semibold text-[#07484A] mb-4">
          Recent Activities
        </h2>
        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          <li>New category “Furniture” added</li>
          <li>Product “Wooden Chair” updated</li>
          <li>User “John Doe” registered</li>
        </ul>
      </div>
    </div>
  );
};

export default MainContent;
