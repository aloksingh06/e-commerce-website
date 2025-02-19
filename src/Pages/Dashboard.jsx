import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { products, setCategory } = useContext(ShopContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);
  const [showMore, setShowMore] = useState(false);
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
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white h-screen p-6">
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        <ul>
          {mainCategories.map((category, index) => (
            <li 
              key={index} 
              className="cursor-pointer mb-2"
              onClick={() => setCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </li>
          ))}

          {/* More Dropdown */}
          {otherCategories.length > 0 && (
            <li className="cursor-pointer mb-2 relative">
              <button onClick={() => setShowMore(!showMore)} className="text-blue-400">
                More ▼
              </button>
              {showMore && (
                <ul className="absolute left-0 mt-2 bg-gray-800 p-2 rounded shadow-lg">
                  {otherCategories.map((category, index) => (
                    <li 
                      key={index} 
                      className="cursor-pointer p-2 hover:bg-gray-700 rounded"
                      onClick={() => {
                        setCategory(category);
                        setShowMore(false);
                      }}
                    >
                      {category.slug}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )}
        </ul>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Navbar */}
        <header className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Search products..."
            className="border p-2 rounded w-1/2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="flex gap-4">
            <Link to="/wishlist" className="bg-pink-500 text-white px-4 py-2 rounded">❤️ Wishlist</Link>
            <Link to="/cart" className="bg-blue-500 text-white px-4 py-2 rounded">🛒 Cart</Link>
          </div>
        </header>

        {/* Product Listing */}
        <div className="grid grid-cols-4 gap-4">
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
        <button onClick={handleLogout} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;
