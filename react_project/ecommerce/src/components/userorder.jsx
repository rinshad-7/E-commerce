import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

function OrderDetails() {
  const { id } = useParams(); // getting order id from URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await api.get(`/order`);
        console.log(res);
        
        setOrder(res.data);
        setLoading(false);
      } catch (err) {
        setError("Order not found");
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;

  if (error)
    return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-[#07484A] mb-4">
        Order Details
      </h1>

    {order.map((o, index) => (
  <div key={index} className="mb-6">

    <p>
      <span className="font-semibold">Order ID:</span> {o._id}
    </p>

    <p>
      <span className="font-semibold">Order Date:</span>{" "}
      {new Date(o.createdAt).toLocaleString()}
    </p>

    <p>
      <span className="font-semibold">Status:</span>
      <span className="ml-2 px-3 py-1 rounded bg-green-100 text-green-700">
        {o.orderStatus}
      </span>
    </p>

    {/* PRODUCTS */}
    <div className="mt-4">
      <h3 className="font-bold text-lg">Items</h3>

      {o.items.map((item, i) => (
        <div key={i} className="border p-3 rounded mt-2 flex justify-between">
          <div>
            <p className="font-semibold">{item.productName}</p>
            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
          </div>
          <p className="font-semibold">₹{item.price}</p>
        </div>
      ))}
    </div>

    {/* TOTAL */}
    <div className="mt-4 p-3 bg-gray-100 rounded">
      <p className="font-bold">Total: ₹{o.totalAmount}</p>
    </div>

  </div>
))}


      {/* Product List */}
      <h2 className="text-xl font-bold mb-3">Products</h2>

      <div className="space-y-4">
        {order.items?.map((item, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
            </div>
            <p className="font-semibold">₹{item.price}</p>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <p className="text-lg font-bold">
          Total Amount: ₹{order.totalPrice}
        </p>
      </div>
    </div>
  );
}

export default OrderDetails;
