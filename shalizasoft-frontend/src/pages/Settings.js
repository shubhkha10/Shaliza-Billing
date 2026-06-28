import { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/setting.css";

function Settings() {
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    company_name: "",
    owner_name: "",
    email: "",
    phone: "",
    website: "",
    address: "",
    logo_url: "",

    gst_number: "",
    currency: "INR",
    tax_percentage: 18,

    upi_id: "",
    bank_name: "",
    account_number: "",
    ifsc_code: "",

    invoice_prefix: "INV",
    invoice_note: "Thank you for your business",
  });

  // FETCH
  const fetchSettings = async () => {
    const res = await axios.get("http://localhost:5001/api/settings", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.data) setForm(res.data);
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveSettings = async () => {
    await axios.post("http://localhost:5001/api/settings", form, {
      headers: { Authorization: `Bearer ${token}` },
    });

    alert("Settings Saved");
  };

  return (
    <div className="settings-wrapper">

      <div className="settings-header">
        <h1>⚙ Company Settings</h1>
        <p>Manage your business & invoice system</p>
      </div>

      {/* COMPANY */}
      <div className="card">
        <h2>Company Details</h2>

        <div className="grid">
          <input name="company_name" placeholder="Company Name" value={form.company_name} onChange={handleChange} />
          <input name="owner_name" placeholder="Owner Name" value={form.owner_name} onChange={handleChange} />
          <input name="website" placeholder="Website" value={form.website} onChange={handleChange} />
          <input name="logo_url" placeholder="Logo URL" value={form.logo_url} onChange={handleChange} />
        </div>
      </div>

      {/* CONTACT */}
      <div className="card">
        <h2>Contact Info</h2>

        <div className="grid">
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
          <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
        </div>

        <textarea
          name="address"
          placeholder="Full Address"
          value={form.address}
          onChange={handleChange}
        />
      </div>

      {/* BILLING */}
      <div className="card">
        <h2>Billing Settings</h2>

        <div className="grid">
          <input name="currency" value={form.currency} onChange={handleChange} />
          <input name="tax_percentage" type="number" value={form.tax_percentage} onChange={handleChange} />
          <input name="gst_number" placeholder="Tax / GST Number" value={form.gst_number} onChange={handleChange} />
        </div>
      </div>

      {/* BANK */}
      <div className="card">
        <h2>Bank & Payments</h2>

        <div className="grid">
          <input name="upi_id" placeholder="UPI ID" value={form.upi_id} onChange={handleChange} />
          <input name="bank_name" placeholder="Bank Name" value={form.bank_name} onChange={handleChange} />
          <input name="account_number" placeholder="Account Number" value={form.account_number} onChange={handleChange} />
          <input name="ifsc_code" placeholder="IFSC Code" value={form.ifsc_code} onChange={handleChange} />
        </div>
      </div>

      {/* INVOICE */}
      <div className="card">
        <h2>Invoice Settings</h2>

        <div className="grid">
          <input name="invoice_prefix" placeholder="INV Prefix" value={form.invoice_prefix} onChange={handleChange} />
        </div>

        <textarea
          name="invoice_note"
          placeholder="Invoice Footer Note"
          value={form.invoice_note}
          onChange={handleChange}
        />
      </div>

      <button className="save-btn" onClick={saveSettings}>
        Save Settings
      </button>

    </div>
  );
}

export default Settings;