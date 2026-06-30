// import { useEffect, useState } from "react";
// import axios from "axios";
// import API from "../../config/api";
// import "../../assets/css/products.css";

// function Products() {
//   const [products, setProducts] = useState([]);

//   const [productName, setProductName] = useState("");
//   const [price, setPrice] = useState("");
//   const [stockQuantity, setStockQuantity] = useState("");

//   const [search, setSearch] = useState("");

//   const [editId, setEditId] = useState(null);

//   const token = localStorage.getItem("token");

//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get(
//         `${API}/products`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setProducts(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const addOrUpdateProduct = async () => {
//     try {
//       if (!productName)
//         return alert("Product Name Required");

//       if (editId) {
//         await axios.put(
//           `${API}/products/${editId}`,
//           {
//             product_name: productName,
//             price,
//             stock_quantity: stockQuantity,
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         alert("Product Updated");
//       } else {
//         await axios.post(
//           `${API}/products`,
//           {
//             product_name: productName,
//             price,
//             stock_quantity: stockQuantity,
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         alert("Product Added");
//       }

//       setProductName("");
//       setPrice("");
//       setStockQuantity("");
//       setEditId(null);

//       fetchProducts();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const editProduct = (product) => {
//     setEditId(product.id);
//     setProductName(product.product_name);
//     setPrice(product.price);
//     setStockQuantity(product.stock_quantity);
//   };

//   const deleteProduct = async (id) => {
//     try {
//       await axios.delete(
//         `${API}/products/${id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       fetchProducts();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const filteredProducts = products.filter((p) =>
//     p.product_name
//       .toLowerCase()
//       .includes(search.toLowerCase())
//   );

//   return (
//     <div className="product-container">

//       <h1 className="title">
//         📦 Product Management
//       </h1>

//       <input
//         className="search-bar"
//         placeholder="Search Product..."
//         value={search}
//         onChange={(e) =>
//           setSearch(e.target.value)
//         }
//       />

//       <div className="product-form">

//         <input
//           type="text"
//           placeholder="Product Name"
//           value={productName}
//           onChange={(e) =>
//             setProductName(e.target.value)
//           }
//         />

//         <input
//           type="number"
//           placeholder="Price"
//           value={price}
//           onChange={(e) =>
//             setPrice(e.target.value)
//           }
//         />

//         <input
//           type="number"
//           placeholder="Stock"
//           value={stockQuantity}
//           onChange={(e) =>
//             setStockQuantity(e.target.value)
//           }
//         />

//         <button onClick={addOrUpdateProduct}>
//           {editId
//             ? "Update Product"
//             : "Add Product"}
//         </button>

//       </div>

//       <div className="table-card">

//         <table>

//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Price</th>
//               <th>Stock</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>

//             {filteredProducts.map((product) => (
//               <tr key={product.id}>

//                 <td>
//                   {product.product_name}
//                 </td>

//                 <td>
//                   ₹{product.price}
//                 </td>

//                 <td>
//                   {product.stock_quantity}
//                 </td>

//                 <td>
//                   {Number(
//                     product.stock_quantity
//                   ) <= 5 ? (
//                     <span className="low-stock">
//                       ⚠ Low Stock
//                     </span>
//                   ) : (
//                     <span className="in-stock">
//                       ✔ In Stock
//                     </span>
//                   )}
//                 </td>

//                 <td>

//                   <button
//                     className="edit-btn"
//                     onClick={() =>
//                       editProduct(product)
//                     }
//                   >
//                     Edit
//                   </button>

//                   <button
//                     className="delete-btn"
//                     onClick={() =>
//                       deleteProduct(product.id)
//                     }
//                   >
//                     Delete
//                   </button>

//                 </td>

//               </tr>
//             ))}

//           </tbody>

//         </table>

//       </div>

//     </div>
//   );
// }

// export default Products;

import { useEffect, useState } from "react";
import API from "../../config/api";
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
      const res = await API.get("/products", {
        headers: { Authorization: `Bearer ${token}` },
      });

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
      if (!productName) return alert("Product Name Required");

      const payload = {
        product_name: productName,
        price,
        stock_quantity: stockQuantity,
      };

      if (editId) {
        await API.put(`/products/${editId}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });

        alert("Product Updated");
      } else {
        await API.post("/products", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });

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

  const deleteProduct = async (id) => {
    try {
      await API.delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredProducts = products.filter((p) =>
    p.product_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="product-container">
      <h1>📦 Product Management</h1>

      <input
        placeholder="Search Product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div>
        <input
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />

        <input
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          placeholder="Stock"
          value={stockQuantity}
          onChange={(e) => setStockQuantity(e.target.value)}
        />

        <button onClick={addOrUpdateProduct}>
          {editId ? "Update Product" : "Add Product"}
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>

        <tbody>
          {filteredProducts.map((p) => (
            <tr key={p.id}>
              <td>{p.product_name}</td>
              <td>₹{p.price}</td>
              <td>{p.stock_quantity}</td>
              <td>
                <button onClick={() => deleteProduct(p.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;