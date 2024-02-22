const express = require('express');

// Created Require Files..
const controller = require('../controller/product-generic');
// const inputValidator = require('../validation/product');
const checkAdminAuth = require('../middileware/check-admin-auth');
const checkIpWhitelist = require('../middileware/check-ip-whitelist');

// Get Express Router Function..
const router = express.Router();

/**
 * /api/generic
 * http://localhost:3000/api/generic
 */

// TAG
router.post('/add-single-generic',checkIpWhitelist,checkAdminAuth, controller.addSingleGeneric);
router.get('/get-all-tags', controller.getAllGenerics);
router.post('/add-multiple-generic',checkIpWhitelist,checkAdminAuth, controller.insertManyGeneric);
router.get('/get-generic-by-generic-id/:tagId', controller.getGenericByGenericId);
router.put('/edit-generic-by-generic',checkIpWhitelist,checkAdminAuth, controller.editGenericData);
router.delete('/delete-generic-by-id/:tagId',checkIpWhitelist,checkAdminAuth, controller.deleteGenericByGenericId);
router.post('/get-tags-by-search', controller.getGenericsBySearch);



// Export All router..
module.exports = router;
