const express = require("express");

const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

router.post("/", upload.single("image"), (req, res) => {

  if (!req.file) {
    return res.status(400).json({
      message: "No file uploaded",
    });
  }

  res.json({
    imageUrl: req.file.path,
  });

});

module.exports = router;