import { useContext, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, setCart } = useContext(ShopContext);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({ name: "", address: "", phone: "" });

  const handlePayment = async () => {
    if (!userInfo.name || !userInfo.address || !userInfo.phone) {
      alert("Please fill all details!");
      return;
    }

    const options = {
      key: "YOUR_RAZORPAY_KEY",
      amount: cart.reduce((total, item) => total + item.price * item.quantity, 0) * 100, // Amount in paisa
      currency: "INR",
      name: "E-Commerce Store",
      description: "Purchase Products",
      handler: function (response) {
        alert("Payment Successful! Order ID: " + response.razorpay_payment_id);

        // Save order in localStorage (Order History)
        const orders = JSON.parse(localStorage.getItem("orders")) || [];
        orders.push({ user: userInfo, cart, date: new Date().toLocaleString() });
        localStorage.setItem("orders", JSON.stringify(orders));

        // Empty cart after checkout
        setCart([]);
        navigate("/dashboard");
      },
      prefill: {
        name: userInfo.name,
        email: "test@example.com",
        contact: userInfo.phone,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Checkout</h1>
      <input type="text" placeholder="Full Name" className="w-full p-2 mb-2 border"
        onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })} />
      <input type="text" placeholder="Shipping Address" className="w-full p-2 mb-2 border"
        onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })} />
      <input type="text" placeholder="Phone Number" className="w-full p-2 mb-2 border"
        onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })} />
      <button onClick={handlePayment} className="w-full bg-blue-500 text-white p-2 rounded">Pay with Razorpay</button>
    </div>
  );
};

export default Checkout;
