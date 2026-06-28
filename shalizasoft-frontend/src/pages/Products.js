function Products() {
  return (
    <div className="page-container">
      <h1>Products</h1>

      <div className="product-grid">

        <div className="product-card">
          <h3>Billing Software</h3>
          <p>Invoice and payment management.</p>
        </div>

        <div className="product-card">
          <h3>POS System</h3>
          <p>Retail billing and checkout software.</p>
        </div>

        <div className="product-card">
          <h3>Inventory Manager</h3>
          <p>Track stock and inventory.</p>
        </div>

        <div className="product-card">
          <h3>CRM System</h3>
          <p>Manage customers and sales.</p>
        </div>

        <div className="product-card">
          <h3>AI Writer</h3>
          <p>Generate content with AI.</p>
        </div>

      </div>
    </div>
  );
}

export default Products;