import { Fragment, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import GroupAddRoundedIcon from "@mui/icons-material/GroupAddRounded";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const JoinRoom = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const roomId = formJson.roomId;
    console.log(roomId);
    // verify if room existed
    // redirect if yes; show error message if no -> setMessage()
    handleClose();
  };

  useEffect(() => {
    setMessage("Enter the room code to join the room!");
  }, []);

  return (
    <Fragment>
      <Button
        variant="contained"
        startIcon={<GroupAddRoundedIcon />}
        onClick={handleOpen}
      >
        Join Room
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            handleSubmit(event);
          },
        }}
      >
        <DialogTitle>Enter Code</DialogTitle>
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

        <DialogContent dividers className="flex flex-col gap-4">
          <DialogContentText>{message}</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="roomId"
            name="roomId"
            label="Room Code"
            type="text"
            fullWidth
            variant="outlined"
          />
          <Button
            type="submit"
            variant="contained"
            startIcon={<GroupAddRoundedIcon />}
          >
            Join Room
          </Button>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default JoinRoom;
