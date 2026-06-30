import { useEffect, useState } from "react";
import API from "../config/api";
import "../assets/css/inventory.css";

function Inventory() {
  const [history, setHistory] = useState([]);
  const [products, setProducts] = useState([]);

  const [summarySearch, setSummarySearch] = useState("");
  const [inSearch, setInSearch] = useState("");
  const [outSearch, setOutSearch] = useState("");

  const fetchInventory = async () => {
    try {
      const res = await API.get("/inventory", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setHistory(res.data.history);
      setProducts(res.data.products);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const totalIn = history
    .filter((item) => item.action_type === "IN")
    .reduce((sum, item) => sum + Number(item.quantity), 0);

  const totalOut = history
    .filter((item) => item.action_type === "OUT")
    .reduce((sum, item) => sum + Number(item.quantity), 0);

  const currentStock = products.reduce(
    (sum, item) => sum + Number(item.stock_quantity),
    0
  );

  const inventoryValue = products.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.stock_quantity),
    0
  );

  const lowStockProducts = products.filter(
    (p) => Number(p.stock_quantity) <= 5
  ).length;

  const filteredProducts = products.filter((p) =>
    p.product_name.toLowerCase().includes(summarySearch.toLowerCase())
  );

  const stockInHistory = history.filter(
    (item) =>
      item.action_type === "IN" &&
      item.product_name.toLowerCase().includes(inSearch.toLowerCase())
  );

  const stockOutHistory = history.filter(
    (item) =>
      item.action_type === "OUT" &&
      item.product_name.toLowerCase().includes(outSearch.toLowerCase())
  );

  return (
    <div className="inventory-container">
      <h1>📦 Inventory Dashboard</h1>

      <div className="inventory-stats">
        <div className="stat-card">
          <h3>Total Products</h3>
          <h2>{products.length}</h2>
        </div>

        <div className="stat-card in-card">
          <h3>Total Stock IN</h3>
          <h2>{totalIn}</h2>
        </div>

        <div className="stat-card out-card">
          <h3>Total Stock OUT</h3>
          <h2>{totalOut}</h2>
        </div>

        <div className="stat-card">
          <h3>Current Stock</h3>
          <h2>{currentStock}</h2>
        </div>

        <div className="stat-card">
          <h3>Inventory Value</h3>
          <h2>₹{inventoryValue}</h2>
        </div>

        <div className="stat-card out-card">
          <h3>Low Stock Items</h3>
          <h2>{lowStockProducts}</h2>
        </div>
      </div>

      <div className="table-card">
        <h2>Stock Summary</h2>

        <input
          className="search-bar"
          placeholder="Search Stock Summary..."
          value={summarySearch}
          onChange={(e) => setSummarySearch(e.target.value)}
        />

        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Total IN</th>
              <th>Total OUT</th>
              <th>Current Stock</th>
              <th>Stock Value</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((product) => {
              const productIn = history
                .filter(
                  (item) =>
                    item.product_name === product.product_name &&
                    item.action_type === "IN"
                )
                .reduce((sum, item) => sum + Number(item.quantity), 0);

              const productOut = history
                .filter(
                  (item) =>
                    item.product_name === product.product_name &&
                    item.action_type === "OUT"
                )
                .reduce((sum, item) => sum + Number(item.quantity), 0);

              return (
                <tr key={product.id}>
                  <td>{product.product_name}</td>

                  <td>
                    <span className="badge in">+{productIn}</span>
                  </td>

                  <td>
                    <span className="badge out">-{productOut}</span>
                  </td>

                  <td>{product.stock_quantity}</td>

                  <td>
                    ₹
                    {Number(product.price) *
                      Number(product.stock_quantity)}
                  </td>

                  <td>
                    {Number(product.stock_quantity) <= 5 ? (
                      <span className="badge out">Low Stock</span>
                    ) : (
                      <span className="badge in">In Stock</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <br />

      <div className="table-card">
        <h2>📥 Stock IN History</h2>

        <input
          className="search-bar"
          placeholder="Search Stock IN..."
          value={inSearch}
          onChange={(e) => setInSearch(e.target.value)}
        />

        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity Added</th>
              <th>Reference</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {stockInHistory.map((item) => (
              <tr key={item.id}>
                <td>{item.product_name}</td>
                <td>{item.quantity}</td>
                <td>{item.reference_no || "-"}</td>
                <td>{new Date(item.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <br />

      <div className="table-card">
        <h2>📤 Stock OUT History</h2>

        <input
          className="search-bar"
          placeholder="Search Stock OUT..."
          value={outSearch}
          onChange={(e) => setOutSearch(e.target.value)}
        />

        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity Sold</th>
              <th>Invoice No</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {stockOutHistory.map((item) => (
              <tr key={item.id}>
                <td>{item.product_name}</td>
                <td>{item.quantity}</td>
                <td>{item.reference_no || "-"}</td>
                <td>{new Date(item.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Inventory;