import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_your_publishable_key");

const CheckoutForm = ({ totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token"); // Token pentru autentificare

      const response = await fetch("http://localhost:3001/orders/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Token de autorizare
        },
        body: JSON.stringify({ total: totalAmount }), // Trimite suma corectă
      });

      if (!response.ok) {
        throw new Error("Failed to fetch PaymentIntent.");
      }

      const { clientSecret } = await response.json();

      // Confirmă plata cu Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      if (error) {
        setError(error.message);
      } else if (paymentIntent.status === "succeeded") {
        setMessage("Payment successful!");
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Total: ${totalAmount.toFixed(2)}</h3>
      <CardElement />
      <button type="submit" disabled={loading || !stripe}>
        {loading ? "Processing..." : `Pay $${totalAmount.toFixed(2)}`}
      </button>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {message && <div style={{ color: "green" }}>{message}</div>}
    </form>
  );
};

const StripePayment = ({ totalAmount }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm totalAmount={totalAmount} />
    </Elements>
  );
};

export default StripePayment;
