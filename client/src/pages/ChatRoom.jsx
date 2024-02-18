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

const ChatRoom = () => {
  const { id } = useParams(); // unique id for each chat room
  const username = "Bob"; // replace with the actual username.

  return (
    <div className="container-center flex-row justify-between">

      {/* Left Sidebar */}
      {/* TODO: Make Room Components */}
      <div className="flex flex-col w-1/5 min-w-fit justify-between items-stretch">
        {/* Sidebar Content */}
        <div className="p-4 text-gray-900">
            <h1 className="text-lg font-bold mb-4">Available Rooms</h1>
            <div className="grid grid-cols-1 gap-4">

            {/* Scrollable Container for Room Components */}
            <div className="overflow-y-scroll flex flex-col items-center items-stretch space-y-3 h-96">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Room 1
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Room 2
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Room 3
                </button>


            </div>

            <hr class="my-6 border-gray-200 dark:border-gray-400" />

              <Button variant="outlined" color="inherit" startIcon={<ManageAccountsIcon/>}>
                User Settings
              </Button>

              <hr class="my-6 border-gray-200 dark:border-gray-400" />
              <Button variant="contained" startIcon={<GroupAddRoundedIcon />}>
                Join Room
              </Button>
              
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
      {/* Right Sidebar */}
      <div className="border-2 h-full"></div>
      <div className="flex flex-col w-1/5 min-w-fit justify-between items-stretch">
        <div className="p-4 text-gray-900">
            <h1 className="text-lg mb-4">Current Members</h1>
            <div className="grid grid-cols-1 gap-4">

            {/* Scrollable Container for People Components */}
            <div className="overflow-y-scroll flex flex-col items-center items-stretch space-y-3 h-96">
                {/* Buttons */}
                <Member />

            </div>

              <hr class="my-6 border-gray-200 dark:border-gray-400" />
              <Button variant="outlined" color="inherit" startIcon={<RoomPreferencesIcon />}>
                Room Settings
              </Button>

              <hr class="my-6 border-gray-200 dark:border-gray-400" />
              <Button variant="contained" color="success" endIcon={<ShareIcon />}>
                Share
              </Button>
            </div>
          </div>
      </div>

    </div>
  );
};

export default ChatRoom;
