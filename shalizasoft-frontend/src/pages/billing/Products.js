import { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/products.css";

function Products() {
  const [products, setProducts] = useState([]);

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");

  const [search, setSearch] = useState("");

  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5001/api/products",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addOrUpdateProduct = async () => {
    try {
      if (!productName)
        return alert("Product Name Required");

      if (editId) {
        await axios.put(
          `http://localhost:5001/api/products/${editId}`,
          {
            product_name: productName,
            price,
            stock_quantity: stockQuantity,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert("Product Updated");
      } else {
        await axios.post(
          "http://localhost:5001/api/products",
          {
            product_name: productName,
            price,
            stock_quantity: stockQuantity,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert("Product Added");
      }

      setProductName("");
      setPrice("");
      setStockQuantity("");
      setEditId(null);

      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const editProduct = (product) => {
    setEditId(product.id);
    setProductName(product.product_name);
    setPrice(product.price);
    setStockQuantity(product.stock_quantity);
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5001/api/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredProducts = products.filter((p) =>
    p.product_name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="product-container">

      <h1 className="title">
        📦 Product Management
      </h1>

      <input
        className="search-bar"
        placeholder="Search Product..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <div className="product-form">

        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) =>
            setProductName(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Stock"
          value={stockQuantity}
          onChange={(e) =>
            setStockQuantity(e.target.value)
          }
        />

        <button onClick={addOrUpdateProduct}>
          {editId
            ? "Update Product"
            : "Add Product"}
        </button>

      </div>

      <div className="table-card">

        <table>

          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredProducts.map((product) => (
              <tr key={product.id}>

                <td>
                  {product.product_name}
                </td>

                <td>
                  ₹{product.price}
                </td>

                <td>
                  {product.stock_quantity}
                </td>

                <td>
                  {Number(
                    product.stock_quantity
                  ) <= 5 ? (
                    <span className="low-stock">
                      ⚠ Low Stock
                    </span>
                  ) : (
                    <span className="in-stock">
                      ✔ In Stock
                    </span>
                  )}
                </td>

                <td>

                  <button
                    className="edit-btn"
                    onClick={() =>
                      editProduct(product)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteProduct(product.id)
                    }
                  >
                    Delete
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Products;