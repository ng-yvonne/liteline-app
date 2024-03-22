import { Fragment, useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Loader from "../loader/Loader";
import { useCreateRoomMutation } from "../../store/room/roomApiSlice";
import { setRoomInfo } from "../../store/room/roomSlice";
import {
  setSuccessAlert,
  setErrorAlert,
} from "../../store/notification/notificationSlice";
import { SocketContext } from "../../SocketProvider";
import socket from "../../socket";

const CreateRoom = () => {
  // const socket = useContext(SocketContext);
  const [open, setOpen] = useState(false);
  const [createRoom, { isLoading }] = useCreateRoomMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const roomName = formJson.roomName;

    try {
      const roomData = await createRoom({ roomName }).unwrap();
      dispatch(setRoomInfo({ ...roomData }));
      socket.emit("joinRoom", roomData.roomCode);
      dispatch(
        setSuccessAlert(`Welcome! You have created ${roomData.roomName}!`)
      );
      navigate("/chatroom/" + roomData.roomCode);
    } catch (err) {
      dispatch(setErrorAlert(err?.data?.message || err.error));
    }

    handleClose();
  };

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

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
          <DialogContentText>
            Give your new room a personality with a name!
          </DialogContentText>
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
