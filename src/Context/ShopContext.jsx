import { createContext, useState, useEffect } from "react";

export const ShopContext = createContext();

const ShopProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Fetch Products from API
  useEffect(() => {
    let apiURL = "https://dummyjson.com/products";
    if (category !== "all") apiURL = `https://dummyjson.com/products/category/${category}`;

    fetch(apiURL)
      .then(res => res.json())
      .then(data => setProducts(data.products));
  }, [category]);

  // Add to Cart
  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(cart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  // Add to Wishlist
  const addToWishlist = (product) => {
    if (!wishlist.some((item) => item.id === product.id)) {
      const updatedWishlist = [...wishlist, product];
      setWishlist(updatedWishlist);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    }
  };

  // Load Data from LocalStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist"));
    if (savedCart) setCart(savedCart);
    if (savedWishlist) setWishlist(savedWishlist);
  }, []);

  return (
    <ShopContext.Provider value={{ products, setCategory, cart, setCart, wishlist, setWishlist, addToCart, addToWishlist }}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopProvider;
