"use client";

import { useState } from "react";

export default function SubscribeButton() {
  const [loading, setLoading] = useState(false);

  async function handleSubscribe() {
    setLoading(true);
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
      });
      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Checkout error:", data.error);
        setLoading(false);
      }
    } catch (err) {
      console.error("Failed to create checkout session:", err);
      setLoading(false);
    }
  }

  return (
    <section className="subscribe-section">
      <div className="subscribe-container">
        <div className="subscribe-header">
          <span className="subscribe-prompt">$</span>
          <span className="subscribe-title">support this blog</span>
        </div>
        <p className="subscribe-description">
          $5/month can help me buy 3/4ths a gallon of gas. 
        </p>
        <button
          className="subscribe-button"
          onClick={handleSubscribe}
          disabled={loading}
        >
          {loading ? "Redirecting..." : "Subscribe — $5/mo"}
        </button>
        <p className="subscribe-note">
          Powered by Stripe. Cancel anytime.
        </p>
      </div>
    </section>
  );
}
