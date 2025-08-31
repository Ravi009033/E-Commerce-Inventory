import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles.css";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/users/USER123/orders").then(res => setOrders(res.data));
  }, []);

  return (
    <div className="container">
      <h2 className="page-title">Order History</h2>
      {orders.length === 0 ? (
        <p className="empty">No orders found.</p>
      ) : (
        <ul className="order-list">
          {orders.map(order => (
            <li key={order._id} className="order-card">
              <div>
                <p className="order-id">Order #{order._id.slice(-5)}</p>
                <p>Total: ₹{order.total}</p>
              </div>
              <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
