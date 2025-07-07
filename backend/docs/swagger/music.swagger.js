/**
 * @swagger
 * tags:
 *   - name: Song
 *     description: Public song playback endpoints
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
 * /api/songs/{id}/stream:
 *   get:
 *     summary: Stream a song with HTTP Range support
 *     description: >
 *       Returns the audio stream for a given song ID.  
 *       Supports `Range` requests so the client can seek within the track.
 *     tags: [Song]
 *     security:
 *       - cookieAuth: []      # remove if endpoint is fully public
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the song
 *       - in: header
 *         name: Range
 *         required: false
 *         description: >
 *           HTTP Range header (e.g. `bytes=0-`) sent automatically by browsers
 *           when seeking audio/video.
 *         schema:
 *           type: string
 *           example: bytes=0-
 *     responses:
 *       206:
 *         description: Partial audio content is being streamed
 *         content:
 *           audio/mpeg:
 *             schema:
 *               type: string
 *               format: binary
 *       200:
 *         description: Full audio content (if client did not send Range header)
 *         content:
 *           audio/mpeg:
 *             schema:
 *               type: string
 *               format: binary
 *       401:
 *         description: Unauthorized – user not logged in
 *       404:
 *         description: Song not found
 *       500:
 *         description: Server or Cloudinary proxy error
 */
