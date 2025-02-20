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
  const [loginUser, setloginUser] = useState('')
  const navigate = useNavigate();
  const login = localStorage.getItem("login");
 
  
  // Fetch categories from DummyJSON API
  useEffect(() => {
    setloginUser(login);
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

//  if(loginUser){
//   localStorage.removeItem("login");
//  }
//  else{
//   setloginUser(login);
//  }

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
      
    } else {
      setUser(loggedInUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("login");
    alert("Logged out!");
    // navigate("/login");
    setloginUser('');
  };
 
  const handleLogIn = ()=>{
    navigate("/login");
  }
  // if (!user) return null;

  // Define main categories to show directly
  const mainCategories = ["all", "mens-shirts", "womens-dresses", "smartphones", "laptops"];
  const otherCategories = categories.filter(cat => !mainCategories.includes(cat));

  return (
    <div className="flex flex-col min-h-screen bg-gray-300   ">

{/* header */}
<div className="p-3 flex justify-between px-20  bg-blue-200 ">
 <div className="w-12 h-12 rounded-full mr-10 overflow-hidden " >
  <img className="w-full h-full " src="https://cdn.dribbble.com/userupload/17039932/file/original-983633d1f6de58f5d871f174ff34f057.jpg?resize=400x0" alt="" />

 </div>

{/* Search Bar */}
<div className="relative w-[50vw]">
  <i className="ri-search-line absolute  text-lg left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
  <input
    type="text"
    placeholder="Search products..."
    className="border p-2 pl-10 rounded-xl bg-cyan-100 w-full focus:outline-none focus:ring-0 focus:border-transparent"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />
</div>

{/* login */}
<div className="flex gap-8">
          <Link to="/wishlist" className="flex text-lg items-center gap-1">
            <img className="w-10" src={shop} alt="" />
             Wishlist
          </Link>
          <Link to="/cart" className="flex text-lg items-center gap-1">
          <img className="w-10" src={cart} alt="" />
            Cart
          </Link>
          {loginUser ? <button onClick={handleLogout} className=" text-lg px-4 rounded-xl bg-red-300 items-center  ">
            
             Logout
          </button> : <button onClick={handleLogIn} className=" text-lg px-10 rounded-xl bg-white items-center  ">
            {/* <FaSignOutAlt size={20} /> */}
             Login
          </button>}
          
        </div>


        
 </div>


      {/* Navbar */}
      <nav className=" mt-2 bg-white  m-2 text-black rounded-lg p-4 flex justify-between items-center">
        {/* Left Side - Profile */}
        <div className="relative">
          <Link to={"/profile"} className="flex items-center gap-2">
            {/* <FaUserCircle size={24} /> */}
            <img className="w-10" src={profile} alt="" />
          </Link>
          
        </div>

        {/* Middle - Categories */}
        <div className="flex gap-4  ">
          {mainCategories.map((category, index) => (
           <div >
             <button 
              key={index} 
              className="text-black text-lg hover:text-gray-600 mr-20"
              onClick={() => setCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
           </div>
          ))}
          {/* More Dropdown */}
          {otherCategories.length > 0 && (
            <div className="relative mr-10"
            onMouseEnter={() => setShowMore(true)} 
             onMouseLeave={() => setShowMore(false)}
            >
              
              <button 
               className="text-blue-400 text-lg">
                More ▼
              </button>
              {showMore && (
               <ul className="absolute left-[-10vh]  bg-gray-800 p-2 rounded shadow-lg w-48 max-h-52 overflow-y-auto scrollbar-hide"
               style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
               >
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
      </nav>

      
      {/* Product Listing */}
      <div className="p-6 grid grid-cols-5 gap-5 bg-gray-300 ">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="border w-[37vh] h-[45vh] p-2 bg-white rounded-xl shadow-lg">
              <div className="w-[25vh] h-[20vh] ml-6 " >
              <img src={product.thumbnail} alt={product.title} className="w-full h-full  object-fill " />
              </div>
              <h2 className="text-lg font-bold">{product.title}</h2>
              <p className="text-sm">{product.description.substring(0, 50)}...</p>
              <p className="font-bold">${product.price}</p>
              <Link to={`/product/${product.id}`} className="text-blue-500">View Details</Link>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>


    </div>
  );
};

export default Dashboard;
