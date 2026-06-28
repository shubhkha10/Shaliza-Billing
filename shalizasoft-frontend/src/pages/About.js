import { useNavigate } from "react-router-dom";
import "../assets/css/about.css";

function About() {
  const navigate = useNavigate();

  return (
    <div className="about-page">

      {/* HERO SECTION */}
      <section className="about-hero">
        <h1>About ShalizaSoft</h1>

        <p>
          We build modern SaaS platforms that help businesses automate billing,
          manage customers, track inventory, and grow faster using technology.
        </p>
      </section>

      {/* MISSION */}
      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          Our mission is to simplify business operations through intelligent software.
          We help small and medium businesses move from manual work to automation.
        </p>
      </section>

      {/* VISION */}
      <section className="about-section dark">
        <h2>Our Vision</h2>
        <p>
          To become a global SaaS platform that powers millions of businesses with
          smart billing, automation, and AI-driven tools.
        </p>
      </section>

      {/* FEATURES */}
      <section className="grid-section">
        <h2>What We Build</h2>

        <div className="grid">

          <div className="card">
            <h3>Billing Software</h3>
            <p>Fast invoice generation, GST billing, PDF export and payment tracking.</p>
          </div>

          <div className="card">
            <h3>Inventory System</h3>
            <p>Real-time stock tracking, low stock alerts and product management.</p>
          </div>

          <div className="card">
            <h3>CRM System</h3>
            <p>Manage customers, payments, and business relationships in one place.</p>
          </div>

          <div className="card">
            <h3>AI Tools</h3>
            <p>Smart automation tools for writing, business analysis and productivity.</p>
          </div>

        </div>
      </section>

      {/* WHY US */}
      <section className="about-section">
        <h2>Why Choose ShalizaSoft?</h2>

        <ul>
          <li>✔ Simple & Clean User Interface</li>
          <li>✔ Fast Performance & Secure System</li>
          <li>✔ Scalable SaaS Architecture</li>
          <li>✔ Built for Real Business Needs</li>
          <li>✔ Continuous Updates & Improvements</li>
        </ul>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <h2>Start Building Your Business with Us</h2>

        <p>
          Join ShalizaSoft and transform your business with automation and smart billing tools.
        </p>

        <button onClick={() => navigate("/signup")}>
          Get Started
        </button>

      </section>

    </div>
  );
}

export default About;