import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import Dashboard from "../Pages/Dashboard";
import ProductDetail from "../Pages/ProductDetails";
import CartPage from "../Pages/CartPage";
import Checkout from "../Pages/Checkout";

const AppRoutes = () => {
  const isAuthenticated = localStorage.getItem("loggedInUser");
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/dashboard" />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
