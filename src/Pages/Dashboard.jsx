import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { Link, useNavigate } from "react-router-dom";
import shop from "../assets/image/shopping.png"
import cart from "../assets/image/84.png"
import profile from "../assets/image/Contact.png"

const Dashboard = () => {
  const { products, setCategory } = useContext(ShopContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  // Fetch categories from DummyJSON API
  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          setCategories([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setCategories([]);
      });
  }, []);

  // Filter Products based on search
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
      navigate("/login");
    } else {
      setUser(loggedInUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    alert("Logged out!");
    navigate("/login");
  };

  if (!user) return null;

  // Define main categories to show directly
  const mainCategories = ["all", "mens-shirts", "womens-dresses", "smartphones", "laptops"];
  const otherCategories = categories.filter(cat => !mainCategories.includes(cat));

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
        {/* Left Side - Profile */}
        <div className="relative">
          <button onClick={() => setShowProfile(!showProfile)} className="flex items-center gap-2">
            {/* <FaUserCircle size={24} /> */}
            <img className="w-10" src={profile} alt="" />
          </button>
          {showProfile && (
            <div className="absolute left-0 mt-2 bg-white text-black p-4 rounded shadow-lg w-48">
              <p className="font-bold">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
              <button onClick={() => setShowProfile(false)} className="mt-2 text-blue-500 underline">Close</button>
            </div>
          )}
        </div>

        {/* Middle - Categories */}
        <div className="flex gap-4">
          {mainCategories.map((category, index) => (
            <button 
              key={index} 
              className="text-white hover:text-gray-300"
              onClick={() => setCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
          {/* More Dropdown */}
          {otherCategories.length > 0 && (
            <div className="relative">
              <button onClick={() => setShowMore(!showMore)} className="text-blue-400">
                More ▼
              </button>
              {showMore && (
                <ul className="absolute left-0 mt-2 bg-gray-800 p-2 rounded shadow-lg w-48">
                  {otherCategories.map((category, index) => (
                    <li 
                      key={index} 
                      className="cursor-pointer p-2 hover:bg-gray-700 rounded text-white"
                      onClick={() => {
                        setCategory(category.slug);
                        setShowMore(false);
                      }}
                    >
                      {category.slug}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Right Side - Cart, Wishlist, Logout */}
        <div className="flex gap-4">
          <Link to="/wishlist" className="flex items-center gap-1">
            <img className="w-10" src={shop} alt="" />
             Wishlist
          </Link>
          <Link to="/cart" className="flex items-center gap-1">
          <img className="w-10" src={cart} alt="" />
            Cart
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-1 text-red-500">
            {/* <FaSignOutAlt size={20} /> */}
             Logout
          </button>
        </div>
      </nav>

      {/* Search Bar */}
      <div className="p-4 flex justify-center">
        <input
          type="text"
          placeholder="Search products..."
          className="border p-2 rounded w-1/2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Product Listing */}
      <div className="p-6 grid grid-cols-4 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="border p-4 rounded shadow-lg">
              <img src={product.thumbnail} alt={product.title} className="w-full h-40 object-cover" />
              <h2 className="text-lg font-bold">{product.title}</h2>
              <p className="text-sm">{product.description.substring(0, 50)}...</p>
              <p className="font-bold">${product.price}</p>
              <Link to={`/product/${product.id}`} className="text-blue-500">View Details</Link>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
