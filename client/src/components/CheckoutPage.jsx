import React from "react";
import StripePayment from "./StripePayment";
import { useSelector } from "react-redux";

const CheckoutPage = () => {
  const { cart } = useSelector((state) => state.cart);

  // Calculează suma totală corectă
  const totalAmount = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  return (
    <div>
      <h1>Checkout</h1>
      <h3>Total: ${totalAmount.toFixed(2)}</h3>
      <StripePayment totalAmount={totalAmount} /> {/* Transmite suma */}
    </div>
  );
};

export default CheckoutPage;
