import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart, setCart } = useContext(ShopContext);

  // Increase Quantity
  const increaseQuantity = (id) => {
    setCart(cart.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  };

  // Decrease Quantity
  const decreaseQuantity = (id) => {
    setCart(cart.map(item => item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item));
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="border p-4 rounded mb-2 flex justify-between">
                <div>
                  <h2 className="font-bold">{item.title}</h2>
                  <p>${item.price} x {item.quantity}</p>
                  <div>
                    <button onClick={() => decreaseQuantity(item.id)} className="px-2 bg-gray-300">-</button>
                    <span className="px-4">{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)} className="px-2 bg-gray-300">+</button>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="bg-red-500 text-white px-4 py-2 rounded">
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <h2 className="text-lg font-bold mt-4">Total: ${totalPrice.toFixed(2)}</h2>

          <Link to="/checkout">
            <button className="mt-4 bg-green-500 text-white px-6 py-2 rounded">
              Proceed to Checkout
            </button>
          </Link>
        </>
      )}
    </div>
  );
};

export default CartPage;
