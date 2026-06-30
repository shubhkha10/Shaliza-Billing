import { useEffect, useState } from "react";
import axios from "axios";
import API from "../config/api";

function Products() {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");

  const token = localStorage.getItem("token");

  const fetchProducts = async () => {
    const res = await axios.get(`${API}/products`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async () => {
    await axios.post(
      `${API}/products`,
      {
        product_name: productName,
        price,
        stock_quantity: stockQuantity,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    fetchProducts();
  };

  const deleteProduct = async (id) => {
    await axios.delete(`${API}/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchProducts();
  };

  return (
    <div>
      <input value={productName} onChange={(e) => setProductName(e.target.value)} />
      <input value={price} onChange={(e) => setPrice(e.target.value)} />
      <input value={stockQuantity} onChange={(e) => setStockQuantity(e.target.value)} />

      <button onClick={addProduct}>Add</button>

      {products.map((p) => (
        <div key={p.id}>
          {p.product_name}
          <button onClick={() => deleteProduct(p.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Products;