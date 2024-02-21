import { useParams } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Chatbox from "../components/chatbox/Chatbox";
import Member from "../components/member/Member";
import Room from "../components/member/Room";
import JoinRoom from "../components/popups/JoinRoom";
import CreateRoom from "../components/popups/CreateRoom";
import UserSettings from "../components/popups/UserSettings";
import RoomSettings from "../components/popups/RoomSettings";
import ShareRoom from "../components/popups/ShareRoom";

const ChatRoom = () => {
  const { id } = useParams(); // unique id for each chat room
  const username = "Bob"; // replace with the actual username
  const roomName = "CPSC 559 Study Group";
  const isRoomOwner = true;

  return (
    <div className="container-center flex-row justify-between">
      {/* Left Sidebar */}
      <div className="flex flex-col justify-between w-1/5 min-w-fit h-full">
        <div className="p-4 text-gray-800 h-[77%]">
          <h1 className="text-lg font-bold mb-4 text-center">
            Available Rooms
          </h1>

          {/* Scrollable Container for Room Components */}
          <div
            id="roomContainer"
            className="overflow-y-auto flex flex-col items-center items-stretch space-y-3 h-full"
          >
            {/* Example for how Room components are used */}
            <Room name="CPSC 559 Study Group" link="/chatroom" />
            <Room name="413 Study Pals" />
            <Room />
            <Room />
            <Room />
            <Room />
            <Room />
            <Room />
            <Room />
            <Room />
            <Room />
            <Room />
            <Room />
            <Room />
            <Room />
            <Room />
            <Room />
            <Room />
            <Room />
            <Room />
            <Room />
            <Room />
            <Room />
            <Room />
          </div>
        </div>
        <div className="p-4 flex flex-col justify-between">
          <hr className="my-6 border-gray-200 dark:border-gray-400" />

          {/* Button for User Settings */}
          <UserSettings />

          <hr className="my-6 border-gray-200 dark:border-gray-400" />

          {/* Container for Join Room and Create Room buttons */}
          <div className="flex flex-col gap-4">
            <JoinRoom />
            <CreateRoom />
          </div>
        </div>
      </div>

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
      {/* TODO: Spacing for both sidebars*/}
      {/* Right Sidebar */}
      <div className="flex flex-col justify-between h-full w-1/5 min-w-fit">
        <div className="p-4 text-gray-900 h-[82%]">
          <h1 className="text-lg mb-4 text-center">Current Members</h1>

          {/* Scrollable Container for People Components */}
          <div
            id="memberContainer"
            className="overflow-y-auto flex flex-col items-center items-stretch space-y-3 h-full"
          >
            {/* Example member components. Members should be dynamically added from the backend */}
            <Member name="Patrick Bateman" isOwner="true" />
            <Member name="Andrew 'Spider-Man' Garfield" isOwner="false" />
            <Member name="Jennifer Lawrence" isOwner="false" />
            <Member isAFK="true" />
            <Member />
            <Member />
            <Member />
            <Member />
            <Member />
            <Member />
            <Member />
            <Member />
            <Member />
            <Member />
            <Member />
            <Member />
            <Member />
            <Member />
            <Member />
            <Member />
            <Member />
            <Member />
            <Member />
            <Member />
            <Member />
            <Member />
            <Member />
            <Member />
            <Member />
            <Member />
            <Member />
          </div>
        </div>

        <div className="p-4 flex flex-col justify-between">
          <hr className="my-6 border-gray-200 dark:border-gray-400" />

          {/* Button for Room Settings */}
          <RoomSettings roomName={roomName} isOwner={isRoomOwner} />

          <hr className="my-6 border-gray-200 dark:border-gray-400" />

          {/* Button for Sharing */}
          <ShareRoom roomName={roomName} roomCode={id} />
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
