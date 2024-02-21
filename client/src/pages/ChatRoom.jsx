import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import GroupAddRoundedIcon from '@mui/icons-material/GroupAddRounded';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ShareIcon from '@mui/icons-material/Share';
import RoomPreferencesIcon from '@mui/icons-material/RoomPreferences';
import ChatLobby from "./ChatLobby";
import Chatbox from "../components/chatbox/Chatbox";
import Member from "../components/member/Member";
import Room from "../components/member/Room";

const ChatRoom = () => {
  const { id } = useParams(); // unique id for each chat room
  const username = "Bob"; // replace with the actual username

  return (
    <div className="container-center flex-row justify-between">

      {/* Left Sidebar */}
      <div className="flex flex-col justify-between w-1/5 min-w-fit h-full">
        <h1 className="text-lg font-bold mt-4 text-center">Available Rooms</h1>
        <div className="p-4 text-gray-800 h-[70%] overflow-y-hidden">

                {/* Scrollable Container for Room Components */}
                <div id="roomContainer" className="overflow-y-auto flex flex-col items-center items-stretch space-y-3 h-full">
                  {/* Example for how Room components are used */}
                    <Room name="CPSC 559 Study Group" link="/chatroom"/>
                    <Room name="413 Study Pals"/>
                    <Room/>
                    <Room/>
                    <Room/>
                    <Room/>
                    <Room/>
                    <Room/>
                    <Room/>
                    <Room/>
                    <Room/>
                    <Room/>
                    <Room/>
                    <Room/>
                    <Room/>
                    <Room/>
                    <Room/>
                    <Room/>
                    <Room/>
                    <Room/>
                    <Room/>
                    <Room/>
                    <Room name="Last Room 1"/>
                    <Room name="Last Room 2"/>
                    
                    
                  
                </div>
          </div>
          <div className="p-4 flex flex-col justify-between">
            <hr className="my-6 border-gray-200 dark:border-gray-400" />
              
            {/* Button for User Settings */}
            <Button variant="outlined" color="inherit" startIcon={<ManageAccountsIcon/>} className="flex-grow">
                User Settings
            </Button>
            
            <hr className="my-6 border-gray-200 dark:border-gray-400" />
            
            {/* Container for Join Room and Create Room buttons */}
            <div className="flex flex-col gap-4">
                {/* Button for Joining a Room */}
                <Button variant="contained" startIcon={<GroupAddRoundedIcon />}>
                    Join Room
                </Button>
                
                {/* Button for Creating a Room */}
                <Button variant="contained" color="secondary" startIcon={<AddRoundedIcon />}>
                    Create Room
                </Button>
            </div>
          </div>
      </div>
    
      <div className="border-2 h-full"></div>

      <div className="flex flex-col w-4/5 min-w-fit h-full items-center">

        
      <div className="flex border-b-2 w-full h-16 justify-center items-center">Chat Room Name</div>
        
        <div className="flex flex-row w-full h-full max-h-full max-w-full">
            <Chatbox username={username}/>
        </div>
        
      </div>
      
      {/* TODO: Spacing for both sidebars*/}
      <div className="border-2 h-full"></div>
      {/* Right Sidebar */}
      <div className="flex flex-col justify-between h-full w-1/5 min-w-fit">
        <h1 className="text-lg mt-4 text-center">Current Members</h1>
        <div className="p-4 text-gray-900 h-[82%] overflow-y-hidden">
              
              {/* Scrollable Container for People Components */}
              <div id="memberContainer" className="overflow-y-auto flex flex-col items-center items-stretch space-y-3 h-full">
                  {/* Example member components. Members should be dynamically added from the backend */}
                  <Member name="Patrick Bateman" isOwner="true"/>
                  <Member name="Andrew 'Spider-Man' Garfield" isOwner="false"/>
                  <Member name="Jennifer Lawrence" isOwner="false"/>
                  <Member isAFK="true"/>
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
                  <Member name="Last Dude 1"/>
                  <Member name="Last Dude 2"/>
              </div>
          </div>
          
          <div className="p-4 flex flex-col justify-between">
              <hr className="my-6 border-gray-200 dark:border-gray-400" />
              
              {/* Button for Room Settings */}
              <Button variant="outlined" color="inherit" startIcon={<RoomPreferencesIcon />} className="flex-grow">
                  Room Settings
              </Button>
              
              <hr className="my-6 border-gray-200 dark:border-gray-400" />
              
              {/* Button for Sharing */}
              <Button variant="contained" color="success" endIcon={<ShareIcon />} className="flex-grow">
                  Share
              </Button>
          </div>
      </div>

    </div>
  );
};

export default ChatRoom;
