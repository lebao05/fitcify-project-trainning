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

/**
 * @swagger
 * /api/artist/songs/{songId}:
 *   delete:
 *     summary: Delete a song and its associated files (audio + image)
 *     tags: [Artist]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: songId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the song to delete
 *     responses:
 *       200:
 *         description: Song deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Error:
 *                   type: number
 *                   example: 0
 *                 Message:
 *                   type: string
 *                   example: Song deleted successfully
 *       401:
 *         description: Unauthorized – must be logged in as artist
 *       404:
 *         description: Song not found
 *       500:
 *         description: Server error
 */
