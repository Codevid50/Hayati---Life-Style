# TODO: Make Navbar Search Bar Functional with Live Search

- [x] Update app/api/products/route.js to accept a 'search' query parameter and filter products where the title matches the search term (case-insensitive).
- [x] In app/components/Navbar.js, add state for search query, search results, and dropdown visibility.
- [x] In app/components/Navbar.js, on input change, update the query and fetch results from /api/products?search=query.
- [x] In app/components/Navbar.js, display matching products in a dropdown below the search bar, with links to individual product pages.
- [x] In app/components/Navbar.js, add logic to hide the dropdown when clicking outside or selecting a result.
- [x] Make the search bar responsive (removed hidden md:flex).
- [x] Optimize search bar width and dropdown styling for mobile (smaller width, better spacing, truncate text).
- [x] Hide Hayati logo on men and women pages only on phones (hidden md:flex).
- [ ] Test the search by typing in the navbar and verifying results appear.
- [ ] Ensure the search works on both desktop and mobile.
