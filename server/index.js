const express = require("express");
const dotenv = require("dotenv");
const pg = require("pg");
const cors = require("cors");
const { Server } = require("socket.io");

// TODO: remove after testing
const { v4: uuidv4 } = require('uuid');

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
app.use(express.json());
app.use(cors());

const client = new pg.Client(config);

// password authentication failed for user
client.connect((err) => {
  if (err) throw err;
  else {
    console.log("Conncted to Azure DB.");
    const t = new Date(Date.now()).toISOString();
    const roomID = "2";
    const senderUUID = uuidv4();
    const message = "test";
    // insertMessage(t, roomID, senderUUID, message);
  }
});

app.get("/test", (req, res) => {
  res.json("test ok");
});

function insertMessage(timestamp, roomID, sender, message) {

  const query = `INSERT INTO messages (timestamp, sender, message) VALUES (\'${timestamp}\', \'${sender}\', \'${message}\')`;
  console.log(query);
  client.query(query).then(() => {
    console.log("Message sent to DB.");
  })
  .catch(err => console.log(err))
}

app.get("/messages/:roomid", async (req, res) => {
  const { roomnid } = req.params;
  // TODO: check if room exists
  // get userId from cookie
  // const userData = await getUserDataFromToken(req); // TODO: check if user in room

  const query = `SELECT * FROM from messages WHERE roomid=${roomid}`;
  const messages = [];

  client
    .query(query)
    .then((res) => {
      const rows = res.rows;

      rows.map((row) => {
        console.log(`Read: ${JSON.stringify(row)}`);
        // TODO: append message data into messages array
      });

      process.exit();
    })
    .catch((err) => {
      console.log(err);
    });

  res.json(messages);
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}.`);
});
