// Main Module Required..
const express = require('express');

// Created Require Files..
const controller = require('../controller/payment-info');

const router = express.Router();

/**
 * /payment-info
 * http://localhost:3000/api/payment-info
 */

router.post('/add-payment-info', controller.addPaymentInfo);
router.get('/get-payment-info', controller.getPaymentInfo);
router.put('/update-payment-info', controller.updatePaymentInfo);
router.post('/send-merchant-txn-data', controller.getPaymentStatusFromPaymentGateway);


router.post('/set-callback-token', controller.setCallbackToken);
router.get('/get-callback-token', controller.getCallbackToken);
// router.post('/set-callback-info', controller.setCallbackInfo);
// router.get('/get-callback-info', controller.getCallbackInfo);

router.post("/socket-to-api", controller.getInfoFromSocket);
router.get('/api-to-socket', controller.sendInfoToSocket);

// Export All router..
module.exports = router;
