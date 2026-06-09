const express =
  require("express");

const router =
  express.Router();

const protect =
  require(
    "../middleware/authMiddleware"
  );

const {
  getStatistics,
} = require(
  "../controllers/statsController"
);

router.get(
  "/",
  protect,
  getStatistics
);

module.exports =
  router;