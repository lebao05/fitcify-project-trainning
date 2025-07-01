/**
 * @swagger
 * tags:
 *   - name: Artist
 *     description: End‑user Artist operations
 *
 * components:
 *   securitySchemes:
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: accessToken
 */

/**
 * @swagger
 * /api/artist/verification-request:
 *   post:
 *     summary: Submit a new artist verification request
 *     tags: [Artist]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               notes:
 *                 type: string
 *                 example: "Here are my social links and portfolio"
 *     responses:
 *       201:
 *         description: Verification request submitted
 *       400:
 *         description: Duplicate pending request or already verified
 *       401:
 *         description: Unauthorized – missing or invalid token
 */
