/*import React from 'react';
import StripeContainer from './CheckoutForm';

function App() {
  return (
    <div>
      <h1>Stripe Payment</h1>
      <StripeContainer />
    </div>
  );
}

export default App;
*/

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import CheckoutPage from "./pages/CheckoutPage";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckoutPage />} /> {/* Ruta checkout */}
      </Routes>
    </Router>
  );
}

export default App;
