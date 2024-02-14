import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import GroupAddRoundedIcon from '@mui/icons-material/GroupAddRounded';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ShareIcon from '@mui/icons-material/Share';
import RoomPreferencesIcon from '@mui/icons-material/RoomPreferences';
import ChatLobby from "./ChatLobby";

const ChatRoom = () => {
  const { id } = useParams(); // unique id for each chat room

  return (
    <div className="container-center flex-row justify-between">

      {/* Left Sidebar */}
      <div className="flex flex-col w-1/5 min-w-fit justify-between items-center">
        <div class="p-4 text-gray-900">
            <div class="grid grid-cols-1 gap-4 divide-y">

              {/* TODO: Scrollable rooms section */}

              <Button variant="outlined" color="inherit" startIcon={<ManageAccountsIcon/>}>
                User Settings
              </Button>

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
        
        <div className="flex flex-row w-full h-full">
          <div className="flex flex-col w-3/4 min-w-fit justify-center items-center">Chat</div>
        </div>
        
      </div>
      
      {/* TODO: Spacing for both sidebars*/}
      {/* Right Sidebar */}
      <div className="border-2 h-full"></div>
      <div className="flex flex-col w-1/5 min-w-fit justify-between items-center">
        <div class="p-4 text-gray-900">
            <div class="grid grid-cols-1 gap-4 divide-y">

              {/* TODO: Scrollable people in a room section */}

              <Button variant="outlined" color="inherit" startIcon={<RoomPreferencesIcon />}>
                Room Settings
              </Button>

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
