import "../assets/css/contact.css";

function Contact() {
  const phone = "918692826022";
  const whatsapp = "918692826022";
  const email = "shalizasupport@gmail.com";

  return (
    <div className="contact-layout">

      {/* SIDEBAR */}
      <div className="contact-sidebar">

        <h2>📞 Support</h2>

        <p className="subtext">
          Need help? Contact us anytime
        </p>

        <div className="side-buttons">

          <a href={`tel:${phone}`} className="side-btn call">
            📞 Call Now
          </a>

          <a
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="side-btn whatsapp"
          >
            💬 WhatsApp
          </a>

          <a href={`mailto:${email}`} className="side-btn email">
            ✉️ Email Us
          </a>

        </div>

        <div className="support-box">
          <h4>⏰ Support Hours</h4>
          <p>10 AM - 8 PM</p>
        </div>

      </div>

      {/* MAIN CONTENT */}
      <div className="contact-main">

        <h1>🚀 Get Support from ShalizaSoft</h1>

        <p className="desc">
          We provide instant support for billing, invoices,
          payments, subscription and technical issues.
        </p>

        {/* INFO CARDS */}
        <div className="info-grid">

          <div className="info-card">
            <h3>⚡ Fast Response</h3>
            <p>WhatsApp replies within 5–10 minutes</p>
          </div>

          <div className="info-card">
            <h3>💳 Payment Help</h3>
            <p>Razorpay & subscription issues solved quickly</p>
          </div>

          <div className="info-card">
            <h3>🧾 Billing Support</h3>
            <p>Invoice, GST & report assistance</p>
          </div>

        </div>

        {/* FAQ */}
        <div className="faq-box">
          <h2>❓ FAQs</h2>

          <details>
            <summary>How fast is support?</summary>
            <p>Instant on WhatsApp, within 24 hours on email.</p>
          </details>

          <details>
            <summary>Do you support payments issues?</summary>
            <p>Yes, Razorpay, card, UPI, international payments.</p>
          </details>

          <details>
            <summary>Can I upgrade subscription?</summary>
            <p>Yes, anytime from dashboard subscription page.</p>
          </details>

        </div>

      </div>

    </div>
  );
}

export default Contact;