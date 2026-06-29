// import { useEffect, useState } from "react";
// import axios from "axios";
// import "../../assets/css/products.css";

// const API = "https://shaliza-billing-production.up.railway.app/api";

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
//       const res = await axios.get(`${API}/products`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

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
//       if (!productName) return alert("Product Name Required");

//       if (editId) {
//         await axios.put(
//           `${API}/products/${editId}`,
//           {
//             product_name: productName,
//             price,
//             stock_quantity: stockQuantity,
//           },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//       } else {
//         await axios.post(
//           `${API}/products`,
//           {
//             product_name: productName,
//             price,
//             stock_quantity: stockQuantity,
//           },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
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

//   const deleteProduct = async (id) => {
//     try {
//       await axios.delete(`${API}/products/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       fetchProducts();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const filteredProducts = products.filter((p) =>
//     p.product_name?.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div>
//       <h1>Products</h1>

//       <input
//         placeholder="Search"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       <div>
//         <input placeholder="Name" value={productName} onChange={(e) => setProductName(e.target.value)} />
//         <input placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
//         <input placeholder="Stock" value={stockQuantity} onChange={(e) => setStockQuantity(e.target.value)} />

//         <button onClick={addOrUpdateProduct}>
//           {editId ? "Update" : "Add"}
//         </button>
//       </div>

//       <table>
//         <tbody>
//           {filteredProducts.map((p) => (
//             <tr key={p.id}>
//               <td>{p.product_name}</td>
//               <td>{p.price}</td>
//               <td>{p.stock_quantity}</td>

//               <td>
//                 <button onClick={() => setEditId(p.id)}>Edit</button>
//                 <button onClick={() => deleteProduct(p.id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Products;

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