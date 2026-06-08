const express = require("express");

const {
  getProfile,
  updateProfile
} = require(
  "../controllers/userController"
);

const 
  protect
 = require(
  "../middleware/authMiddleware"
);


const {
  addFavorite,
  removeFavorite,
  getFavorites,
} = require(
  "../controllers/userController"
);

const {
  addWishlist,
  removeWishlist,
  getWishlist,
} = require(
  "../controllers/userController"
);

const router = express.Router();

router.get(
  "/profile",
  protect,
  getProfile
);

router.put(
  "/profile",
  protect,
  updateProfile
);

router.post(
  "/favorites/:bookId",
  protect,
  addFavorite
);

router.delete(
  "/favorites/:bookId",
  protect,
  removeFavorite
);

router.get(
  "/favorites",
  protect,
  getFavorites
);
  
router.post(
  "/wishlist/:bookId",
  protect,
  addWishlist
);

router.delete(
  "/wishlist/:bookId",
  protect,
  removeWishlist
);

router.get(
  "/wishlist",
  protect,
  getWishlist
);

module.exports = router;