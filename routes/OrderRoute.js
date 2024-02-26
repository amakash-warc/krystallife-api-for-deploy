const express = require("express");
const router = express.Router();
const {
  getaAll,
  create,
  edit,
  destroy,
} = require("../controllers/OrderController");
const authenticateUser = require("../middleware/authentication");

router
  .route("/")
  .get(authenticateUser, getaAll)
  .post(create)
  .put(authenticateUser, edit);
router.delete("/:id", authenticateUser, destroy);
module.exports = router;
