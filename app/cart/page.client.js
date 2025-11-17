"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function CartPage() {
  const { data: session } = useSession();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (session) {
      fetchCart();
    } else {
      setLoading(false);
    }
  }, [session]);

  const fetchCart = async () => {
    try {
      const res = await fetch("/api/cart");
      const data = await res.json();
      if (res.ok) {
        setCartItems(data.items || []);
      } else {
        setMessage(data.error || "Failed to fetch cart");
      }
    } catch (error) {
      console.error("Fetch cart error:", error);
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId, size) => {
    try {
      const res = await fetch("/api/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, size }),
      });

      const data = await res.json();

      if (res.ok) {
        setCartItems(cartItems.filter(
          (item) => !(item.productId._id === productId && item.size === size)
        ));
        setMessage("Item removed from cart");
      } else {
        setMessage(data.error || "Failed to remove item");
      }
    } catch (error) {
      console.error("Remove from cart error:", error);
      setMessage("Something went wrong");
    }
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.productId.price * item.quantity),
    0
  );

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please login in to view your cart...</h1>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading cart...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 mt-20">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Your Cart</h1>

      {message && (
        <p className={`mb-4 text-sm ${message.includes("removed") ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}

      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <Link href="/men" className="bg-yellow-500 text-white px-4 py-2 rounded">
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={`${item.productId._id}-${item.size}`} className="flex flex-col sm:flex-row items-center border rounded-lg p-4 gap-4">
              <img
                src={item.productId.image}
                alt={item.productId.title}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-lg font-semibold">{item.productId.title}</h2>
                <p className="text-gray-600">Size: {item.size}</p>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
                <p className="font-bold">₹{item.productId.price * item.quantity}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.productId._id, item.size)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 w-full sm:w-auto"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold">Total: ₹{totalPrice}</span>
              <button className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
