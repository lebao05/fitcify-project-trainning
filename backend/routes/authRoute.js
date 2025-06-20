const express = require("express");
const { register, sendOtp } = require("../controllers/authController");
const authRoute = express.Router();
const passport = require("passport");

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
 *         description: Email already exists
 */
authRoute.post("/register", register);
authRoute.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
authRoute.get(
  "/google/callback",
  (req, res, next) => {
    // This middleware is to handle the case where the user is not authenticated
    try {
      passport.authenticate("google", {
        failureRedirect: "/login",
        session: true,
      })(req, res, next);
    } catch (error) {}
  },
  (req, res) => {
    res.redirect("http://localhost:5173");
  }
);
authRoute.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);
// Facebook OAuth callback
authRoute.get(
  "/facebook/callback",
  (req, res, next) => {
    // This middleware is to handle the case where the user is not authenticated
    try {
      passport.authenticate("facebook", {
        failureRedirect: "/login",
        session: true,
      })(req, res, next);
    } catch (error) {}
  },
  passport.authenticate("facebook", {
    failureRedirect: "/login",
    session: true,
  }),
  (req, res) => {
    res.redirect("http://localhost:5173");
  }
);
/**
 * @swagger
 * /api/auth/send-otp:
 *   post:
 *     summary: Send OTP to email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *       400:
 *         description: Email is required
 */

authRoute.post("/send-otp", sendOtp);

module.exports = authRoute;
