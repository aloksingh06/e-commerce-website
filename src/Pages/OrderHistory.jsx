import { useState, useEffect } from "react";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Order History</h1>
      {orders.length === 0 ? <p>No orders yet.</p> : (
        <ul>
          {orders.map((order, index) => (
            <li key={index} className="border p-4 rounded mb-2">
              <h2 className="font-bold">{order.user.name}</h2>
              <p>{order.user.address}</p>
              <p>{order.date}</p>
              <ul>
                {order.cart.map((item) => (
                  <li key={item.id}>{item.title} - ${item.price} x {item.quantity}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;
