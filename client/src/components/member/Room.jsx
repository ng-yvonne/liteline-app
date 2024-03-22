import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useJoinRoomMutation } from "../../store/room/roomApiSlice";
import { setRoomInfo } from "../../store/room/roomSlice";
import {
  setSuccessAlert,
  setErrorAlert,
} from "../../store/notification/notificationSlice";
import { SocketContext } from "../../SocketProvider";
import socket from "../../socket";

const Room = ({ name, roomId }) => {
  // const socket = useContext(SocketContext);
  let { roomCode } = useParams();
  const { roomInfo } = useSelector((state) => state.room);
  const [joinRoom, { isLoading }] = useJoinRoomMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onJoinRoom = async () => {
    console.log(roomCode);
    if (roomInfo?.roomCode === roomId && roomCode) return;
    try {
      const roomData = await joinRoom({ roomCode: roomId }).unwrap();
      dispatch(setRoomInfo({ ...roomData }));
      socket.emit("joinRoom", roomId);
      dispatch(setSuccessAlert(`Welcome back! Let's continue to chat!`));
      navigate("/chatroom/" + roomId);
    } catch (err) {
      dispatch(setErrorAlert(err?.data?.message || err.error));
    }
  };

  return (
    <div
      onClick={onJoinRoom}
      className={`${
        roomInfo?.roomCode === roomId ? "bg-indigo-600" : "bg-blue-950"
      } hover:bg-blue-800 text-white font-bold py-6 px-4 rounded flex items-center justify-center cursor-pointer`}
    >
      {/* Trim length of name to 18 characters */}
      {name
        ? String(name).length > 18
          ? String(name).slice(0, 15) + "..."
          : name
        : "Name Not Found!"}
    </div>
  );
};

export default Room;
