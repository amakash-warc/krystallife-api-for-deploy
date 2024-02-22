// Main Module Required..
const express = require('express');

// Created Require Files..
const controller = require('../controller/mobile-payment');
const checkAdminAuth = require('../middileware/check-admin-auth');
const checkIpWhitelist = require('../middileware/check-ip-whitelist');
const router = express.Router();

/**
 * /footer-data
 * http://localhost:3000/api/footer-data
 */


router.post('/add-mobile-payment',checkIpWhitelist,checkAdminAuth, controller.addMobilePayment);
router.get('/get-all-mobile-payment', controller.getMobilePaymentData);
router.put('/update-mobile-payment',checkIpWhitelist,checkAdminAuth, controller.updateMobilePaymentData);
router.get('/get-mobile-payment-by-id/:id',checkIpWhitelist,checkAdminAuth,controller.getMobilePaymentDataById);
// Export All router..
module.exports = router;


// const footerDataRoutes = require('./routes/footer-data');
