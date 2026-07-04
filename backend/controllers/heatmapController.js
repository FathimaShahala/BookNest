const Heatmap = require("../models/ReadingHeatmap");

// Save or update day
const saveHeatmap = async (req, res) => {
  try {
    const { date, pagesRead, minutesRead } = req.body;

    let record = await Heatmap.findOne({
      userId: req.user._id,
      date,
    });

    if (!record) {
      record = await Heatmap.create({
        userId: req.user._id,
        date,
        pagesRead,
        minutesRead,
      });
    } else {
      record.pagesRead += pagesRead;
      record.minutesRead += minutesRead;
      await record.save();
    }

    res.json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get heatmap data
const getHeatmap = async (req, res) => {
  try {
    const data = await Heatmap.find({
      userId: req.user._id,
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  saveHeatmap,
  getHeatmap,
};