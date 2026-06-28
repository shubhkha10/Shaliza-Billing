
import { Link } from "react-router-dom";
import "../assets/css/footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* COMPANY */}

        <div className="footer-section">

          <h2>Shaliza Billing</h2>

          <p>
            Smart GST Billing Software for
            Modern Businesses.
          </p>

          <p>📍 Mumbai, Maharashtra</p>
          <p>📞 +91 8692826022</p>
          <p>✉ shalizasupport@gmail.com</p>

        </div>

        {/* QUICK LINKS */}

        <div className="footer-section">

          <h3>Quick Links</h3>

          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact</Link>

        </div>

        {/* PRODUCT */}

        <div className="footer-section">

          <h3>Product</h3>

          <Link to="/dashboard">Dashboard</Link>
          <Link to="/billing">Billing</Link>
          <Link to="/inventory">Inventory</Link>
          <Link to="/subscription">Pricing</Link>

        </div>

        {/* LEGAL */}

        <div className="footer-section">

          <h3>Legal</h3>

          <Link to="/privacy-policy">
            Privacy Policy
          </Link>

          <Link to="/terms">
            Terms & Conditions
          </Link>

          <Link to="/refund-policy">
            Refund Policy
          </Link>

        </div>

        {/* SUPPORT */}

        <div className="footer-section">

          <h3>Support</h3>

          <a
            href="https://wa.me/918692826022"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>

          <a href="tel:+918692826022">
            Call Us
          </a>

          <a href="mailto:shalizasupport@gmail.com">
            Email Support
          </a>

        </div>

      </div>

      <div className="footer-bottom">

        © 2026 Shaliza Billing.
        All Rights Reserved.

        <br />

        Made with ❤️ in India.

      </div>

    </footer>
  );
}

export default Footer;

