const User = require("../models/User");

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(
      req.user._id
    ).select("-password");

    res.json(user);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const updateProfile = async (
  req,
  res
) => {
  try {

    const user = await User.findById(
      req.user._id
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    user.name =
      req.body.name || user.name;

    user.bio =
      req.body.bio || user.bio;

    user.avatar =
      req.body.avatar || user.avatar;

    user.favoriteGenres =
      req.body.favoriteGenres ||
      user.favoriteGenres;

    await user.save();

    res.json(user);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const addFavorite = async (
  req,
  res
) => {
  try {
    const user =
      await User.findById(
        req.user.id
      );

    const bookId =
      req.params.bookId;

    if (
      !user.favorites.includes(
        bookId
      )
    ) {
      user.favorites.push(
        bookId
      );

      await user.save();
    }

    res.json({
      message:
        "Book added to favorites",
    });
  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
};

const removeFavorite =
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.user.id
        );

      user.favorites =
        user.favorites.filter(
          (id) =>
            id.toString() !==
            req.params.bookId
        );

      await user.save();

      res.json({
        message:
          "Book removed from favorites",
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

  const getFavorites =
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.user.id
        ).populate(
          "favorites"
        );

      res.json(
        user.favorites
      );
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };
  const addWishlist = async (
  req,
  res
) => {
  try {
    const user =
      await User.findById(
        req.user.id
      );

    const bookId =
      req.params.bookId;

    const exists =
      user.wishlist.includes(
        bookId
      );

    if (!exists) {
      user.wishlist.push(
        bookId
      );

      await user.save();
    }

    res.json({
      message:
        "Book added to wishlist",
    });
  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
};

const removeWishlist =
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.user.id
        );

      user.wishlist =
        user.wishlist.filter(
          (id) =>
            id.toString() !==
            req.params.bookId
        );

      await user.save();

      res.json({
        message:
          "Book removed from wishlist",
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };
  const getWishlist =
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.user.id
        ).populate(
          "wishlist"
        );

      res.json(
        user.wishlist
      );
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

module.exports = {
  getProfile,
  updateProfile,
  addFavorite,
  removeFavorite,
  getFavorites,
  addWishlist,
  removeWishlist,
  getWishlist
};
  