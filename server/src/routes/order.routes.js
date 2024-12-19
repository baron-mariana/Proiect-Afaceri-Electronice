/* fara metoda de plata
const express = require("express");
const prisma = require("../prisma");
const { getValidationErrors } = require("../utils/validateUtils");
const CreateOrderSchema = require("../dtos/order.dtos/createOrder.dto");

const router = express.Router();

router.post("/create", async (req, res) => {
  const validation = CreateOrderSchema.safeParse(req.body);

  if (!validation.success) {
    const errors = getValidationErrors(validation);

    if (errors.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: errors.join(", "), data: errors });
    }
  }

  const user = await prisma.user.findUnique({
    where: {
      id: req.userId,
    },
  });

  if (!user) {
    return res
      .status(400)
      .json({ success: false, message: "User not found", data: {} });
  }

  const order = await prisma.order.create({
    data: {
      userId: req.userId,
      ...validation.data,
      status: "PENDING",
    },
  });

  return res
    .status(200)
    .json({ success: true, message: "Order created", data: order });
});

module.exports = router;
*/

//cu metoda de plata
const express = require("express");
const prisma = require("../prisma");
const { getValidationErrors } = require("../utils/validateUtils");
const CreateOrderSchema = require("../dtos/order.dtos/createOrder.dto");
const Stripe = require("stripe");
require("dotenv").config();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Endpoint pentru crearea unei comenzi
router.post("/create", async (req, res) => {
  const validation = CreateOrderSchema.safeParse(req.body);

  if (!validation.success) {
    const errors = getValidationErrors(validation);

    if (errors.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: errors.join(", "), data: errors });
    }
  }

  const user = await prisma.user.findUnique({
    where: {
      id: req.userId,
    },
  });

  if (!user) {
    return res
      .status(400)
      .json({ success: false, message: "User not found", data: {} });
  }

  const order = await prisma.order.create({
    data: {
      userId: req.userId,
      ...validation.data,
      status: "PENDING",
    },
  });

  return res
    .status(200)
    .json({ success: true, message: "Order created", data: order });
});

// Endpoint pentru crearea unui PaymentIntent
router.post("/create-payment-intent", async (req, res) => {
  const { total } = req.body;

  if (!total || total <= 0) {
    return res.status(400).json({
      success: false,
      message: "Total amount is required and must be greater than 0",
    });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100), // Stripe cere suma în cenți
      currency: "usd",
      metadata: { integration_check: "accept_a_payment" },
    });

    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      message: "PaymentIntent created successfully",
    });
  } catch (error) {
    console.error("Stripe Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to create PaymentIntent",
      error: error.message,
    });
  }
});

module.exports = router;
