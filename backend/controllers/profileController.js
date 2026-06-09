const Profile =
  require("../models/Profile");

const Book =
  require("../models/Book");

const Favorite =
  require("../models/Favorite");

const Achievement =
  require("../models/Achievement");

// Get Profile
const getProfile =
  async (req, res) => {
    try {

      let profile =
        await Profile.findOne({
          userId:
            req.user._id,
        });

      if (!profile) {
        profile =
          await Profile.create({
            userId:
              req.user._id,
          });
      }

      const totalBooks =
        await Book.countDocuments({
          userId:
            req.user._id,
        });

      const completedBooks =
        await Book.countDocuments({
          userId:
            req.user._id,
          readingStatus:
            "Completed",
        });

      const favorites =
        await Book.countDocuments({
          userId:
            req.user._id,
          isFavorite: true, 
        });

      const achievements =
        await Achievement.countDocuments({
          userId:
            req.user._id,
        });

      const recentBooks =
        await Book.find({
          userId:
            req.user._id,
        })
          .sort({
            createdAt: -1,
          })
          .limit(5);

      const recentAchievements =
        await Achievement.find({
          userId:
            req.user._id,
        })
          .sort({
            createdAt: -1,
          })
          .limit(5);

      res.json({
        ...profile.toObject(),

        stats: {
          totalBooks,
          completedBooks,
          favorites,
          achievements,
        },

        recentBooks,

        recentAchievements,
      });

    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

// Update Profile
const updateProfile =
  async (req, res) => {
    try {

      let profile =
        await Profile.findOne({
          userId:
            req.user._id,
        });

      if (!profile) {
        profile =
          await Profile.create({
            userId:
              req.user._id,
          });
      }

      profile.profileImage =
        req.body.profileImage ??
        profile.profileImage;

      profile.bio =
        req.body.bio ??
        profile.bio;

      profile.favoriteGenre =
        req.body.favoriteGenre ??
        profile.favoriteGenre;

      const updatedProfile =
        await profile.save();

      res.json(
        updatedProfile
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
};