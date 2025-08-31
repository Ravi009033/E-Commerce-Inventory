import { Link } from "react-router-dom";
import "../styles.css";

export default function Layout({ children }) {
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">🛍 E-Commerce</h2>
        <nav>
          <ul>
            <li><Link to="/">Products</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/orders">Orders</Link></li>
          </ul>
        </nav>
      </aside>

      {/* Main Area */}
      <div className="main">
        {/* Topbar */}
        <header className="topbar">
          <span>Welcome, <strong>User123</strong></span>
        </header>

        {/* Content */}
        <main className="content">
          {children}
        </main>
      </div>
    </div>
  );
}
