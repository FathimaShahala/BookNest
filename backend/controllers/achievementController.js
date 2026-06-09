const Achievement =
  require("../models/Achievement");

const Book =
  require("../models/Book");

// Get All Achievements
const getAchievements =
  async (req, res) => {
    try {

      const completedBooks =
        await Book.countDocuments({
          userId:
            req.user._id,
          readingStatus:
            "Completed",
        });

      const unlockedAchievements =
        await Achievement.find({
          userId:
            req.user._id,
        });

      const unlockedTitles =
        unlockedAchievements.map(
          (achievement) =>
            achievement.title
        );

      const achievements = [
        {
          title:
            "First Book",
          description:
            "Completed your first book",
          icon: "📘",
          target: 1,
        },
        {
          title:
            "10 Books Read",
          description:
            "Completed 10 books",
          icon: "🥉",
          target: 10,
        },
        {
          title:
            "25 Books Read",
          description:
            "Completed 25 books",
          icon: "🥈",
          target: 25,
        },
        {
          title:
            "50 Books Read",
          description:
            "Completed 50 books",
          icon: "🥇",
          target: 50,
        },
        {
          title:
            "100 Books Read",
          description:
            "Completed 100 books",
          icon: "👑",
          target: 100,
        },
      ];

      const result =
        achievements.map(
          (achievement) => ({
            ...achievement,

            progress:
              completedBooks,

            unlocked:
              unlockedTitles.includes(
                achievement.title
              ),
          })
        );

      res.json(result);

    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

// Check & Unlock Achievements
const checkAchievements =
  async (userId) => {

    const completedBooks =
      await Book.countDocuments({
        userId,
        readingStatus:
          "Completed",
      });

    const existing =
      await Achievement.find({
        userId,
      });

    const titles =
      existing.map(
        (achievement) =>
          achievement.title
      );

    const achievements =
      [];

    if (
      completedBooks >= 1 &&
      !titles.includes(
        "First Book"
      )
    ) {
      achievements.push({
        title:
          "First Book",
        description:
          "Completed your first book",
        icon: "📘",
      });
    }

    if (
      completedBooks >= 10 &&
      !titles.includes(
        "10 Books Read"
      )
    ) {
      achievements.push({
        title:
          "10 Books Read",
        description:
          "Completed 10 books",
        icon: "🥉",
      });
    }

    if (
      completedBooks >= 25 &&
      !titles.includes(
        "25 Books Read"
      )
    ) {
      achievements.push({
        title:
          "25 Books Read",
        description:
          "Completed 25 books",
        icon: "🥈",
      });
    }

    if (
      completedBooks >= 50 &&
      !titles.includes(
        "50 Books Read"
      )
    ) {
      achievements.push({
        title:
          "50 Books Read",
        description:
          "Completed 50 books",
        icon: "🥇",
      });
    }

    if (
      completedBooks >= 100 &&
      !titles.includes(
        "100 Books Read"
      )
    ) {
      achievements.push({
        title:
          "100 Books Read",
        description:
          "Completed 100 books",
        icon: "👑",
      });
    }

    for (
      const achievement of achievements
    ) {
      await Achievement.create({
        userId,
        ...achievement,
      });
    }
  };

module.exports = {
  getAchievements,
  checkAchievements,
};