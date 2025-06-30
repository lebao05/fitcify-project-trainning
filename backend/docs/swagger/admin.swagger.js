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

/**
 * @swagger
 * /api/admin/artists/verification-requests:
 *   get:
 *     summary: Get all pending artist verification requests
 *     tags: [Admin]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched verification requests
 *       401:
 *         description: Unauthorized – missing or invalid token
 *       403:
 *         description: Forbidden – not an admin
 */

/**
 * @swagger
 * /api/admin/artists/{id}/approve:
 *   patch:
 *     summary: Approve an artist verification request
 *     tags: [Admin]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the verification request
 *     responses:
 *       200:
 *         description: Verification approved
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden – not an admin
 *       404:
 *         description: Request not found
 */
/**
 * @swagger
 * /api/admin/artists/{id}/reject:
 *   patch:
 *     summary: Reject an artist verification request
 *     tags: [Admin]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the verification request
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reason:
 *                 type: string
 *                 example: "Insufficient documents"
 *     responses:
 *       200:
 *         description: Verification rejected
 *       400:
 *         description: Missing reason
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden – not an admin
 *       404:
 *         description: Request not found
 */
/**
 * @swagger
 * /api/admin/artists/{id}/suspend:
 *   patch:
 *     summary: Suspend an artist account
 *     tags: [Admin]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the artist user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reason:
 *                 type: string
 *                 example: "Violation of terms"
 *     responses:
 *       200:
 *         description: Artist suspended
 *       400:
 *         description: Missing reason
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden – not an admin
 *       404:
 *         description: User not found
 */
/**
 * @swagger
 * /api/admin/artists/{id}/activate:
 *   patch:
 *     summary: Reactivate a suspended artist account
 *     tags: [Admin]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the artist user
 *     responses:
 *       200:
 *         description: Artist account reactivated
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden – not an admin
 *       404:
 *         description: User not found
 */
