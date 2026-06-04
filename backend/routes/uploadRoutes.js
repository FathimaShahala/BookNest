const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

router.post("/", (req, res) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      console.error("UPLOAD ERROR:", err);

      return res.status(500).json({
        message: err.message,
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    console.log("FILE UPLOADED:", req.file);

    res.json({
      imageUrl: `http://localhost:5000/uploads/book-covers/${req.file.filename}`,
    });
  });
});

module.exports = router;