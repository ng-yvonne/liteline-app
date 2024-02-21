import { useParams } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Chatbox from "../components/chatbox/Chatbox";
// import Member from "../components/member/Member";
// import Room from "../components/member/Room";
// import JoinRoom from "../components/popups/JoinRoom";
// import CreateRoom from "../components/popups/CreateRoom";
// import UserSettings from "../components/popups/UserSettings";
// import RoomSettings from "../components/popups/RoomSettings";
// import ShareRoom from "../components/popups/ShareRoom";
import RightSidebar from "../components/sidebars/RightSidebar";
import LeftSidebar from "../components/sidebars/LeftSidebar";

const ChatRoom = () => {
  const { id } = useParams(); // unique id for each chat room
  const username = "Bob"; // replace with the actual username
  const roomName = "CPSC 559 Study Group";
  const isRoomOwner = true;

  return (
    <div className="container-center flex-row justify-between">
      {/* Left Sidebar */}
      <LeftSidebar/>

      <Divider orientation="vertical" flexItem />

      <div className="flex flex-col w-4/5 min-w-fit h-full items-center">
        <div className="flex border-b-2 w-full h-16 justify-center items-center">
          {roomName}
        </div>

        <div className="flex flex-row w-full h-full max-h-full max-w-full">
          <Chatbox username={username} />
        </div>
      </div>

      <Divider orientation="vertical" flexItem />
      {/* Right Sidebar */}
      <RightSidebar roomName={roomName} isRoomOwner={isRoomOwner} id={id}/>

    </div>
  );
};

export default ChatRoom;
