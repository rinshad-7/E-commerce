import React, { useEffect, useState } from "react";
import api from "../api/api.jsx";

function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  // Add category states
  const [name, setName] = useState("");
  const [description, setdescription] = useState("");

  // Edit category states
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editdescription, seteditdescription] = useState("");

  // Fetch categories
  async function getCategories() {
    const res = await api.get("/admin/category");
    setCategories(res.data);
  }

  useEffect(() => {
    getCategories();
  }, []);

  // Add category handler
  const handleAddCategory = async () => {
    if (!name || !description) return;

    try {
      await api.post("/admin/category", { name, description });
      alert("Category Added!");
      setShowAdd(false);
      setName("");
      setdescription("");
      getCategories();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete category
  const handleDeleteCategory = async (id) => {
    try {
      const result = await api.delete(`/admin/category/${id}`);
      if (!result.data.success) alert("Couldn't delete category");
      getCategories();
    } catch (err) {
      console.error(err);
    }
  };

  // Open edit modal
  const openEditModal = (cat) => {
    setEditId(cat._id);
    setEditName(cat.name);
    seteditdescription(cat.description || "");
    setShowEdit(true);
  };

  // Edit category handler
  const handleEditCategory = async () => {
    if (!editName || !editdescription) return;

    try {
      await api.put(`/admin/category/${editId}`, {
        name: editName,
        description: editdescription,
      });
      alert("Category Updated!");
      setShowEdit(false);
      setEditName("");
      seteditdescription("");
      getCategories();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-[#07484A] mb-6">Categories</h2>
      <button
        onClick={() => setShowAdd(true)}
        className="bg-[#07484A] text-white mb-4 rounded-md px-4 py-2"
      >
        Add
      </button>

      {/* Categories table */}
      <table className="min-w-full border border-gray-200 rounded-lg">
        <thead className="bg-[#07484A] text-white">
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Description</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat._id} className="border-t hover:bg-gray-100">
              <td className="px-4 py-2">{cat._id}</td>
              <td className="px-4 py-2">{cat.name}</td>
              <td className="px-4 py-2">{cat.description}</td>
              <td className="px-4 py-2 flex gap-2">
                <button
                  onClick={() => openEditModal(cat)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteCategory(cat._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ADD CATEGORY MODAL */}
      {showAdd && (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-semibold mb-6 text-gray-700">
              Add Category
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-gray-600 mb-1">Category Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2"
                />
              </div>

              <div>
                <label className="block text-gray-600 mb-1">Description</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setdescription(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2"
                />
              </div>

              <button
                type="button"
                onClick={handleAddCategory}
                className="w-full bg-blue-600 text-white py-2 rounded-lg"
              >
                Add Category
              </button>

              <button
                type="button"
                onClick={() => setShowAdd(false)}
                className="bg-red-500 text-white w-full py-2 rounded-lg mt-4"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT CATEGORY MODAL */}
      {showEdit && (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-semibold mb-6 text-gray-700">
              Edit Category
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-gray-600 mb-1">Category Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2"
                />
              </div>

              <div>
                <label className="block text-gray-600 mb-1">Description</label>
                <input
                  type="text"
                  value={editdescription}
                  onChange={(e) => seteditdescription(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2"
                />
              </div>

              <button
                type="button"
                onClick={handleEditCategory}
                className="w-full bg-blue-600 text-white py-2 rounded-lg"
              >
                Save Changes
              </button>

              <button
                type="button"
                onClick={() => setShowEdit(false)}
                className="bg-red-500 text-white w-full py-2 rounded-lg mt-4"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoriesPage;
