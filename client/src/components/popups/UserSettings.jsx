import { Fragment, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { connect } from "react-redux";
import { updateUsername } from "../../actions/ActionCreators";

const UserSettings = (props) => {
  const [open, setOpen] = useState(false);
  const [newUsername, setNewUsername] = useState(props.username); // State to store the new username input
  const [isEditing, setIsEditing] = useState(false); // State to track whether username is being edited

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    // Reset username if changes not saved
    setNewUsername(props.username);
    setIsEditing(false);

    setOpen(false);
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = () => {
    props.updateUsername(newUsername);
    setIsEditing(false);
  };

  const logout = () => {};

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
                  onClick={handleSaveClick}
                >
                  Save Changes
                </Button>
              ) : (
                <Button
                  variant="contained"
                  className="w-full"
                  onClick={handleEditClick}
                >
                  Edit
                </Button>
              )}
            </div>
          </div>

          <Button color="error" variant="contained" onClick={logout}>
            Logout
          </Button>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  username: state.username,
});

export default connect(mapStateToProps, { updateUsername })(UserSettings);
