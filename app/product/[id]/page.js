"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

async function getProduct(id) {
  const res = await fetch(`/api/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch product");

  return res.json();
}

export default function ProductPage({ params }) {
  const { data: session } = useSession();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchProduct() {
      try {
        const { id } = await params;
        const data = await getProduct(id);
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [params]);

  const handleAddToCart = async () => {
    if (!session) {
      setMessage("Please log in to add items to cart.");
      return;
    }

    if (!selectedSize) {
      setMessage("Please select a size.");
      return;
    }

    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product._id,
          quantity: 1,
          size: selectedSize,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Item added to cart!");
      } else {
        setMessage(data.error || "Failed to add to cart.");
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      setMessage("Something went wrong.");
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!product) {
    return <div className="flex items-center justify-center min-h-screen">Product not found.</div>;
  }

  return (
    <>
      <div className="relative h-full w-full bg-neutral-900">
        <div className="absolute inset-0 bg-fuchsia-400 bg-size-[20px_20px] opacity-20 blur-[100px]"></div>
      </div>
      <div className="w-[90vw] sm:w-[80vw] mx-auto p-4 my-20 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="">
          <img
            src={product.image}
            alt={product.title}
            className="w-full max-w-[432px] h-auto rounded"
          />
          <h1 className="text-xl sm:text-2xl font-bold mt-4">{product.title}</h1>
          <h3 className="text-base sm:text-lg font-semibold">₹{product.price}</h3>
          <p className="text-gray-600 text-sm sm:text-base">{product.desc}</p>
        </div>

        <div>
          <h1 className="text-2xl sm:text-4xl font-bold">{product.title}</h1>
          <span className="text-base sm:text-lg text-gray-500 font-semibold">
            {product.briefDesc ? ` ${product.briefDesc}` : ""}
          </span>

          {/* Size Selection */}
          <div className="my-4">
            <h3 className="text-lg font-semibold mb-2">Select Size:</h3>
            <div className="flex gap-2">
              {product.sizes?.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded ${
                    selectedSize === size
                      ? "bg-yellow-400 text-black"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div>
            <button
              onClick={handleAddToCart}
              className="cursor-pointer bg-amber-400 flex flex-row py-2 px-4 rounded-xl text-lg font-bold my-4 hover:bg-amber-500 transition"
            >
              Add To Cart <img className="mx-2" src="/bag.svg" alt="" />
            </button>
          </div>

          {message && (
            <p className={`mt-2 text-sm ${message.includes("added") ? "text-green-600" : "text-red-600"}`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
