import React, { useState, useRef, useEffect, useContext } from "react";
import "./Chatbox.css"; // import CSS for styling
import { Button } from "@mui/material";
import Message from "./Message";
import { connect } from "react-redux";
import axios from "axios";
import { SocketContext } from "../../SocketProvider";

// Chatbox component to display the chat interface
const Chatbox = (props) => {
  const socket = useContext(SocketContext);
  const { username, roomid } = props;
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);
  const roomRef = useRef(roomid);

  useEffect(() => {
    roomRef.current = roomid;
  }, [roomid]);

  // socket for receiving and sending messages
  useEffect(() => {
    if (!socket) return;

    socket.connect();

    socket.on("message", (data) => {
      if (data) {
        setMessages((prev) => [
          ...prev,
          {
            sender: data.sender,
            content: data.content,
            timestamp: data.timestamp,
          },
        ]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  // Load room's message log from db
  useEffect(() => {
    if (roomid) {
      axios.get("/messages/" + roomid).then((res) => {
        console.log("Loaded from db: ", res.data);
        const messagesArr = res.data;
        const messageLog = [];
        for (const { message, sender, timestamp } of messagesArr) {
          messageLog.push({ sender, content: message, timestamp });
        }
        setMessages(messageLog);
      });
    }
  }, [roomid]);

  // Function to handle sending messages
  const sendMessage = () => {
    if (inputValue.trim() !== "") {
      const newMessage = {
        sender: username,
        content: inputValue,
        timestamp: new Date().toISOString(), // Add timestamp when message is sent
      };

      socket.emit("message", { ...newMessage, room: roomid });
      setMessages([...messages, newMessage]);
      setInputValue("");
    }
  };

  // Automatically scroll to the bottom of the chat window
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to handle creating commands
  const handleCommand = (command) => {
    // Add your logic here to handle different commands
    switch (command) {
      case "/clear":
        setMessages([]);
        break;
      default:
        // Command not recognized
        setMessages([
          ...messages,
          { username: "Bot", content: `Command "${command}" not recognized.` },
        ]);
        break;
    }
  };

  return (
    <div className="chatbox">
      <div className="messages-container">
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (inputValue.startsWith("/")) {
                handleCommand(inputValue);
              } else {
                sendMessage();
              }
            }
          }}
        />
        <Button variant="outlined" onClick={sendMessage}>
          Send
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  username: state.username,
});

export default connect(mapStateToProps)(Chatbox);
