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

  // Default image if user.profileImage is not available
  const profileImage =
    user && user.profileImage
      ? user.profileImage
      : "https://via.placeholder.com/150";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">User Profile</h1>
        {user ? (
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
              <img
                src="https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full text-center">
              <p className="text-xl font-semibold mb-2">Name: {user.name}</p>
              <p className="text-gray-600 mb-4">Email: {user.email}</p>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-xl mb-4">User not found, please login.</p>
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded transition-colors"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
