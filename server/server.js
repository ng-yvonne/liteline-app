const express = require("express");
const pg = require("pg");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const { Server } = require("socket.io");
const { createServer } = require("node:http");

// TODO: remove after testing
const { v4: uuidv4 } = require("uuid");

dotenv.config();
const config = {
  host: "chatroom-db.postgres.database.azure.com",
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: "chatroom_prod",
  port: 5432,
  ssl: true,
};
const PORT = process.env.PORT || 4000;
const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

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

app.get("/messages/:roomid", async (req, res) => {
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

app.get("/userRooms/", async (req, res) => {
  // TODO: get userdata (senderId aka uid) from cookie
  const senderId = "21ee62ed-0f62-4f5e-8535-a5e5954199bc";

  const query = `SELECT rooms FROM users WHERE uid = $1`;
  const values = [senderId];

  client
    .query(query, values)
    .then((response) => {
      const roomIds = response.rows[0].rooms;
      const rooms = [];
      // roomIds.forEach((room) => {
      //   const q = `SELECT name FROM chatrooms WHERE id = $1`;
      //   const v = [room];

      //   client.query(q, v).then((resp) => {
      //     rooms.push({ id: room, name: resp.rows[0].name });
      //   });
      //   console.log(rooms);
      // });
      res.json(roomIds);
    })
    .catch(
      (err) => console.log(err)
      // TODO: Failure recovery
    );
});

io.on("connection", (socket) => {
  console.log(`${socket.id} connected.`);
  // TODO: Compute user info from headers.cookies
  const cookies = socket.request.headers.cookies;
  // console.log("User cookies: ", cookies);
  // if (cookies) {
  //   const cookieTokenStr = cookies
  //     .split(";")
  //     .find((str) => str.startsWith("token="));
  //   if (cookieTokenStr) {
  //     const token = cookieTokenStr.split("=")[1];
  //     if (token) {
  //       jwt.verify(token, jwtSecret, {}, (err, userData) => {
  //         if (err) throw err;
  //         const { userId, username } = userData;
  //         socket.userId = userId;
  //         socket.username = username;
  //       });
  //     }
  //   }
  // }

  // set user status to online by adding them to all rooms
  socket.on("online", async () => {
    // TODO: use socket.userId to query database which room(s) user is in
    const userRooms = ["1"];

    userRooms.forEach((room) => {
      socket.join(room);
    });

    // Getting sockets from room
    const roomies = await io.in("1").fetchSockets();
    roomies.forEach((sock) => {
      console.log("Sock-id:", sock.id);
    });

    // broadcast room list to everybody so they can update their online member list
  });

  // join room
  socket.on("joinRoom", (data) => {
    // data has room id
    socket.join(data.room);

    // TODO: broadcast updated room list to everybody
    // console.log(`Users in ${data.room}: ${roomies}`);
  });

  // Receive message > Store message in db > broadcast received message to roomies
  socket.on("message", (data) => {
    const { sender, content, timestamp, room } = data;
    // TODO: get sender id from socket.userId after merging with auth stuff
    const senderId = "21ee62ed-0f62-4f5e-8535-a5e5954199bc";
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
