const express = require("express");
const prisma = require("../prisma");
const bcrypt = require("bcrypt");
const LoginSchema = require("../dtos/auth.dtos/login.dto");
const CheckTokenSchema = require("../dtos/auth.dtos/checkToken.dto");
const { comparePassword } = require("../utils/bcryptUtils");
const { generateToken, isValidToken } = require("../utils/tokenUtils");
const { getValidationErrors } = require("../utils/validateUtils");

const router = express.Router();

// Ruta pentru înregistrare
router.post("/register", async (req, res) => {
  const { email,name,  password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json({
      success: false,
      message: "Email, name, and password are required",
    });
  }

  try {
    // Verifică dacă utilizatorul există deja
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Criptează parola
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creează utilizatorul în baza de date
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    // Generează un token JWT
    const token = generateToken(newUser.id);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: { token },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

// Ruta pentru autentificare (login)
router.post("/login", async (req, res) => {
  const validation = LoginSchema.safeParse(req.body);

  if (!validation.success) {
    const errors = getValidationErrors(validation);

    if (errors.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: errors.join(", "), data: errors });
    }
  }

  const user = await prisma.user.findFirst({
    where: {
      email: validation.data.email,
    },
  });

  if (!user) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid credentials", data: {} });
  }

  const validPassword = comparePassword(
    validation.data.password,
    user.password,
  );

  if (!user || !validPassword) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid credentials", data: {} });
  }

  const token = generateToken(user.id);

  return res
    .status(200)
    .json({ success: true, message: "User logged in", data: { token } });
});

// Ruta pentru verificarea token-ului
router.post("/check", async (req, res) => {
  const validation = CheckTokenSchema.safeParse(req.body);

  if (!validation.success) {
    const errors = getValidationErrors(validation);

    if (errors.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: errors.join(", "), data: errors });
    }
  }

  const validToken = isValidToken(validation.data.token);

  if (!validToken) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid token", data: {} });
  }

  return res
    .status(200)
    .json({ success: true, message: "Token is valid", data: {} });
});

module.exports = router;
