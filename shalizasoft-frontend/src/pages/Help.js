import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/help.css";

function Help() {
  const navigate = useNavigate();

  const faqs = [
    {
      q: "How do I create an invoice?",
      a: "Go to Billing → Invoices → Create Invoice, select customer and products, then save & download PDF."
    },
    {
      q: "How do I add products?",
      a: "Open Billing → Products → Add Product."
    },
    {
      q: "How can I renew Premium?",
      a: "Go to Subscription page and choose your preferred plan."
    },
    {
      q: "How do I reset my password?",
      a: "Click Forgot Password on the Login page."
    },
    {
      q: "Can I use Shaliza Billing on mobile?",
      a: "Yes. The application is responsive and works on phones, tablets and desktops."
    }
  ];

  const [open, setOpen] = useState(null);

  return (
    <div className="help-page">

      <div className="help-header">
        <h1>Help & Support</h1>
        <p>
          We're here to help you get the most out of Shaliza Billing.
        </p>
      </div>

      <div className="support-grid">

        <div
          className="support-card whatsapp"
          onClick={() =>
            window.open(
              "https://wa.me/918692826022",
              "_blank"
            )
          }
        >
          <div className="icon">💬</div>
          <h3>WhatsApp</h3>
          <p>Chat with our support team.</p>
        </div>

        <div
          className="support-card call"
          onClick={() =>
            window.location.href =
              "tel:+918692826022"
          }
        >
          <div className="icon">📞</div>
          <h3>Call</h3>
          <p>+91 8692826022</p>
        </div>

        <div
          className="support-card email"
          onClick={() =>
            window.location.href =
              "mailto:shalizasupport@gmail.com"
          }
        >
          <div className="icon">📧</div>
          <h3>Email</h3>
          <p>shalizasupport@gmail.com</p>
        </div>

      </div>

      <div className="guide-card">

        <h2>User Guide</h2>

        <div className="steps">

          <div>1️⃣ Create Customer</div>

          <div>2️⃣ Add Products</div>

          <div>3️⃣ Generate Invoice</div>

          <div>4️⃣ Download PDF</div>

          <div>5️⃣ Track Inventory</div>

          <div>6️⃣ View Reports</div>

        </div>

      </div>

      <div className="faq-card">

        <h2>Frequently Asked Questions</h2>

        {faqs.map((item, index) => (

          <div
            key={index}
            className="faq-item"
          >

            <div
              className="faq-question"
              onClick={() =>
                setOpen(
                  open === index
                    ? null
                    : index
                )
              }
            >
              {item.q}

              <span>
                {open === index
                  ? "-"
                  : "+"}
              </span>

            </div>

            {open === index && (
              <div className="faq-answer">
                {item.a}
              </div>
            )}

          </div>

        ))}

      </div>

      <div className="legal-grid">

        <div
          className="legal-card"
          onClick={() =>
            navigate("/privacy-policy")
          }
        >
          🔒 Privacy Policy
        </div>

        <div
          className="legal-card"
          onClick={() =>
            navigate("/terms")
          }
        >
          📜 Terms & Conditions
        </div>

        <div
          className="legal-card"
          onClick={() =>
            navigate("/refund-policy")
          }
        >
          💰 Refund Policy
        </div>

      </div>

      <div className="about-app">

        <h3>About Shaliza Billing</h3>

        <p>Version : 1.0.0</p>

        <p>Made in India 🇮🇳</p>

        <p>
          © 2026 Shaliza Billing
        </p>

      </div>

    </div>
  );
}

export default Help;