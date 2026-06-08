const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

/* Middleware */
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

/* Static Uploads */
app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);

/* Health Check */
app.get("/", (req, res) => {
  res.send("BookNest API Running");
});

/* Routes */
app.use(
  "/api/auth",
  require("./routes/authRoutes")
);

app.use(
  "/api/users",
  require("./routes/userRoutes")
);

app.use(
  "/api/books",
  require("./routes/bookRoutes")
);

app.use(
  "/api/reviews",
  require("./routes/reviewRoutes")
);

app.use(
  "/api/upload",
  require("./routes/uploadRoutes")
);

app.use(
  "/api/goals",
  require(  "./routes/goalRoutes")
);

/* 404 Handler */
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

/* Global Error Handler */
app.use(
  (err, req, res, next) => {
    console.error(err);

    res.status(
      err.status || 500
    ).json({
      message:
        err.message ||
        "Server Error",
    });
  }
);

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});