const express = require("express");
const {
  createRoom,
  joinRoom,
  leaveRoom,
  deleteRoom,
  getRooms,
} = require("../controllers/roomController.js");
const { protect } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/create", protect, createRoom);
router.post("/join", protect, joinRoom);
router.post("/leave", protect, leaveRoom);
router.post("/delete", protect, deleteRoom);
router.get("/getRooms", protect, getRooms);

module.exports = router;
