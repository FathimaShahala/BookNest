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

module.exports = {
  getProfile,
  updateProfile
};