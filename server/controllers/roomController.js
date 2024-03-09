const asyncHandler = require("express-async-handler");
const db = require("../models");
const User = db.users;
const Room = db.chatrooms;

/**
 * @desc create a new chatroom
 * @route POST /api/rooms/create
 * @access public
 */
const createRoom = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.user.uid);
  const { roomName } = req.body;

  if (!roomName) {
    res.status(400).send({ message: "Please fill in a room name" }); // 400 Bad Request
  }

  const room = await Room.create({
    name: roomName,
    owner: user.uid,
    members: [user.uid],
  });

  if (room) {
    const rooms = [...new Set([...user.rooms, room.id])];

    await user.update(
      { rooms },
      {
        where: {
          uid: user.uid,
        },
      }
    );

    return res.status(201).json({
      roomCode: room.id,
      roomName: room.name,
      owner: room.owner,
      members: room.members,
    });
  } else {
    return res
      .status(400)
      .send({ message: "Could not create room - Invalid entry" });
  }
});

/**
 * @desc join a chatroom
 * @route POST /api/rooms/join
 * @access public
 */
const joinRoom = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.user.uid);
  const { roomCode } = req.body;

  if (!roomCode) {
    return res.status(400).send({ message: "Please fill in a room code" }); // 400 Bad Request
  }

  const room = await Room.findByPk(roomCode);
  const members = [...new Set([...room.members, user.uid])];
  const rooms = [...new Set([...user.rooms, roomCode])];

  if (user && room) {
    await room.update(
      { members },
      {
        where: {
          id: roomCode,
        },
      }
    );

    await user.update(
      { rooms },
      {
        where: {
          uid: user.uid,
        },
      }
    );

    return res.status(200).json({
      roomCode: room.id,
      roomName: room.name,
      owner: room.owner,
      members: room.members,
    });
  } else {
    return res
      .status(400)
      .send({ message: "Could not join room - Invalid entry" });
  }
});

/**
 * @desc leave a chatroom
 * @route POST /api/rooms/leave
 * @access public
 */
const leaveRoom = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.user.uid);
  const { roomCode } = req.body;

  if (!roomCode) {
    return res.status(400).send({ message: "Please provide a room code" }); // 400 Bad Request
  }

  const room = await Room.findByPk(roomCode);
  const members = room.members.filter((id) => id !== user.uid);
  const rooms = user.rooms.filter((id) => id !== roomCode);

  if (user && room) {
    await room.update(
      { members },
      {
        where: {
          id: roomCode,
        },
      }
    );

    await user.update(
      { rooms },
      {
        where: {
          uid: user.uid,
        },
      }
    );

    return res.status(200).json("Successfully leave room");
  } else {
    return res
      .status(400)
      .send({ message: "Could not leave room - invalid user or room code" });
  }
});

/**
 * @desc delete a chatroom (room owner only)
 * @route POST /api/rooms/delete
 * @access private
 */
const deleteRoom = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.user.uid);
  const { roomCode } = req.body;

  if (!roomCode) {
    return res.status(400).send({ message: "Please provide a room code" }); // 400 Bad Request
  }

  const room = await Room.findByPk(roomCode);
  const rooms = user.rooms.filter((id) => id !== roomCode);

  if (user && room && user.uid === room.owner) {
    await Room.destroy({ where: { id: roomCode } });
    await user.update(
      { rooms },
      {
        where: {
          uid: user.uid,
        },
      }
    );

    return res.status(200).json("Successfully delete room");
  } else {
    return res.status(400).send({
      message:
        "Could not delete room - invalid user or room code or not room owner",
    });
  }
});

/**
 * @desc get all rooms belonging to the user
 * @route Get /api/rooms/getRooms
 * @access private
 */

const getRooms = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.user.uid);

  if (user) {
    const rooms = user.rooms;
    const roomnames = await Room.findAll({
      where: {
        id: rooms,
      },
    });
    const userRoomsInfo = roomnames.map((room) => {
      return { id: room.id, name: room.name };
    });

    return res.status(200).json(userRoomsInfo);
  } else {
    return res.status(400).send({ message: "Invalid user." });
  }
});

/**
 * @desc get users in the room
 * @route Get /api/rooms/getRoomUsers
 * @access private
 */
const getRoomUsers = asyncHandler(async (req, res) => {
  const { roomId } = req.params;
  const room = await Room.findByPk(roomId);

  if (room) {
    const owner = room.dataValues.owner;
    const memberIds = room.dataValues.members;
    const users = await User.findAll({
      where: {
        uid: memberIds,
      },
    });
    const roomMembers = users.map((user) => {
      const ownerStatus = user.dataValues.uid === owner ? true : false;
      return { uid: user.dataValues.uid, username: user.dataValues.username, owner: ownerStatus };
    })

    return res.status(200).json(roomMembers);
  } else {
    return res.status(400).send({ message: "Invalid room id given." });
  }
});

module.exports = {
  createRoom,
  joinRoom,
  leaveRoom,
  deleteRoom,
  getRooms,
  getRoomUsers,
};
