const express =
  require("express");

const router =
  express.Router();

const upload =
  require(
    "../middleware/profileUploadMiddleware"
  );

router.post(
  "/",
  upload.single(
    "image"
  ),
  (req, res) => {
    res.json({
      imageUrl:
        `http://localhost:5000/uploads/profile-images/${req.file.filename}`,
    });
  }
);

module.exports =
  router;