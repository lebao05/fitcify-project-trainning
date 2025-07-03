/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: User profile and account management
 * components:
 *   securitySchemes:
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: accessToken
 */

/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     tags: [Users]
 *     summary: Get current user's public profile info
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved profile info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Error:
 *                   type: integer
 *                   example: 0
 *                 Message:
 *                   type: string
 *                   example: Get profile info successful
 *                 Data:
 *                   type: object
 *                   properties:
 *                     profile:
 *                       $ref: '#/components/schemas/UserProfile'
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /api/user/followed-artists:
 *   get:
 *     tags: [Users]
 *     summary: Get artists followed by current user
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved followed artists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Error:
 *                   type: integer
 *                   example: 0
 *                 Message:
 *                   type: string
 *                   example: Get followed artists successful
 *                 Data:
 *                   type: object
 *                   properties:
 *                     artists:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/UserSummary'
 */

/**
 * @swagger
 * /api/user/profile:
 *   patch:
 *     tags: [Users]
 *     summary: Update profile (username and/or avatar)
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: newUsername
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Error:
 *                   type: integer
 *                   example: 0
 *                 Message:
 *                   type: string
 *                   example: Update profile info successful
 *                 Data:
 *                   type: object
 *                   properties:
 *                     profile:
 *                       $ref: '#/components/schemas/UserProfile'
 */

/**
 * @swagger
 * /api/user/profile/avatar:
 *   delete:
 *     tags: [Users]
 *     summary: Delete user avatar from cloud and DB
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Avatar deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Error:
 *                   type: integer
 *                   example: 0
 *                 Message:
 *                   type: string
 *                   example: Delete profile avatar successful
 *                 Data:
 *                   type: object
 *                   properties:
 *                     avatarUrl:
 *                       type: string
 *                       example: ''
 */

/**
 * @swagger
 * /api/user/account:
 *   get:
 *     tags: [Users]
 *     summary: Get full account info (email, gender, DOB)
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Account info retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Error:
 *                   type: integer
 *                   example: 0
 *                 Message:
 *                   type: string
 *                   example: Get account info successful
 *                 Data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/AccountInfo'
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /api/user/account:
 *   patch:
 *     tags: [Users]
 *     summary: Update account info (email, gender, DOB)
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: new@email.com
 *               gender:
 *                 type: string
 *                 enum: [male, female, other]
 *                 example: female
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 example: 2001-01-01
 *     responses:
 *       200:
 *         description: Account updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Error:
 *                   type: integer
 *                   example: 0
 *                 Message:
 *                   type: string
 *                   example: Update account info successful
 *                 Data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/AccountInfo'
 *       409:
 *         description: Email already in use
 */
