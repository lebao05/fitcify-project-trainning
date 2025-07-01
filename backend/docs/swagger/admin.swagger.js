/**
 * @swagger
 * tags:
 *   - name: Admin
 *     description: Admin-only operations
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
 * /api/admin/users:
 *   get:
 *     summary: Get all users
 *     tags: [Admin]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *       401:
 *         description: Unauthorized – missing or invalid token
 *       403:
 *         description: Forbidden – not an admin
 */

/**
 * @swagger
 * /api/admin/users/{id}/suspend:
 *   patch:
 *     summary: Suspend a user
 *     tags: [Admin]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reason:
 *                 type: string
 *                 example: "Spamming content"
 *     responses:
 *       200:
 *         description: User suspended
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /api/admin/users/{id}/activate:
 *   patch:
 *     summary: Reactivate a suspended user
 *     tags: [Admin]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: User reactivated
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /api/admin/verification-requests:
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
 * /api/admin/verification-requests/{id}/approve:
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
 *         description: Verification approved and artist profile created
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Request not found
 */

/**
 * @swagger
 * /api/admin/verification-requests/{id}/reject:
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
 *                 example: "Insufficient information"
 *     responses:
 *       200:
 *         description: Request rejected
 *       400:
 *         description: Missing reason
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
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
 *         description: ID of the artist
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reason:
 *                 type: string
 *                 example: "Terms of service violation"
 *     responses:
 *       200:
 *         description: Artist suspended
 *       400:
 *         description: Missing reason
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Artist not found
 */

/**
 * @swagger
 * /api/admin/artists/{id}/activate:
 *   patch:
 *     summary: Reactivate an artist account
 *     tags: [Admin]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the artist
 *     responses:
 *       200:
 *         description: Artist account reactivated
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Artist not found
 */
