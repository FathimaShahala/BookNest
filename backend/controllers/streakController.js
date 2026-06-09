const ReadingStreak =
  require("../models/ReadingStreak");

const getStreak =
  async (req, res) => {
    try {

      let streak =
        await ReadingStreak.findOne({
          userId:
            req.user._id,
        });

      if (!streak) {
        streak =
          await ReadingStreak.create({
            userId:
              req.user._id,
          });
      }

      res.json(streak);

    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

const updateStreak =
  async (userId) => {

    let streak =
      await ReadingStreak.findOne({
        userId,
      });

    if (!streak) {
      streak =
        await ReadingStreak.create({
          userId,
        });
    }

    const today =
      new Date();

    const todayDate =
      new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      );

    const lastDate =
      streak.lastReadDate
        ? new Date(
            streak.lastReadDate
          )
        : null;

    if (!lastDate) {

      streak.currentStreak = 1;
      streak.longestStreak = 1;
      streak.lastReadDate =
        todayDate;

    } else {

      const previousDate =
        new Date(
          lastDate.getFullYear(),
          lastDate.getMonth(),
          lastDate.getDate()
        );

      const diffDays =
        Math.floor(
          (
            todayDate -
            previousDate
          ) /
            (1000 *
              60 *
              60 *
              24)
        );

      if (diffDays === 1) {

        streak.currentStreak += 1;

      } else if (
        diffDays > 1
      ) {

        streak.currentStreak = 1;
      }

      streak.lastReadDate =
        todayDate;

      if (
        streak.currentStreak >
        streak.longestStreak
      ) {
        streak.longestStreak =
          streak.currentStreak;
      }
    }

    await streak.save();
  };

module.exports = {
  getStreak,
  updateStreak,
};