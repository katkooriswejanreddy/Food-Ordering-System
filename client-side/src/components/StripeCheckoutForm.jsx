import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

export default function StripeCheckoutForm({ total }) {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    if (!stripe || !elements) return;

    setLoading(true);

    try {
      // 1️⃣ Create PaymentIntent on backend
      const res = await axios.post("http://localhost:4000/api/payment/create-payment-intent", {
        amount: total,
      });

      const clientSecret = res.data.clientSecret;

      // 2️⃣ Confirm payment with card details
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        alert("Payment failed: " + result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        alert("🎉 Payment successful!");
      }

    } catch (err) {
      console.error(err);
      alert("Payment error");
    }

    setLoading(false);
  };

  return (
    <div className="mt-10 bg-white p-5 rounded-xl shadow border border-gray-200">
      <h2 className="text-xl font-semibold mb-3">Card Details</h2>

      <div className="border p-3 rounded">
        <CardElement />
      </div>

      <button
        onClick={handlePay}
        disabled={!stripe || loading}
        className="mt-5 bg-black text-white w-full p-4 rounded-lg text-lg hover:bg-gray-900 disabled:opacity-40"
      >
        {loading ? "Processing…" : "Pay Now"}
      </button>
    </div>
  );
}
