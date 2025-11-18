"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import LoginModal from "./LoginModal";
import Link from "next/link";

// Debounce utility function
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null);

  // Check if on men or women page
  const isMenOrWomenPage = pathname === "/men" || pathname === "/women";

  // Debounced search function
  const debouncedSearch = useCallback(() => {
    const query = searchQuery;
    if (query.trim() === "") {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    fetch(`/api/products?search=${encodeURIComponent(query)}`)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setSearchResults(data.products.slice(0, 5)); // Limit to 5 results
          setShowDropdown(true);
        }
      })
      .catch(error => {
        console.error("Error fetching search results:", error);
      });
  }, [searchQuery]);

  const debouncedSearchHandler = useCallback(
    debounce(debouncedSearch, 300),
    [debouncedSearch]
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  // Hide dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="w-full bg-white shadow-sm px-4 md:px-10 h-[60px] flex items-center justify-between fixed top-0 left-0 z-40">
        <div className="flex items-center">
        {/* Logo */}
        <Link href="/">
        <div className={`flex items-center ${isMenOrWomenPage ? 'hidden md:flex' : ''}`}>
          <img src="/hayati-high-resolution-logo.png" alt="Logo" className="w-[120px] sm:w-[150px] rounded-lg mx-2 sm:mx-4 h-10 sm:h-13 object-cover cursor-pointer" />
           </div>
        </Link>

        <ul className="hidden sm:flex mx-3">
         <Link href={"/men"}> <li className="mx-4 font-bold text-base sm:text-lg">MEN</li> </Link>
         <Link href={"/women"}> <li className="mx-4 font-bold text-base sm:text-lg">WOMEN</li> </Link>
        </ul>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2 md:gap-4">

          {/* Search Bar */}
          <div ref={searchRef} className="flex items-center bg-gray-200 rounded-md px-3 py-2 w-[180px] sm:w-[220px] md:w-[250px] relative">
            <input
              className="bg-transparent outline-none text-sm w-full"
              type="text"
              placeholder="Search by products"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {showDropdown && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto w-full">
                {searchResults.map((product) => (
                  <Link
                    key={product._id}
                    href={`/product/${product._id}`}
                    onClick={() => setShowDropdown(false)}
                    className="block px-3 py-2 hover:bg-gray-100 text-sm"
                  >
                    <div className="flex items-center">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-8 h-8 object-cover mr-3 rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{product.title}</div>
                        <div className="text-gray-500 text-xs">₹{product.price}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Login / Logout */}
          {session ? (
            <div className="flex items-center gap-3">
              <img
                src={session.user?.image || "/user.png"}
                className="w-8 h-8 rounded-full border cursor-pointer"
                alt="User"
              />
              <button onClick={() => signOut()} className="text-sm font-semibold">
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => setOpen(true)}
              className="text-sm font-semibold"
            >
              Login
            </button>
          )}

          {/* Icons */}
          <img src="/heart.svg" className="w-5 cursor-pointer" alt="Wishlist" />
          <Link href={'/cart'}>
          <img src="/bag.svg" className="w-5 cursor-pointer" alt="Cart" />
          </Link>
        </div>
      </nav>

      {open && <LoginModal onClose={() => setOpen(false)} />}
    </>
  );
}
