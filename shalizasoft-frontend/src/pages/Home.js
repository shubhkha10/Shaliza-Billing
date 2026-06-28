import { useNavigate } from "react-router-dom";
import "../assets/css/home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">

      {/* HERO */}
      <section className="hero">

        <div className="hero-content">

          <h1>
            Smart Billing System for Modern Businesses
          </h1>

          <p>
            Manage invoices, customers, products, inventory and reports in one powerful cloud-based billing platform.
            Built for freelancers, shops, startups and growing businesses.
          </p>

          <div className="hero-buttons">

            <button onClick={() => navigate("/signup")}>
              Get Started Free
            </button>

            <button className="secondary" onClick={() => navigate("/login")}>
              Login
            </button>

          </div>

          <div className="hero-tags">
            <span>⚡ Fast Invoicing</span>
            <span>🔒 Secure Data</span>
            <span>📊 Smart Reports</span>
            <span>📦 Inventory Control</span>
          </div>

        </div>

      </section>

      {/* ABOUT */}
      <section className="about">

        <h2>Why Businesses Choose Us</h2>

        <p>
          Automate your billing, reduce manual work and grow faster with real-time business tracking.
        </p>

        <div className="about-grid">

          <div className="box">
            <h3>✔ Instant Invoice</h3>
            <p>GST-ready invoices in seconds.</p>
          </div>

          <div className="box">
            <h3>✔ Customer Management</h3>
            <p>Store all customer data easily.</p>
          </div>

          <div className="box">
            <h3>✔ Inventory Control</h3>
            <p>Track stock in real-time.</p>
          </div>

          <div className="box">
            <h3>✔ Reports</h3>
            <p>Business analytics instantly.</p>
          </div>

        </div>

      </section>

      {/* FEATURES */}
      <section className="features">

        <h2>Powerful Features</h2>

        <div className="feature-grid">

          <div className="feature-card">
            <h3>Invoice Generator</h3>
            <p>Auto calculate totals & GST PDF export.</p>
          </div>

          <div className="feature-card">
            <h3>Dashboard</h3>
            <p>Complete business overview.</p>
          </div>

          <div className="feature-card">
            <h3>Stock Management</h3>
            <p>Auto reduce stock after billing.</p>
          </div>

          <div className="feature-card">
            <h3>Secure System</h3>
            <p>JWT authentication protection.</p>
          </div>

        </div>

      </section>

      {/* STATS */}
      <section className="stats">

        <div className="stat-box">
          <h2>10K+</h2>
          <p>Invoices Generated</p>
        </div>

        <div className="stat-box">
          <h2>5K+</h2>
          <p>Businesses</p>
        </div>

        <div className="stat-box">
          <h2>99%</h2>
          <p>Satisfaction</p>
        </div>

        <div className="stat-box">
          <h2>24/7</h2>
          <p>Support Ready</p>
        </div>

      </section>

      {/* CTA */}
      <section className="cta">

        <h2>Start Your Business Journey Today</h2>

        <p>Join modern businesses using automated billing system.</p>

        <button onClick={() => navigate("/signup")}>
          Create Free Account
        </button>

      </section>

      {/* CONTACT SECTION ⭐ NEW */}
      <section className="contact">

        <h2>📞 Contact Us</h2>

        <p>If you need help, setup guidance, or support — reach us instantly.</p>

        <div className="contact-grid">

          <a
            href="https://wa.me/918692826022"
            target="_blank"
            rel="noreferrer"
            className="contact-card whatsapp"
          >
            💬 WhatsApp Us
            <span>Instant reply on WhatsApp</span>
          </a>

          <a
            href="tel:+918692826022"
            className="contact-card call"
          >
            📞 Call Us
            <span>Talk directly with support</span>
          </a>

          <a
            href="mailto:shalizasupport@gmail.com"
            className="contact-card email"
          >
            📧 Email Us
            <span>support@shalizasoft.com</span>
          </a>

        </div>

      </section>

    </div>
  );
}

export default Home;