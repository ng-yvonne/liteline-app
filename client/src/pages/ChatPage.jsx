import { Routes, Route } from "react-router-dom";

import ChatLobby from "./ChatLobby";
import ChatRoom from "./ChatRoom";

const ChatPage = () => {
  return (
    <Routes>
      <Route index element={<ChatLobby />} />
      <Route path=":id" element={<ChatRoom />} />
    </Routes>
  );
};

export default ChatPage;
