import { div } from "framer-motion/client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) setUser(loggedInUser);
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    alert("Logged out!");
    navigate("/login");
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">User Profile</h1>
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
        </div>
      ) : (
        <div>
          <p>User not found, please login</p>
          <button onClick={() => navigate("/login")} className="bg-blue-500 text-white px-4 py-2 rounded">
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
