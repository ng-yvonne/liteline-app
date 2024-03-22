import { useState, useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LeftSidebar from "../components/sidebars/LeftSidebar";
import WelcomeChat from "../components/chatroom/WelcomeChat";
import ChatRoom from "../components/chatroom/ChatRoom";
import { SocketContext } from "../SocketProvider";
import { useGetUserQuery } from "../store/user/userApiSlice";
import { setUserInfo } from "../store/user/userSlice";
import socket from "../socket";

const ChatPage = () => {
  // const socket = useContext(SocketContext);
  const [skip, setSkip] = useState(true);
  const { userInfo } = useSelector((state) => state.user);
  const { roomInfo } = useSelector((state) => state.room);
  const { data, isGetUserLoading } = useGetUserQuery(null, {
    skip,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isGetUserLoading && data) {
      dispatch(setUserInfo({ ...data }));
    }
  }, [data, isGetUserLoading, dispatch]);

  useEffect(() => {
    if (!userInfo) {
      setSkip(true);
    } else {
      setSkip(false);
    }
  }, [userInfo]);

  useEffect(() => {
    if (!socket) return;

    socket.connect();
    socket.emit("online");

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <Routes>
      <Route path="/*" element={<LeftSidebar />}>
        <Route index element={<WelcomeChat />} />
        <Route path=":roomCode" element={roomInfo && <ChatRoom />} />
      </Route>
    </Routes>
  );
};

export default ChatPage;
