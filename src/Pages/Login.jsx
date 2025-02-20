import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Get stored users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Find the matching user
    const loggedInUser = storedUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (loggedInUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
      alert("Login Successful!");
      navigate("/dashboard");
      
    } else {
      alert("Invalid Credentials! Please check your email and password.");
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-300">
      <div className="bg-white p-7 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" className="w-full rounded-lg p-2 mb-2 border" required
            onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" className="w-full rounded-lg p-2 mb-2 border" required
            onChange={(e) => setPassword(e.target.value)} />
          <motion.button
          whileTap={{scale:0.9}}
          transition={{ duration: 0.1, ease: "easeInOut" }}
          type="submit" className="w-full bg-green-500 text-white p-2 rounded-lg">Login</motion.button>
        </form>
        <p className="mt-4 text-center text-sm">
          Don't have an account? <Link to="/register" className="text-green-500">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
