const mongoose = require("mongoose");

const profileSchema =
  new mongoose.Schema(
    {
      userId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
      },

      profileImage: {
        type: String,
        default: "",
      },

      bio: {
        type: String,
        default: "",
      },

      favoriteGenre: {
        type: String,
        default: "",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Profile",
    profileSchema
  );