import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">E-Commerce</h1>
      <div className="flex gap-4">
        <Link to="/wishlist">❤️ Wishlist</Link>
        <Link to="/cart">🛒 Cart</Link>
        <Link to="/profile">👤 Profile</Link>
      </div>
    </nav>
  );
};

export default Navbar;
