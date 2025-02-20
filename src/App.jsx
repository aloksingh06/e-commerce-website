
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import ProductDetail from "./Pages/ProductDetails";
import CartPage from "./Pages/CartPage";
import Checkout from "./Pages/Checkout";
import Wishlist from "./Pages/Wishlist";
import Profile from "./Pages/Profile";

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  )
}

export default App;
