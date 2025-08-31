import { useEffect, useState, useContext } from "react";
import api from "../services/api";
import { CartContext } from "../context/CartContext";
import "../styles.css";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    // Fetch products from backend
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products"); 
        setProducts(response.data);  // update state
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();

    // Fetch categories from backend
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories"); 
        setCategories(response.data);  // update state
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchCategories();

  }, []);


  // Apply search + filter
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    // handles both cases id is object or string
    const productCategoryId = typeof p.category_id === "object" ? p.category_id._id : p.category_id;
    const matchesFilter = filter ? productCategoryId === filter : true;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="container">
      <h2 className="page-title">Product Catalog</h2>

      {/* Search + Filter Controls */}
      <div className="controls">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map(c => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid">
        {filteredProducts.map(p => (
          <div key={p._id} className="card">
            <h3>{p.name}</h3>
            <p className="price">₹{p.price}</p>
            <p>Stock: {p.stock_quantity}</p>

            {/* Stock Status */}
            {p.stock_quantity === 0 ? (
              <p className="out">Out of Stock</p>
            ) : p.stock_quantity < 10 ? (
              <p className="low">Low Stock</p>
            ) : (
              <p className="in">In Stock</p>
            )}

            <button
              className="btn"
              onClick={() => addToCart(p)}
              disabled={p.stock_quantity === 0}
            >
              {p.stock_quantity === 0 ? "Unavailable" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
