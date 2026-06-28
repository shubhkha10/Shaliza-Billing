
import "../assets/css/legal.css";

function PrivacyPolicy() {
  return (
    <div className="legal-page">

      <div className="legal-hero">
        <h1>Privacy Policy</h1>
        <p>
          Last Updated: June 2026
        </p>
      </div>

      <div className="legal-container">

        <section className="legal-card">
          <h2>1. Introduction</h2>

          <p>
            Welcome to <strong>Shaliza Billing</strong>.
            We respect your privacy and are committed to protecting
            your personal information. This Privacy Policy explains
            how we collect, use, store and protect your data when
            using our billing software.
          </p>
        </section>

        <section className="legal-card">
          <h2>2. Information We Collect</h2>

          <ul>
            <li>Name</li>
            <li>Email Address</li>
            <li>Phone Number</li>
            <li>Business Information</li>
            <li>Customer Details</li>
            <li>Invoice Data</li>
            <li>Product & Inventory Information</li>
            <li>Payment Details processed securely through Razorpay</li>
          </ul>
        </section>

        <section className="legal-card">
          <h2>3. How We Use Your Information</h2>

          <ul>
            <li>Create invoices and billing records</li>
            <li>Maintain inventory records</li>
            <li>Provide customer support</li>
            <li>Improve application performance</li>
            <li>Process subscription payments</li>
            <li>Maintain account security</li>
          </ul>
        </section>

        <section className="legal-card">
          <h2>4. Payment Security</h2>

          <p>
            All payments are processed securely using
            <strong> Razorpay</strong>. Shaliza Billing never stores
            your debit card, credit card or banking credentials.
          </p>
        </section>

        <section className="legal-card">
          <h2>5. Data Protection</h2>

          <p>
            We use secure authentication, encrypted communication
            and modern security practices to protect your account
            and business information.
          </p>
        </section>

        <section className="legal-card">
          <h2>6. Sharing Information</h2>

          <p>
            We never sell your personal information. Data may only
            be shared with trusted payment providers or when required
            by applicable law.
          </p>
        </section>

        <section className="legal-card">
          <h2>7. Contact Us</h2>

          <div className="contact-box">

            <p><strong>Company</strong></p>
            <p>Shaliza Billing</p>

            <p><strong>Email</strong></p>
            <p>shalizasupport@gmail.com</p>

            <p><strong>Phone</strong></p>
            <p>+91 8692826022</p>

            <p><strong>Location</strong></p>
            <p>Andheri, Mumbai, Maharashtra, India</p>

          </div>

        </section>

      </div>

    </div>
  );
}

export default PrivacyPolicy;

