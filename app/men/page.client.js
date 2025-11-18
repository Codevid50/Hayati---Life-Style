"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";


const Men = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);

  // ✅ Fetch products with pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(`/api/products?category=men&page=${currentPage}&limit=12`);
        const data = await res.json();
        if (data.success) {
          if (currentPage === 1) {
            setProducts(data.products);
          } else {
            setProducts(prev => [...prev, ...data.products]);
          }
          setPagination(data.pagination);
          setHasMore(data.pagination.hasNextPage);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [currentPage]);

  // ✅ Handle category filter
  const handleCategoryChange = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  // ✅ Handle size filter
  const handleSizeChange = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  // ✅ Filter Logic
  const filteredProducts = products.filter((p) => {
    const typeLower = p.type?.toLowerCase() || "";

    // ✅ If no filter is applied → show all products
    if (selectedCategories.length === 0 && selectedSizes.length === 0) {
      return true;
    }

    const categoryMatch =
      selectedCategories.length === 0 || selectedCategories.includes(typeLower);

    const sizeMatch =
      selectedSizes.length === 0 || selectedSizes.some((s) => p.sizes?.includes(s));

    return categoryMatch && sizeMatch;
  });

  // ✅ Loading Screen
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white text-gray-500">
        Loading products...
      </div>
    );
  }

  return (
    <>
      {/* 🔷 Shipping Banner */}
      <div className="shipping-banner flex items-center justify-center bg-[#207bb4] py-2 text-white text-sm font-semibold">
        <img className="mx-2 w-4 h-4" src="/truck.svg" alt="truck" />
        <span>FREE SHIPPING on all orders above ₹399</span>
      </div>

      {/* 🔶 Main Section */}
      <div className="flex flex-col pt-10 px-4 lg:px-12 gap-6">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">
              Clothes for Men{" "}
              <span className="text-gray-500 text-sm sm:text-base">
                {filteredProducts.length} Products
              </span>
            </h1>
          </div>
          <div className="border rounded-md px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 w-full sm:w-auto">
            <span className="text-gray-700">Sort by :</span>{" "}
            <strong>Popularity</strong>
          </div>
        </div>

        {/* Sidebar Filters */}
        <aside className="w-full border rounded-lg p-4 mb-6 bg-gray-50">
          <h2 className="font-semibold text-lg mb-4">Filters</h2>
          <hr className="mb-4" />

          <div className="flex flex-wrap gap-4">
            {/* ✅ Category Filter */}
            <div className="flex-1 min-w-[200px]">
              <h3 className="font-semibold mb-2">Category</h3>
              <div className="flex flex-wrap gap-2">
                {["t-shirt", "hoodies", "shirt", "joggers", "boxer"].map((cat) => (
                  <label key={cat} className="flex items-center space-x-2 mb-1">
                    <input
                      type="checkbox"
                      className="accent-yellow-600"
                      onChange={() => handleCategoryChange(cat)}
                      checked={selectedCategories.includes(cat)}
                    />
                    <span className="text-sm">{cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* ✅ Size Filter */}
            <div className="flex-1 min-w-[200px]">
              <h3 className="font-semibold mb-2">Sizes</h3>
              <div className="flex flex-wrap gap-2">
                {["XS", "S", "M", "L", "XL"].map((size) => (
                  <label key={size} className="flex items-center space-x-2 mb-1">
                    <input
                      type="checkbox"
                      className="accent-yellow-600"
                      onChange={() => handleSizeChange(size)}
                      checked={selectedSizes.includes(size)}
                    />
                    <span className="text-sm">{size}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* ✅ Product Section */}
        <main className="flex-1">
          {/* Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((p) => (
                <Link
                  key={p._id}
                  href={`/product/${p._id}`}
                  className="border rounded-xl overflow-hidden hover:shadow-lg transition duration-200 cursor-pointer relative group"
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-[340px] object-cover group-hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                  <div className="p-1 sm:p-3">
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span className="font-semibold truncate pr-1 text-xs sm:text-sm">{p.title}</span>
                      <div className="flex items-center space-x-1 flex-shrink-0">
                        <img src="/heart.svg" alt="star" className="w-3 h-3" />
                        <span className="text-xs">{p.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-500 text-xs mt-0.5 line-clamp-1 sm:line-clamp-2 sm:text-sm">{p.desc}</p>
                    <div className="flex items-center gap-0.5 mt-0.5 sm:gap-2 sm:mt-2">
                      <p className="font-bold text-xs sm:text-base">₹{p.price}</p>
                      {p.oldPrice && (
                        <p className="text-gray-400 line-through text-xs">₹{p.oldPrice}</p>
                      )}
                      <p className="text-green-600 text-xs font-semibold">
                        {p.discount}%
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center">
                No products found matching your filters.
              </p>
            )}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="bg-yellow-600 text-white px-6 py-2 rounded-md hover:bg-yellow-700 transition-colors"
              >
                Load More Products
              </button>
            </div>
          )}

        </main>
      </div>
    </>
  );
};

export default Men;
