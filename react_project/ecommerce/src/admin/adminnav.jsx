import React from "react";

const AdminNavbar = () => {
  return (
    <div className="w-full h-[10vh] bg-white shadow-md flex items-center justify-between  p-8 top-0 left-[280px] z-10">
      <h2 className="text-xl font-semibold text-[#07484A]">Dashboard</h2>

      <div className="flex items-center gap-6">
        <span className="text-gray-700">Welcome, Admin</span>
        <button className="bg-[#07484A] text-white px-4 py-2 rounded-lg hover:bg-[#096c6e] transition-all duration-200">
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminNavbar;
