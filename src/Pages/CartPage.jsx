import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart, setCart } = useContext(ShopContext);

  // Increase Quantity
  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease Quantity
  const decreaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Calculate total price
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-xl text-center">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex flex-col md:flex-row items-center bg-white p-4 rounded-lg shadow-md"
              >
                {/* Product Image */}
                <div className="w-full md:w-1/5 flex justify-center mb-4 md:mb-0">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded"
                  />
                </div>
                {/* Product Details */}
                <div className="w-full md:w-3/5 px-4">
                  <h2 className="text-xl font-bold">{item.title}</h2>
                  {item.description && (
                    <p className="text-gray-600 text-sm mb-2">
                      {item.description.substring(0, 70)}...
                    </p>
                  )}
                  <p className="font-semibold">
                    Price: ${item.price} x {item.quantity}
                  </p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="px-3 py-1 bg-gray-300 rounded-l hover:bg-gray-400 transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 border-t border-b">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="px-3 py-1 bg-gray-300 rounded-r hover:bg-gray-400 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
                {/* Remove Button */}
                <div className="w-full md:w-1/5 flex justify-center md:justify-end mt-4 md:mt-0">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Total Price & Checkout Button */}
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold">
              Total: ${totalPrice.toFixed(2)}
            </h2>
            <Link to="/checkout">
              <button className="mt-4 bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg transition-colors">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
