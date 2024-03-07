import { useParams } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Chatbox from "../components/chatbox/Chatbox";
import RightSidebar from "../components/sidebars/RightSidebar";
import LeftSidebar from "../components/sidebars/LeftSidebar";
import { connect } from "react-redux";
import { SocketContext } from "../SocketProvider";
import { useEffect, useContext } from "react";

const ChatRoom = (props) => {
  const socket = useContext(SocketContext);
  const { roomCode } = useParams(); // unique id for each chat room
  const { username } = props;
  const roomName = "CPSC 559 Study Group"; // placeholder for room name
  const isRoomOwner = true; // true if current user == room owner; false otherwise

  useEffect(() => {
    if (!socket) return;

    socket.connect();
    socket.emit("online"); // emit online status (online)

    socket.on("result", (data) => {
      console.log(data)
    })

    return () => {
      socket.disconnect();
    }
  }, [socket])

  return (
    <div className="container-center flex-row justify-between">
      {/* Left Sidebar */}
      <LeftSidebar />

      <Divider orientation="vertical" flexItem />

      <div className="flex flex-col w-4/5 min-w-fit h-full items-center">
        <div className="flex border-b-2 w-full h-16 justify-center items-center">
          {roomName}
        </div>

        <div className="flex flex-row w-full h-full max-h-full max-w-full">
          <Chatbox roomid={roomCode} />
        </div>
      </div>

      <Divider orientation="vertical" flexItem />

      {/* Right Sidebar */}
      <RightSidebar
        roomName={roomName}
        isRoomOwner={isRoomOwner}
        roomCode={roomCode}
      />
    </div>
  );
};

// export default ChatRoom;

const mapStateToProps = (state) => ({
  username: state.username,
});

export default connect(mapStateToProps)(ChatRoom);