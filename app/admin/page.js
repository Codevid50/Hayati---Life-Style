"use client";
import React, { useState } from "react";

const Admin = () => {
  const [form, setForm] = useState({
    title: "",
    image: "",
    price: "",
    oldPrice: "",
    discount: "",
    rating: "",
    desc: "",
    briefDesc: "",
    category: "",
    type: "",
    sizes: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Convert numeric fields properly
    if (name === "price" || name === "oldPrice" || name === "rating") {
      setForm({ ...form, [name]: value === "" ? "" : Number(value) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      sizes: form.sizes.split(",").map((s) => s.trim()), // convert comma-separated sizes to array
    };

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setMessage(data.message);

      if (data.success) {
        setForm({
          title: "",
          image: "",
          price: "",
          oldPrice: "",
          discount: "",
          rating: "",
          desc: "",
          briefDesc: "",
          category: "",
          type: "",
          sizes: "",
        });
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">🛍 Add New Product</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-4 bg-white p-6 rounded-lg shadow-md"
      >
        <input
          type="text"
          name="title"
          placeholder="Product Title - T-shirt, Shirt, Kurti "
          value={form.title}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        {/* Price Fields */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            name="oldPrice"
            placeholder="Old Price"
            value={form.oldPrice}
            onChange={handleChange}
            className="border p-2 rounded"
          />
        </div>

        <input
          type="text"
          name="discount"
          placeholder="Discount (e.g. 30% OFF)"
          value={form.discount}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="number"
          step="0.1"
          name="rating"
          placeholder="Rating (e.g. 4.5)"
          value={form.rating}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <textarea
          name="desc"
          placeholder="Product Description"
          value={form.desc}
          onChange={handleChange}
          className="border p-2 rounded"
        ></textarea>

        <textarea
          name="briefDesc"
          placeholder="Product Brief Description"
          value={form.briefDesc}
          onChange={handleChange}
          className="border p-2 rounded"
        ></textarea>

        {/* Category */}
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">Select Category</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
        </select>

        {/* Type */}
        <input
          type="text"
          name="type"
          placeholder="Product Type (e.g. T-Shirt, Hoodie)"
          value={form.type}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        {/* Sizes */}
        <input
          type="text"
          name="sizes"
          placeholder="Available Sizes (comma separated, e.g. S, M, L, XL)"
          value={form.sizes}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
        >
          Add Product
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center font-semibold text-green-600">
          {message}
        </p>
      )}
    </div>
  );
};

export default Admin;
