/**
 * @swagger
 * tags:
 *   - name: Admin
 *     description: Admin‑only operations
 *
 * components:
 *   securitySchemes:
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: accessToken       # <-- match the cookie key you set in setAuthCookie
 *
 * /api/admin/users:
 *   get:
 *     summary: Get a list of all users (admin only)
 *     tags: [Admin]
 *     security:
 *       - cookieAuth: []         # <-- requires logged‑in admin with access_token cookie
 *     responses:
 *       200:
 *         description: Users fetched successfully
 *       401:
 *         description: Missing or invalid token
 *       403:
 *         description: Forbidden – user is not an admin
 */
