const express = require('express');
const {
  getAllArtistVerificationRequests,
  approveArtistRequest,
  rejectArtistRequest,
  suspendArtist,
  activateArtist
} = require('../controllers/artistController');

const { verifyAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.use(verifyAdmin);

/**
 * @swagger
 * tags:
 *   name: Admin - Artist
 *   description: Quản lý xác thực và tài khoản nghệ sĩ
 */

/**
 * @swagger
 * /api/admin/artists/requests:
 *   get:
 *     summary: Lấy danh sách yêu cầu xác thực artist
 *     tags: [Admin - Artist]
 *     responses:
 *       200:
 *         description: Danh sách yêu cầu
 */
router.get('/requests', getAllArtistVerificationRequests);

/**
 * @swagger
 * /api/admin/artists/{id}/approve:
 *   put:
 *     summary: Duyệt yêu cầu xác thực artist
 *     tags: [Admin - Artist]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của user
 *     responses:
 *       200:
 *         description: Đã duyệt artist
 */
router.put('/:id/approve', approveArtistRequest);

/**
 * @swagger
 * /api/admin/artists/{id}/reject:
 *   put:
 *     summary: Từ chối yêu cầu xác thực artist
 *     tags: [Admin - Artist]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Đã từ chối
 */
router.put('/:id/reject', rejectArtistRequest);

/**
 * @swagger
 * /api/admin/artists/{id}/suspend:
 *   put:
 *     summary: Khoá tài khoản artist
 *     tags: [Admin - Artist]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tài khoản đã bị khoá
 */
router.put('/:id/suspend', suspendArtist);

/**
 * @swagger
 * /api/admin/artists/{id}/activate:
 *   put:
 *     summary: Mở khoá tài khoản artist
 *     tags: [Admin - Artist]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tài khoản đã được kích hoạt lại
 */
router.put('/:id/activate', activateArtist);

module.exports = router;
