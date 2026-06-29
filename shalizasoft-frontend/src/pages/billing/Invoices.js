import { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/invoices.css";

const API = "https://shaliza-billing-production.up.railway.app/api";

function Invoices() {
  const token = localStorage.getItem("token");

  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [invoices, setInvoices] = useState([]);

  const [customer, setCustomer] = useState("");
  const [items, setItems] = useState([
    { product_name: "", quantity: 1, price: 0 },
  ]);

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

  const createInvoice = async () => {
    if (!customer) return alert("Select Customer");

    const cleanItems = items.filter(
      (i) => i.product_name && i.quantity > 0
    );

    await axios.post(
      `${API}/invoices`,
      {
        customer_name: customer,
        items: cleanItems,
        gst: 18,
        discount: 5,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    fetchInvoices();
  };

  const downloadPDF = async (id) => {
    const res = await axios.get(`${API}/pdf/invoice/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const a = document.createElement("a");
    a.href = url;
    a.download = `invoice-${id}.pdf`;
    a.click();
  };

  return (
    <div>
      <h1>Invoices</h1>

      <select value={customer} onChange={(e) => setCustomer(e.target.value)}>
        <option value="">Select Customer</option>
        {customers.map((c) => (
          <option key={c.id} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>

      <button onClick={createInvoice}>Create Invoice</button>

      <table>
        <tbody>
          {invoices.map((inv) => (
            <tr key={inv.id}>
              <td>{inv.invoice_number}</td>
              <td>{inv.customer_name}</td>
              <td>{inv.total}</td>

              <td>
                <button onClick={() => downloadPDF(inv.id)}>
                  PDF
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Invoices;