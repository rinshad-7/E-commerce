import React, { useEffect, useState } from "react";
import api from "../api/api.jsx";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  // ADD STATES
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // EDIT STATES
  const [editId, setEditId] = useState("");
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editImage, setEditImage] = useState(null);
  const [editPreview, setEditPreview] = useState(null);

  // FETCH PRODUCTS
  const getProducts = async () => {
    try {
      const res = await api.get("/admin/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // FETCH CATEGORIES
  const getCategories = async () => {
    try {
      const res = await api.get("/admin/category");
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  // ADD IMAGE HANDLER
  const handleAddImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // EDIT IMAGE HANDLER
  const handleEditImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditImage(file);
      setEditPreview(URL.createObjectURL(file));
    }
  };

  // ADD PRODUCT
  const handleAddProduct = async () => {
    if (!name || !description || !price || !category) {
      return alert("All fields required!");
    }

    const form = new FormData();
    form.append("name", name);
    form.append("description", description);
    form.append("price", price);
    form.append("category", category);
    if (productImage) form.append("productImage", productImage);

    try {
      await api.post("/admin/products", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Product added successfully!");
      setShowAdd(false);
      setName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setProductImage(null);
      setImagePreview(null);
      getProducts();
    } catch (err) {
      console.log(err);
      alert("Error adding product");
    }
  };

  // OPEN EDIT MODAL
  const openEdit = (p) => {
    setEditId(p._id);
    setEditName(p.name);
    setEditDescription(p.description);
    setEditPrice(p.price);
    setEditCategory(p.category?._id || "");
    setEditPreview(
      p.productImage
        ? `http://localhost:3000/productImages/${p.productImage}`
        : null
    );
    setEditImage(null); // reset file input
    setShowEdit(true);
  };

  // EDIT PRODUCT
  const handleEditProduct = async () => {
    if (!editName || !editDescription || !editPrice || !editCategory) {
      return alert("All fields required!");
    }

    const formedit = new FormData();
    formedit.append("name", editName);
    formedit.append("description", editDescription);
    formedit.append("price", editPrice);
    formedit.append("category", editCategory);
    if (editImage) formedit.append("productImage", editImage);

    try {
      await api.put(`/admin/products/${editId}`, formedit, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Product Updated!");
      setShowEdit(false);
      getProducts();
    } catch (err) {
      console.log(err);
      alert("Error updating product");
    }
  };

  // DELETE PRODUCT
  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await api.delete(`/admin/products/${id}`);
      getProducts();
    } catch (err) {
      console.log(err);
      alert("Error deleting product");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-[#07484A] mb-5">Products</h1>

      <button
        onClick={() => setShowAdd(true)}
        className="bg-[#07484A] text-white px-4 py-2 rounded hover:bg-[#063738] transition"
      >
        Add Product
      </button>

      {/* TABLE */}
      <table className="w-full mt-5 border-collapse border border-gray-300">
        <thead className="bg-[#07484A] text-white">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id} className="border text-center hover:bg-gray-50 transition">
              <td className="p-2 border">{p.name}</td>
              <td className="p-2 border">{p.category?.name}</td>
              <td className="p-2 border">{p.price}</td>
              <td className="p-2 border flex justify-center items-center">
                {p.productImage ? (
                  <img
                    className="w-24 h-24 object-cover rounded-lg border"
                    src={`http://localhost:3000/productImages/${p.productImage}`}
                    alt={p.name}
                  />
                ) : (
                  <div className="w-24 h-24 flex items-center justify-center bg-gray-100 text-gray-400 rounded-lg border">
                    No Image
                  </div>
                )}
              </td>
              <td className="p-2 border">
                <div className="flex flex-col gap-2 items-center justify-center">
                  <button
                    onClick={() => openEdit(p)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition w-20"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(p._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition w-20"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ADD PRODUCT MODAL */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded w-[400px]">
            <h2 className="text-xl font-bold mb-4">Add Product</h2>
            <input
              className="border p-2 mb-2 w-full"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <textarea
              className="border p-2 mb-2 w-full"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              className="border p-2 mb-2 w-full"
              placeholder="Price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <select
              className="border p-2 mb-2 w-full"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
            <input type="file" onChange={handleAddImage} />
            {imagePreview && (
              <img src={imagePreview} className="w-24 h-24 mt-2 object-cover rounded" />
            )}
            <button
              className="bg-green-600 mt-3 text-white w-full p-2 rounded hover:bg-green-700 transition"
              onClick={handleAddProduct}
            >
              Add
            </button>
            <button
              className="bg-red-600 mt-2 text-white w-full p-2 rounded hover:bg-red-700 transition"
              onClick={() => setShowAdd(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* EDIT PRODUCT MODAL */}
      {showEdit && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded w-[400px]">
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>
            <input
              className="border p-2 mb-2 w-full"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
            <textarea
              className="border p-2 mb-2 w-full"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            />
            <input
              className="border p-2 mb-2 w-full"
              type="number"
              value={editPrice}
              onChange={(e) => setEditPrice(e.target.value)}
            />
            <select
              className="border p-2 mb-2 w-full"
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
            <input type="file" onChange={handleEditImage} />
            {editPreview && (
              <img
                src={editPreview}
                className="w-24 h-24 mt-2 object-cover rounded"
              />
            )}
            <button
              className="bg-blue-600 mt-3 text-white w-full p-2 rounded hover:bg-blue-700 transition"
              onClick={handleEditProduct}
            >
              Save
            </button>
            <button
              className="bg-red-600 mt-2 text-white w-full p-2 rounded hover:bg-red-700 transition"
              onClick={() => setShowEdit(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductPage;
