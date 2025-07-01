/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication routes
 */

/*───────────────────────── REGISTER (email + password) ─────────────────────────*/
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user with e‑mail & password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, email, password, gender, dateOfBirth]
 *             properties:
 *               username:    { type: string,  example: johndoe }
 *               email:       { type: string,  example: johndoe@gmail.com }
 *               password:    { type: string,  example: secret123 }
 *               gender:      { type: string,  enum: [male, female, other], example: male }
 *               dateOfBirth: { type: string,  format: date, example: 1995-07-12 }
 *     responses:
 *       201: { description: User registered successfully }
 *       400: { description: Email already exists }
 */

/*───────────────────────── SEND‑OTP ─────────────────────────*/
/**
 * @swagger
 * /api/auth/send-otp:
 *   post:
 *     summary: Send a 6‑digit OTP to the provided e‑mail
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email: { type: string, example: johndoe@gmail.com }
 *     responses:
 *       200: { description: OTP sent successfully }
 *       400: { description: Email is required }
 */

/*───────────────────────── SIGNUP‑WITH‑GMAIL (custom flow) ─────────────────────────*/
/**
 * @swagger
 * /api/auth/signup-gmail:
 *   post:
 *     summary: Register a new user using a Gmail address (non‑OAuth flow)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, email, password, gender, dateOfBirth]
 *             properties:
 *               username:    { type: string,  example: johngmail }
 *               email:       { type: string,  example: johngmail@gmail.com }
 *               password:    { type: string,  example: strongPass! }
 *               gender:      { type: string,  enum: [male, female, other], example: female }
 *               dateOfBirth: { type: string,  format: date, example: 1998-03-05 }
 *     responses:
 *       201: { description: Signup successful (access_token cookie set) }
 *       400: { description: Email already exists }
 */

/*───────────────────────── LOGIN (email + password) ─────────────────────────*/
/**
 * @swagger
 * /api/auth/login/password:
 *   post:
 *     summary: Log in with e‑mail & password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:       { type: string, example: johndoe@gmail.com }
 *               password:    { type: string, example: secret123 }
 *               rememberMe:  { type: boolean, example: true, description: "Persist session for 30 days" }
 *     responses:
 *       200: { description: Login successful (access_token cookie set) }
 *       401: { description: Invalid credentials }
 */
