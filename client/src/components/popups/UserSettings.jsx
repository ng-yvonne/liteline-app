import { Fragment, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const UserSettings = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateUsername = () => {};

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
              required
              margin="dense"
              id="username"
              name="username"
              label="New Username"
              type="text"
              fullWidth
              variant="standard"
            />
            <Button variant="contained" onClick={updateUsername}>
              Update
            </Button>
          </div>

          <Button color="error" variant="contained" onClick={logout}>
            Logout
          </Button>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default UserSettings;
