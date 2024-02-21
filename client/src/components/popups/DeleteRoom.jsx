import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const DeleteRoom = ({ roomName }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteRoom = () => {
    // delete the room
    // cascade delete all members
    // redirect to lobby
    navigate("/chatroom");
  };

  return (
    <Fragment>
      <Button color="secondary" variant="contained" onClick={handleOpen}>
        Delete Room
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "div",
        }}
      >
        <DialogTitle>Delete Room</DialogTitle>
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
            Are you sure you want to delete <b>{roomName}</b>? This will
            permanently delete the room <b>{roomName}</b>, chat history, and
            remove all members.
          </DialogContentText>

          <Button
            color="error"
            variant="contained"
            onClick={deleteRoom}
            className="flex gap-1.5"
          >
            {`Yes, I want to delete `}
            {<b>{roomName}</b>}
          </Button>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default DeleteRoom;
