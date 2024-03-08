const express = require("express");
const {
  createRoom,
  joinRoom,
  leaveRoom,
  deleteRoom,
} = require("../controllers/roomController.js");
const { protect } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/create", protect, createRoom);
router.post("/join", protect, joinRoom);
router.post("/leave", protect, leaveRoom);
router.post("/delete", protect, deleteRoom);

module.exports = router;
