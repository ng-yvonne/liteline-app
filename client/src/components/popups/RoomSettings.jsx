import { Fragment, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import RoomPreferencesIcon from "@mui/icons-material/RoomPreferences";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const RoomSettings = ({ roomName, isOwner }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const leaveRoom = () => {
    // remove this member from the room
    // redirect to lobby
  };

  const deleteRoom = () => {
    // delete the room
    // cascade delete all members
    // redirect to lobby
  };

  return (
    <Fragment>
      <Button
        variant="outlined"
        color="inherit"
        startIcon={<RoomPreferencesIcon />}
        className="flex-grow"
        onClick={handleOpen}
      >
        Room Settings
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "div",
        }}
      >
        <DialogTitle>Room Settings</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers className="flex flex-col gap-5">
          <DialogContentText>
            There is no going back of below actions. Please be certain.
          </DialogContentText>

          <div className="flex flex-col gap-2">
            <Button color="error" variant="contained" onClick={leaveRoom}>
              Leave Room
            </Button>
            <div className="text-xs text-gray-500">
              Are you sure you want to leave <b>{roomName}</b>? You won't be
              able to rejoin this room unless you are re-invited.
            </div>
          </div>

          {isOwner && (
            <div className="flex flex-col gap-2">
              <Button
                color="secondary"
                variant="contained"
                onClick={deleteRoom}
              >
                Delete Room
              </Button>
              <div className="text-xs text-gray-500">
                Are you sure you want to delete <b>{roomName}</b>? This will
                permanently delete the room <b>{roomName}</b>, chat history, and
                remove all members.
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default RoomSettings;
