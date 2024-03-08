const express = require("express");
const pg = require("pg");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const { Server } = require("socket.io");
const { createServer } = require("node:http");
const userRoutes = require("./routes/userRoutes");
const roomRoutes = require("./routes/roomRoutes");

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
          const { userId } = userData;
          socket.userId = userId;
          console.log(`User Id: ${socket.userId} >> connected.`);
        });
      }
    }
  }

  // set user status to online by adding them to all rooms
  socket.on("online", async () => {
    const query = `SELECT rooms FROM users WHERE uid = $1`;
    const values = [socket.userId];

    client
      .query(query, values)
      .then((response) => {
        console.log(`User Id: ${socket.userId} rooms:`, response.rows[0].rooms);
        const userRooms = response.rows[0].rooms;
        userRooms.forEach((room) => {
          socket.join(room);
        });
      })

    // Getting sockets from room
    // const roomies = await io.in("1").fetchSockets();
    // roomies.forEach((sock) => {
    //   console.log("Sock-id:", sock.id);
    // });

    // TODO: broadcast room list to everybody so they can update their online member list
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
