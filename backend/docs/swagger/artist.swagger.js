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
 * /api/artist/songs:
 *   post:
 *     summary: Upload a new song (audio only)
 *     tags: [Artist]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - genre
 *               - audioFile
 *             properties:
 *               title:
 *                 type: string
 *               genre:
 *                 type: string
 *               albumId:
 *                 type: string
 *               audioFile:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Song uploaded successfully
 *       400:
 *         description: Missing required fields
 *       401:
 *         description: Unauthorized – missing or invalid token
 *       500:
 *         description: Upload or server error
 */

