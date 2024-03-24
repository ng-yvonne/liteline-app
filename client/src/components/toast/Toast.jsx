import { useSelector, useDispatch } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { resetNotification } from "../../store/notification/notificationSlice";

const Toast = () => {
  const dispatch = useDispatch();

  const { content, color, autoDismiss, open } = useSelector(
    (state) => state.notification
  );

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(resetNotification());
  };

  return (
    <>
      {content && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          autoHideDuration={autoDismiss}
          open={open}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={color} variant="filled">
            {content}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default Toast;
