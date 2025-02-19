import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // Check if email is already registered
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const isUserExists = storedUsers.some((u) => u.email === user.email);

    if (isUserExists) {
      alert("User already exists! Please login.");
      return;
    }

    // Save new user
    const updatedUsers = [...storedUsers, user];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    alert("Registration Successful!");
    navigate("/login");
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <form onSubmit={handleRegister}>
          <input type="text" placeholder="Name" className="w-full p-2 mb-2 border" required
            onChange={(e) => setUser({ ...user, name: e.target.value })} />
          <input type="email" placeholder="Email" className="w-full p-2 mb-2 border" required
            onChange={(e) => setUser({ ...user, email: e.target.value })} />
          <input type="password" placeholder="Password" className="w-full p-2 mb-2 border" required
            onChange={(e) => setUser({ ...user, password: e.target.value })} />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Register</button>
        </form>
        <p className="mt-4 text-center text-sm">
          Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
