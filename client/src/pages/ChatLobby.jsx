import Button from "@mui/material/Button";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import GroupAddRoundedIcon from '@mui/icons-material/GroupAddRounded';

const ChatLobby = () => {
  return (
    <div className="container-center justify-center">
      <div className="flex flex-col gap-5 border-2 w-[75%] sm:max-w-md rounded-xl px-8 py-12 sm:p-12">
        <Button variant="contained" startIcon={<GroupAddRoundedIcon />}>
          Join Room
        </Button>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<AddRoundedIcon />}
        >
          Create Room
        </Button>
      </div>
    </div>
  );
};

export default ChatLobby;
