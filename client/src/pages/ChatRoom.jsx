import { useParams } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Chatbox from "../components/chatbox/Chatbox";
import RightSidebar from "../components/sidebars/RightSidebar";
import LeftSidebar from "../components/sidebars/LeftSidebar";
import { connect } from "react-redux";

const ChatRoom = () => {
  const { roomCode } = useParams(); // unique id for each chat room
  const roomName = "CPSC 559 Study Group"; // placeholder for room name
  const isRoomOwner = true; // true if current user == room owner; false otherwise

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
          <Chatbox />
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

export default ChatRoom;
