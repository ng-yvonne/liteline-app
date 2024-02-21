import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const LeaveRoom = ({ roomName }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const leaveRoom = () => {
    // remove this member from the room
    // redirect to lobby
    navigate("/chatroom");
  };

  return (
    <Fragment>
      <Button color="error" variant="contained" onClick={handleOpen}>
        Leave Room
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "div",
        }}
      >
        <DialogTitle>Leave Room</DialogTitle>
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
            Are you sure you want to leave <b>{roomName}</b>? You won't be able
            to rejoin this room unless you are re-invited.
          </DialogContentText>

          <Button
            color="error"
            variant="contained"
            onClick={leaveRoom}
            className="flex gap-1.5"
          >
            {`Yes, I want to leave `}
            {<b>{roomName}</b>}
          </Button>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default LeaveRoom;
