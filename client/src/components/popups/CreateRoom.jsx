import { Fragment, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const CreateRoom = () => {
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
    const roomName = formJson.roomName;
    console.log(roomName);
    // room name doesn't need to be unique
    // create and redirect to new room
    handleClose();
  };

  useEffect(() => {
    setMessage("Give your new room a personality with a name!");
  }, []);

  return (
    <Fragment>
      <Button
        variant="contained"
        color="secondary"
        startIcon={<AddRoundedIcon />}
        onClick={handleOpen}
      >
        Create Room
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
        <DialogTitle>Create Your Room</DialogTitle>
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
            id="roomName"
            name="roomName"
            label="Room Name"
            type="text"
            fullWidth
            variant="outlined"
            color="secondary"
          />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            startIcon={<AddRoundedIcon />}
          >
            Create Room
          </Button>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default CreateRoom;
