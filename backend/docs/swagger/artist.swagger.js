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
 *     summary: Upload a new song (audio + optional image)
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
 *               - audioFile
 *             properties:
 *               title:
 *                 type: string
 *                 description: Song title
 *               albumId:
 *                 type: string
 *                 description: Optional album ID to associate song with
 *               audioFile:
 *                 type: string
 *                 format: binary
 *                 description: Audio file (.mp3, .wav, etc.)
 *               imageFile:
 *                 type: string
 *                 format: binary
 *                 description: Optional image file for song cover
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

