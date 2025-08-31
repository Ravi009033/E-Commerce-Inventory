import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import api from "../services/api";
import "../styles.css";

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    try {
      const res = await api.post("/orders", {
        user_id: "USER123",
        items: cart.map(item => ({ product_id: item._id, quantity: item.quantity }))
      });
      alert("Order placed successfully! ID: " + res.data.order._id);
      clearCart();
    } catch (err) {
      alert("Error: " + err.response?.data?.message);
    }
  };

  return (
    <div className="container">
      <h2 className="page-title">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="empty">Your cart is empty.</p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>₹{item.price * item.quantity}</td>
                  <td>
                    <button className="btn danger" onClick={() => removeFromCart(item._id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="cart-actions">
            <button className="btn secondary" onClick={clearCart}>Clear Cart</button>
            <button className="btn success" onClick={handleCheckout}>Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}
