import { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import SignOut from "../authenticator/Signout";
import Loader from "../loader/Loader";
import socket from "../../socket";
import { useUpdateUserMutation } from "../../store/user/userApiSlice";
import { setUserInfo } from "../../store/user/userSlice";
import {
  setSuccessAlert,
  setErrorAlert,
  setInfoAlert,
} from "../../store/notification/notificationSlice";

const UserSettings = () => {
  const [open, setOpen] = useState(false);
  const [newUsername, setNewUsername] = useState(""); // State to store the new username input
  const [isEditing, setIsEditing] = useState(false); // State to track whether username is being edited
  const { userInfo } = useSelector((state) => state.user);
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setIsEditing(false);
    setOpen(false);
  };

  const onEdit = () => {
    setIsEditing(!isEditing);
  };

  const onSave = async () => {
    if (userInfo.username === newUsername) {
      dispatch(setInfoAlert("Same username, no update required."));
    } else {
      try {
        const res = await updateUser({ username: newUsername }).unwrap();
        socket.emit("updateUsername", newUsername);
        dispatch(setUserInfo({ ...res }));
        dispatch(setSuccessAlert("Username updated."));
        handleClose();
      } catch (err) {
        setIsEditing(false);
        dispatch(setErrorAlert(err?.data?.message || err.error));
      }
    }
  };

  useEffect(() => {
    if (userInfo) {
      setNewUsername(userInfo.username);
    }
  }, [open, userInfo]);

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  return (
    <Fragment>
      <Button
        variant="outlined"
        color="inherit"
        startIcon={<ManageAccountsIcon />}
        className="flex-grow"
        onClick={handleOpen}
      >
        User Settings
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "div",
        }}
      >
        <DialogTitle>User Settings</DialogTitle>
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

        <DialogContent dividers className="flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <TextField
              autoFocus
              margin="dense"
              id="username"
              name="username"
              label="Username"
              type="text"
              disabled={!isEditing}
              fullWidth
              variant="standard"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)} // Update the new username state when the input value changes
            />
            <div>
              {isEditing ? (
                <Button
                  variant="contained"
                  className="w-full"
                  color="secondary"
                  onClick={onSave}
                >
                  Save Changes
                </Button>
              ) : (
                <Button variant="contained" className="w-full" onClick={onEdit}>
                  Edit
                </Button>
              )}
            </div>
          </div>

          <SignOut />
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default UserSettings;
