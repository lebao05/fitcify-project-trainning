const express = require('express');
const { register } = require('../controllers/authController');
const authRoute = express.Router();
const passport = require("passport"); // ✅ <== FIXED

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication routes
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */
authRoute.post("/register", register);
authRoute.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
authRoute.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: true,
  }),
  (req, res) => {
    // Successfully logged in
    res.redirect("http://localhost:5173");
  }
);
module.exports = authRoute;
