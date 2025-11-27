import React, { useEffect, useState } from "react";
import api from "../api/api.jsx"; // your axios instance or API helper

function AdminGetUsers() {
  const [users, setUsers] = useState([]);

  // Fetch users from backend
  const getUsers = async () => {
    try {
      const res = await api.get("/admin/users"); // matches your backend route
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // Delete user function (optional)
  const deleteUser = async (id) => {
    try {
      await api.delete(`/admin/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-5 text-[#07484A]">Users</h1>

      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-[#07484A] text-white">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
          </tr>
        </thead>

        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id} className="border text-center hover:bg-gray-50 transition">
                <td className="p-2 border">{user.username}</td>
                <td className="p-2 border">{user.Email}</td>
                <td className="p-2 border">{user.role}</td>
                
                 
              
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="p-4 text-center text-gray-500">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminGetUsers;
