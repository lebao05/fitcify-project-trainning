/**
 * @swagger
 * /api/payment/subscribe-create:
 *   post:
 *     tags:
 *       - Payment
 *     summary: Generate a payment link for subscription plans
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - planType
 *             properties:
 *               planType:
 *                 type: string
 *                 enum: [premium, family]
 *                 description: Type of subscription plan
 *                 example: premium
 *     responses:
 *       200:
 *         description: Payment link successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 checkoutUrl:
 *                   type: string
 *                 paymentId:
 *                   type: string
 *                 subscriptionId:
 *                   type: string
 *                 orderCode:
 *                   type: number
 *       401:
 *         description: Unauthorized - user not authenticated
 *       500:
 *         description: Failed to create payment or subscription
 */

/**
 * @swagger
 * /api/payment/subscribe-cancel:
 *   post:
 *     tags:
 *       - Payment
 *     summary: Cancel a subscription and update user status
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - subscriptionId
 *             properties:
 *               subscriptionId:
 *                 type: string
 *                 description: ID of the subscription to cancel
 *                 example: "6659cb3899ad9b2df9e65a0f"
 *     responses:
 *       200:
 *         description: Subscription cancelled successfully
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Cancel subscription successfully
 *       400:
 *         description: Missing or invalid subscriptionId
 *       500:
 *         description: Failed to cancel subscription
 */

/**
 * @swagger
 * /api/payment/payment-success:
 *   get:
 *     tags:
 *       - Payment
 *     summary: Verify successful payment and activate subscription
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: orderCode
 *         required: true
 *         schema:
 *           type: number
 *         description: Order code provided by PayOS
 *     responses:
 *       200:
 *         description: Payment processed, subscription status returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Missing orderCode in query
 *       500:
 *         description: Internal server error during payment verification
 */

/**
 * @swagger
 * /api/payment/payment-cancel:
 *   get:
 *     tags:
 *       - Payment
 *     summary: Handle payment cancellation and remove related data
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: orderCode
 *         required: true
 *         schema:
 *           type: number
 *         description: Order code to identify the cancelled payment
 *     responses:
 *       200:
 *         description: Payment was cancelled and associated data removed
 *       400:
 *         description: Missing orderCode in query
 *       500:
 *         description: Failed to cancel payment or delete related records
 */
