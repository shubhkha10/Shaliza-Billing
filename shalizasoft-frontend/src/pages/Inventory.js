import { useEffect, useState } from "react";
import axios from "axios";
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
      const res = await axios.get(`${API}/inventory`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setHistory(res.data?.history || []);
      setProducts(res.data?.products || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const totalIn = history.filter(i => i.action_type === "IN").reduce((s, i) => s + Number(i.quantity), 0);
  const totalOut = history.filter(i => i.action_type === "OUT").reduce((s, i) => s + Number(i.quantity), 0);

  const currentStock = products.reduce((s, i) => s + Number(i.stock_quantity), 0);

  const inventoryValue = products.reduce(
    (s, i) => s + Number(i.price) * Number(i.stock_quantity),
    0
  );

  const lowStockProducts = products.filter(p => Number(p.stock_quantity) <= 5).length;

  const filteredProducts = products.filter(p =>
    p.product_name?.toLowerCase().includes(summarySearch.toLowerCase())
  );

  const stockInHistory = history.filter(
    i =>
      i.action_type === "IN" &&
      i.product_name?.toLowerCase().includes(inSearch.toLowerCase())
  );

  const stockOutHistory = history.filter(
    i =>
      i.action_type === "OUT" &&
      i.product_name?.toLowerCase().includes(outSearch.toLowerCase())
  );

  return (
    <div className="inventory-container">
      <h1>📦 Inventory Dashboard</h1>

      <div className="inventory-stats">
        <div className="stat-card"><h3>Total Products</h3><h2>{products.length}</h2></div>
        <div className="stat-card in-card"><h3>Total Stock IN</h3><h2>{totalIn}</h2></div>
        <div className="stat-card out-card"><h3>Total Stock OUT</h3><h2>{totalOut}</h2></div>
        <div className="stat-card"><h3>Current Stock</h3><h2>{currentStock}</h2></div>
        <div className="stat-card"><h3>Inventory Value</h3><h2>₹{inventoryValue}</h2></div>
        <div className="stat-card out-card"><h3>Low Stock Items</h3><h2>{lowStockProducts}</h2></div>
      </div>

    </div>
  );
}

export default Inventory;