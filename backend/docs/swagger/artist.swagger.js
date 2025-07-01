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
/**
 * @swagger
 * /api/artist/upload-song:
 *   post:
 *     summary: Upload a new song (audio + optional cover image)
 *     description: >
 *       Artists can upload an audio track (required) and an optional cover image.  
 *       After upload, the song is stored in Cloudinary, added to the artist’s profile,
 *       and a **ContentVerificationRequest** is created (status = `pending`) for admin review.
 *     tags: [Artist]
 *     security:
 *       - cookieAuth: []          # authenticated user (artist role)
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - duration
 *               - audio
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Midnight Memories"
 *               duration:
 *                 type: number
 *                 description: Song length in seconds
 *                 example: 213
 *               albumId:
 *                 type: string
 *                 description: Optional Album ObjectId
 *               audio:
 *                 type: string
 *                 format: binary
 *                 description: Audio file (MP3, WAV, etc.)
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Optional cover image (JPG/PNG, ≤ 2 MB)
 *     responses:
 *       201:
 *         description: Song uploaded successfully; awaiting admin approval
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Message:
 *                   type: string
 *                   example: Song uploaded, awaiting approval
 *                 Error:
 *                   type: integer
 *                   example: 0
 *                 Data:
 *                   $ref: '#/components/schemas/Song'   # if you have Song schema defined
 *       400:
 *         description: Missing required fields (e.g. audio file)
 *       401:
 *         description: Unauthorized – user not logged in
 *       403:
 *         description: Forbidden – user is not a verified artist
 *       500:
 *         description: Server error / Cloudinary upload failed
 */
