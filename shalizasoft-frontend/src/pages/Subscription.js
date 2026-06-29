import axios from "axios";
import { useEffect, useState } from "react";
import API from "../config/api";
import "../assets/css/subscription.css";

function Subscription() {
  const token = localStorage.getItem("token");

  const [subscription, setSubscription] = useState({
    subscription_type: "FREE",
    subscription_expiry: null,
  });

  useEffect(() => {
    loadSubscription();
  }, []);

  const loadSubscription = async () => {
    try {
      const res = await axios.get(`${API}/subscription/current`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSubscription(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const buyPlan = async (plan) => {
    try {
      const { data } = await axios.post(
        `${API}/subscription/create-order`,
        { plan },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const options = {
        key: data.key,
        order_id: data.id,
        amount: data.amount,
        currency: data.currency,
        name: "ShalizaSoft",
        description: `${plan} Premium Plan`,
        image: "/logo192.png",

        handler: async function (response) {
          try {
            await axios.post(
              `${API}/subscription/verify-payment`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                plan,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            alert("🎉 Premium Activated");
            loadSubscription();
          } catch (err) {
            alert(err.response?.data?.message || "Payment Failed");
          }
        },

        prefill: {
          name: data.user.name,
          email: data.user.email,
          contact: data.user.contact,
        },

        theme: { color: "#2563eb" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      alert(err.response?.data?.message || "Unable to create payment.");
    }
  };

  return (
    <div className="subscription-page">
      <h1>🚀 Upgrade Your Business</h1>

      <h3>Current Plan: {subscription.subscription_type}</h3>

      <button onClick={() => buyPlan("MONTHLY")}>Buy Monthly</button>
      <button onClick={() => buyPlan("YEARLY")}>Buy Yearly</button>
    </div>
  );
}

export default Subscription;