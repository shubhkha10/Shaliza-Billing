import { useEffect, useState } from "react";
import axios from "axios";
import API from "../config/api";
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

  const fetchSettings = async () => {
    try {
      const res = await axios.get(`${API}/settings`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data) setForm(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveSettings = async () => {
    try {
      await axios.post(`${API}/settings`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Settings Saved");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="settings-wrapper">
      <div className="settings-header">
        <h1>⚙ Company Settings</h1>
        <p>Manage your business & invoice system</p>
      </div>

      <div className="card">
        <h2>Company Details</h2>
        <div className="grid">
          <input name="company_name" value={form.company_name} onChange={handleChange} />
          <input name="owner_name" value={form.owner_name} onChange={handleChange} />
          <input name="website" value={form.website} onChange={handleChange} />
          <input name="logo_url" value={form.logo_url} onChange={handleChange} />
        </div>
      </div>

      <div className="card">
        <h2>Contact Info</h2>
        <div className="grid">
          <input name="email" value={form.email} onChange={handleChange} />
          <input name="phone" value={form.phone} onChange={handleChange} />
        </div>
        <textarea name="address" value={form.address} onChange={handleChange} />
      </div>

      <button className="save-btn" onClick={saveSettings}>
        Save Settings
      </button>
    </div>
  );
}

export default Settings;