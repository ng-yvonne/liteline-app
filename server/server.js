const express = require("express");
const pg = require("pg");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { Server } = require("socket.io");
const { createServer } = require("node:http");
const userRoutes = require("./routes/userRoutes");
const roomRoutes = require("./routes/roomRoutes");
const db = require("./models");
const User = db.users;
const Room = db.chatrooms;

dotenv.config();
const config = {
  host: "chatroom-db.postgres.database.azure.com",
  user: process.env.PSQL_USERNAME,
  password: process.env.PSQL_PASSWORD,
  database: "chatroom_prod",
  port: 5432,
  ssl: true,
};
const jwtSecret = process.env.JWT_SECRET;
const PORT = process.env.PORT || 5000;
const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes/endpoints
app.use("/api/users", userRoutes);
app.use("/api/rooms", roomRoutes);

const client = new pg.Client(config);

client.connect((err) => {
  if (err) throw err;
  else {
    console.log("Connected to Azure DB.");
  }
});

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.get("/api/messages/:roomid", async (req, res) => {
  const { roomid } = req.params;

  // TODO: get user data from cookie > check if user is in room >
  // query database
  const query = `SELECT * FROM messages WHERE room = $1`;
  const values = [roomid];

  client
    .query(query, values)
    .then((response) => {
      const messages = response.rows;

      res.json(messages);
    })
    .catch(
      (err) => console.log(err)
      // TODO: Failure recovery
    );
});

io.on("connection", (socket) => {
  const cookies = socket.request.headers.cookie;

  if (cookies) {
    const cookieTokenStr = cookies
      .split(";")
      .find((str) => str.startsWith("jwt="));
    if (cookieTokenStr) {
      const token = cookieTokenStr.split("=")[1];
      if (token) {
        jwt.verify(token, jwtSecret, {}, (err, userData) => {
          if (err) throw err;
          const { userId, username } = userData;
          socket.userId = userId;
          socket.username = username;
          console.log(`User: ${socket.username} >> connected.`);
        });
      }
    }
  }

  // Add users to all their (socket) rooms -> Broadcast to room members the updated online list
  socket.on("online", async () => {
    const query = `SELECT rooms FROM users WHERE uid = $1`;
    const values = [socket.userId];
    client.query(query, values).then((response) => {
      console.log(`User: ${socket.username} rooms:`, response.rows[0].rooms);
      response.rows[0].rooms.forEach((room) => {
        socket.join(room);
      });

      // Broadcast online user list to the each room user is in
      const rooms = Array.from(socket.rooms).splice(1);
      rooms.forEach((room) => {
        const sockets = io.sockets.adapter.rooms.get(room);
        const onlineMembers = Array.from(sockets).map((sockId) => {
          const sockRef = io.sockets.sockets.get(sockId);
          return { uid: sockRef.userId, username: sockRef.username };
        });
        io.to(room).emit("online", { roomId: room, onlineList: onlineMembers });
      });
    });
  });

  // Broadcast online user list without user to the each room user was in
  socket.on("disconnecting", () => {
    console.log(`${socket.username} disconnected from`, socket.rooms);
    const rooms = Array.from(socket.rooms).splice(1);
    rooms.forEach((room) => {
      const sockets = io.sockets.adapter.rooms.get(room);
      const onlineMembers = [];
      Array.from(sockets).forEach((sockId) => {
        const sockRef = io.sockets.sockets.get(sockId);
        if (sockRef.userId !== socket.userId) {
          onlineMembers.push({
            uid: sockRef.userId,
            username: sockRef.username,
          });
        }
      });
      io.to(room).emit("online", { roomId: room, onlineList: onlineMembers });
    });
  });

  // Event: User joins room >> Send updated online and room member list to room clients
  socket.on("joinRoom", async (data) => {
    console.log("User joined room");
    const roomId = data;
    const onlineMembers = [];
    socket.join(roomId);

    const sockets = io.sockets.adapter.rooms.get(roomId);
    Array.from(sockets).forEach((sockId) => {
      const sockRef = io.sockets.sockets.get(sockId);
      onlineMembers.push({ uid: sockRef.userId, username: sockRef.username });
    });
    const room = await Room.findByPk(roomId);
    console.log(room);

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
        return {
          uid: user.dataValues.uid,
          username: user.dataValues.username,
          owner: ownerStatus,
        };
      });

      io.to(roomId).emit("joinRoom", {
        roomId: roomId,
        roomMembers: roomMembers,
        connected: onlineMembers,
      });
    }
  });

  // Receive message > Store message in db > broadcast received message to roomies
  socket.on("message", (data) => {
    const { sender, content, timestamp, room } = data;
    const senderId = socket.userId;
    const query = `INSERT INTO messages (timestamp, room, sender, message) VALUES ($1, $2, $3, $4)`;
    const values = [timestamp, room, senderId, content];

    client
      .query(query, values)
      .then(() => {
        socket.to(room).emit("message", { sender, content, timestamp, room });
      })
      .catch(
        (err) => console.log(err)
        // TODO: Failure recovery
      );
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected.");
  });
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}.`);
});
