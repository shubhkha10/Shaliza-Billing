import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Dashboard from "./pages/Dashboard";
import Billing from "./pages/Billing";
import Inventory from "./pages/Inventory";
import CRM from "./pages/CRM";
import AITools from "./pages/AITools";
import Settings from "./pages/Settings";

import Customers from "./pages/billing/Customers";
import Products from "./pages/billing/Products";
import Invoices from "./pages/billing/Invoices";
import Reports from "./pages/billing/Reports";

import ProtectedRoute from "./components/ProtectedRoute";
import Subscription from "./pages/Subscription";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Payments from "./pages/Payment";
import Calculator from "./pages/Calculator";
// import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsCondition";
import RefundPolicy from "./pages/RefundPolicy";
import Help from "./pages/Help";

function App() {
  return (
    <BrowserRouter>

      <Header />

      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        

        {/* PROTECTED APP */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout><Dashboard /></Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/billing"
          element={
            <ProtectedRoute>
              <Layout><Billing /></Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/inventory"
          element={
            <ProtectedRoute>
              <Layout><Inventory /></Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/crm"
          element={
            <ProtectedRoute>
              <Layout><CRM /></Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/ai-tools"
          element={
            <ProtectedRoute>
              <Layout><AITools /></Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Layout><Settings /></Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/billing/customers"
          element={
            <ProtectedRoute>
              <Layout><Customers /></Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/billing/products"
          element={
            <ProtectedRoute>
              <Layout><Products /></Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/billing/invoices"
          element={
            <ProtectedRoute>
              <Layout><Invoices /></Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Layout><Reports /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
  path="/subscription"
  element={
    <ProtectedRoute>
      <Layout>
        <Subscription />
      </Layout>
    </ProtectedRoute>
  }
/>
<Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>

<Route
  path="/reset-password/:token"
  element={<ResetPassword />}
/>
  <Route
  path="/payments"
  element={
    <ProtectedRoute>
      <Layout>
        <Payments />
      </Layout>
    </ProtectedRoute>
  }
/>
<Route
  path="/calculator"
  element={
    <ProtectedRoute>
      <Layout>
        <Calculator />
      </Layout>
    </ProtectedRoute>
  }
/>
<Route
  path="/privacy-policy"
  element={<PrivacyPolicy />}
/>

<Route
  path="/terms"
  element={<TermsConditions />}
/>

<Route
  path="/refund-policy"
  element={<RefundPolicy />}
/>
<Route
  path="/help"
  element={
    <ProtectedRoute>
      <Layout>
        <Help />
      </Layout>
    </ProtectedRoute>
  }
/>

      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;