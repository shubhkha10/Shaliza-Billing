
import "../assets/css/legal.css";

function TermsConditions() {
  return (
    <div className="legal-page">

      <div className="legal-hero">
        <h1>Terms & Conditions</h1>
        <p>Last Updated: June 2026</p>
      </div>

      <div className="legal-container">

        <section className="legal-card">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By creating an account or using Shaliza Billing,
            you agree to these Terms & Conditions.
          </p>
        </section>

        <section className="legal-card">
          <h2>2. Services</h2>

          <p>
            Shaliza Billing provides cloud-based billing,
            GST invoice generation, inventory management,
            customer management, reports and subscription services.
          </p>
        </section>

        <section className="legal-card">
          <h2>3. User Responsibilities</h2>

          <ul>
            <li>Provide accurate information.</li>
            <li>Keep login credentials secure.</li>
            <li>Do not misuse or attempt to hack the platform.</li>
            <li>Use the software only for lawful business purposes.</li>
          </ul>

        </section>

        <section className="legal-card">
          <h2>4. Subscription</h2>

          <ul>
            <li>Monthly Premium – ₹299</li>
            <li>Yearly Premium – ₹2999</li>
            <li>Subscription activates after successful payment.</li>
            <li>Premium features remain active until expiry.</li>
          </ul>

        </section>

        <section className="legal-card">
          <h2>5. Intellectual Property</h2>

          <p>
            All software, branding, logos, design,
            code and content belong to Shaliza Billing.
            Unauthorized copying or redistribution is prohibited.
          </p>

        </section>

        <section className="legal-card">
          <h2>6. Limitation of Liability</h2>

          <p>
            Shaliza Billing is not responsible for losses caused by
            incorrect user-entered information, internet outages,
            third-party payment failures or force majeure events.
          </p>

        </section>

        <section className="legal-card">
          <h2>7. Termination</h2>

          <p>
            We reserve the right to suspend or terminate accounts
            that violate these Terms or misuse the platform.
          </p>

        </section>

        <section className="legal-card">
          <h2>8. Contact</h2>

          <div className="contact-box">
            <p><strong>Company:</strong> Shaliza Billing</p>
            <p><strong>Email:</strong> shalizasupport@gmail.com</p>
            <p><strong>Phone:</strong> +91 8692826022</p>
            <p><strong>Location:</strong> Andheri, Mumbai, Maharashtra, India</p>
          </div>

        </section>

      </div>

    </div>
  );
}

export default TermsConditions;

