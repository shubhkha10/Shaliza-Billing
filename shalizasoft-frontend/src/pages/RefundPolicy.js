
import "../assets/css/legal.css";

function RefundPolicy() {
  return (
    <div className="legal-page">

      <div className="legal-hero">
        <h1>Refund & Cancellation Policy</h1>
        <p>Last Updated: June 2026</p>
      </div>

      <div className="legal-container">

        <section className="legal-card">
          <h2>1. Subscription Plans</h2>

          <p>
            Shaliza Billing provides premium subscription plans
            for accessing advanced billing, reporting and business
            management features.
          </p>

          <ul>
            <li>Monthly Premium – ₹299</li>
            <li>Yearly Premium – ₹2999</li>
          </ul>

        </section>

        <section className="legal-card">
          <h2>2. Refund Policy</h2>

          <p>
            All successful subscription payments are
            <strong> non-refundable</strong>.
          </p>

          <p>
            Once a subscription has been activated and premium
            services are enabled, refunds cannot be provided.
          </p>

        </section>

        <section className="legal-card">
          <h2>3. Exceptional Cases</h2>

          <p>
            Refund requests may be reviewed only if:
          </p>

          <ul>
            <li>Duplicate payment occurred.</li>
            <li>Payment was deducted but subscription was never activated.</li>
            <li>Technical issue caused by our platform.</li>
          </ul>

        </section>

        <section className="legal-card">
          <h2>4. Cancellation</h2>

          <p>
            Users may stop using the subscription at any time.
          </p>

          <p>
            Cancelling a subscription does not make the payment
            eligible for refund. Premium access will continue until
            the subscription expiry date.
          </p>

        </section>

        <section className="legal-card">
          <h2>5. Payment Gateway</h2>

          <p>
            Payments are securely processed using Razorpay.
            Shaliza Billing never stores card or banking details.
          </p>

        </section>

        <section className="legal-card">
          <h2>6. Contact for Billing Support</h2>

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

export default RefundPolicy;