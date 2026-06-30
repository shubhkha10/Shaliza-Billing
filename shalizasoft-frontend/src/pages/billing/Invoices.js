import { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/invoices.css";
import API from "../../config/api";

function Invoices() {
  const token = localStorage.getItem("token");

  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [invoices, setInvoices] = useState([]);

  const [customer, setCustomer] = useState("");

  const [items, setItems] = useState([
    {
      product_name: "",
      quantity: 1,
      price: 0,
    },
  ]);

  const [search, setSearch] = useState("");

  // ==========================
  // FETCH DATA
  // ==========================
  const fetchInvoices = async () => {
    const res = await axios.get(`${API}/invoices`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setInvoices(res.data);
  };

  const fetchCustomers = async () => {
    const res = await axios.get(`${API}/customers`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setCustomers(res.data);
  };

  const fetchProducts = async () => {
    const res = await axios.get(`${API}/products`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setProducts(res.data);
  };

  useEffect(() => {
    fetchInvoices();
    fetchCustomers();
    fetchProducts();
  }, []);

  // ==========================
  // ADD ITEM
  // ==========================
  const addItem = () => {
    setItems([...items, { product_name: "", quantity: 1, price: 0 }]);
  };

  // ==========================
  // UPDATE ITEM
  // ==========================
  const updateItem = (index, key, value) => {
    const updated = [...items];

    updated[index][key] = value;

    if (key === "product_name") {
      const product = products.find(
        (p) => p.product_name === value
      );

      updated[index].price = product ? Number(product.price) : 0;
    }

    setItems(updated);
  };

  // ==========================
  // REMOVE ITEM
  // ==========================
  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  // ==========================
  // TOTAL
  // ==========================
  const total = items.reduce(
    (sum, item) =>
      sum + Number(item.quantity) * Number(item.price),
    0
  );

  // ==========================
  // CREATE INVOICE
  // ==========================
  const createInvoice = async () => {
    if (!customer) return alert("Select Customer");

    const cleanItems = items.filter(
      (i) => i.product_name && Number(i.quantity) > 0
    );

    if (cleanItems.length === 0) return alert("Add Product");

    try {
      await axios.post(
        `${API}/invoices`,
        {
          customer_name: customer,
          items: cleanItems,
          gst: 18,
          discount: 5,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Invoice Created Successfully");

      setCustomer("");
      setItems([{ product_name: "", quantity: 1, price: 0 }]);

      fetchInvoices();
      fetchProducts();
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message || "Invoice Failed");
    }
  };

  // ==========================
  // DELETE
  // ==========================
  const deleteInvoice = async (id) => {
    await axios.delete(`${API}/invoices/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchInvoices();
  };

  // ==========================
  // PDF DOWNLOAD
  // ==========================
  const downloadPDF = async (id) => {
    const response = await axios.get(
     `${API}/pdf/invoice/${id}` ,
      {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob",
      }
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");

    link.href = url;
    link.download = `invoice-${id}.pdf`;

    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  // ==========================
  // 📲 WHATSAPP (BACKEND TRIGGER - FINAL FIX)
  // ==========================
  // ==========================
// 📤 SHARE INVOICE (Native Share)
// ==========================

const shareInvoicePDF = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:5001/api/pdf/invoice/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      }
    );

    const pdfBlob = new Blob(
      [response.data],
      { type: "application/pdf" }
    );

    const file = new File(
      [pdfBlob],
      `invoice-${id}.pdf`,
      {
        type: "application/pdf",
      }
    );

    // Native Share
    if (
      navigator.share &&
      navigator.canShare &&
      navigator.canShare({
        files: [file],
      })
    ) {
      await navigator.share({
        title: "Invoice",
        text: "Invoice PDF",
        files: [file],
      });
    } else {
      // Fallback download
      const url =
        window.URL.createObjectURL(pdfBlob);

      const link =
        document.createElement("a");

      link.href = url;
      link.download =
        `invoice-${id}.pdf`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      alert(
        "Sharing not supported. PDF downloaded."
      );
    }
  } catch (error) {
    console.log(error);
    alert("Failed to share PDF");
  }
};
  // ==========================
  // SEARCH
  // ==========================
  const filteredInvoices = invoices.filter((invoice) =>
    (invoice.customer_name + " " + invoice.invoice_number)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="invoice-container">
      <h1 className="title">🧾 Invoice Management</h1>

      <input
        className="search-bar"
        placeholder="Search Invoice..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* FORM */}
      <div className="invoice-form">
        <select
          className="full-input"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
        >
          <option value="">Select Customer</option>
          {customers.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>

        {items.map((item, index) => (
          <div className="item-row" key={index}>
            <select
              value={item.product_name}
              onChange={(e) =>
                updateItem(index, "product_name", e.target.value)
              }
            >
              <option value="">Select Product</option>
              {products.map((p) => (
                <option key={p.id} value={p.product_name}>
                  {p.product_name}
                </option>
              ))}
            </select>

            <input
              type="number"
              value={item.quantity}
              onChange={(e) =>
                updateItem(index, "quantity", Number(e.target.value))
              }
            />

            <input type="number" value={item.price} readOnly />

            <button onClick={() => removeItem(index)}>❌</button>
          </div>
        ))}

        <button className="add-btn small" onClick={addItem}>
          + Add Product
        </button>

        <div className="total-box">Total : ₹{total}</div>

        <button className="add-btn" onClick={createInvoice}>
          Create Invoice
        </button>
      </div>

      {/* TABLE */}
      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Invoice No</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredInvoices.map((inv) => (
              <tr key={inv.id}>
                <td>{inv.invoice_number}</td>
                <td>{inv.customer_name}</td>
                <td>₹{inv.total}</td>

                <td>
                  <button
                    className="pdf-btn"
                    onClick={() => downloadPDF(inv.id)}
                  >
                    PDF
                  </button>
                   <button
  className="whatsapp-btn"
  onClick={() => shareInvoicePDF(inv.id)}
>
  Share
</button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteInvoice(inv.id)}
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

export default Invoices;