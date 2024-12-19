/*const express = require('express');
const Stripe = require('stripe');
require('dotenv').config();

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.use(express.json());

// Endpoint pentru crearea unui PaymentIntent
app.post('/create-payment-intent', async (req, res) => {
    const { amount, currency } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            automatic_payment_methods: { enabled: true },
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(3001, () => console.log('Server running on http://localhost:3001'));
*/

const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");
require("dotenv").config();

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors());
app.use(express.json());

// Endpoint pentru crearea unui PaymentIntent
app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body; // Totalul comenzii primit de la frontend

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Suma în cenți (ex: 1000 pentru 10$)
      currency: "usd",
      metadata: { integration_check: "accept_a_payment" },
    });

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating PaymentIntent:", error.message);
    res.status(500).send({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
