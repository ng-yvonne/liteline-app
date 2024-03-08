import { useSelector } from "react-redux";
import Divider from "@mui/material/Divider";
import Chatbox from "../components/chatbox/Chatbox";
import RightSidebar from "../components/sidebars/RightSidebar";
import LeftSidebar from "../components/sidebars/LeftSidebar";

const ChatRoom = () => {
  const { roomInfo } = useSelector((state) => state.room);

  return (
    <div className="container-center flex-row justify-between">
      {/* Left Sidebar */}
      <LeftSidebar />

      <Divider orientation="vertical" flexItem />

      <div className="flex flex-col w-4/5 min-w-fit h-full items-center">
        <div className="flex border-b-2 w-full h-16 justify-center items-center">
          {roomInfo.roomName}
        </div>

        <div className="flex flex-row w-full h-full max-h-full max-w-full">
          <Chatbox />
        </div>
      </div>

      <Divider orientation="vertical" flexItem />

      {/* Right Sidebar */}
      <RightSidebar />
    </div>
  );
};

export default ChatRoom;
