const paymentService = require('../services/paymentService');


async function cancelSubscription(req, res) {
  const { subscriptionId } = req.body;
  const result = await paymentService.cancelSubscription(subscriptionId);
  return res.status(result.status).json({ message: result.message });
}


async function createSubscription(req, res) {
  try {
    const { planType } = req.body;
    const userId = req.user._id; 

    const result = await paymentService.createSubscription(userId, planType);

    res.status(200).json({
      message: 'Payment link created successfully',
    });
    // return res.redirect(result.checkoutUrl);

  } catch (err) {
    console.error('[createSubscription controller] error:', err);
    res.status(500).json({ message: 'Failed to create subscription' });
  }
}

async function paymentFailure(req, res) {
  try {
    const { orderCode } = req.query;
    if (!orderCode) return res.status(400).send("Missing orderCode");

    const result = await paymentService.cancelPayment(orderCode);
    return res.status(result.status).send(result.message);

  } catch (err) {
    console.error("[cancelSubscription controller] error:", err);
    res.status(500).send("Error cancelling subscription.");
  }
}

async function paymentSuccess(req, res) {
  try {
    const { orderCode } = req.query;
    if (!orderCode) {
      return res.status(400).json({ message: 'Missing orderCode' });
    }

    const result = await paymentService.confirmPayment(Number(orderCode));
    return res.status(result.status).json({ message: result.message });

  } catch (err) {
    console.error('[paymentSuccess controller] error:', err);
    return res.status(500).json({ message: '❌ Internal server error' });
  }
}


module.exports = {
  createSubscription,
  cancelSubscription,
  paymentFailure,
  paymentSuccess,
};
