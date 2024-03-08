const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const roomRoutes = require("./routes/roomRoutes");

const port = process.env.PORT || 5000;
dotenv.config();

const app = express();
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes/endpoints
app.use("/api/users", userRoutes);
app.use("/api/rooms", roomRoutes);

app.get("/", (req, res) => {
  res.json("hello backend");
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log("Server running on port " + port);
});
