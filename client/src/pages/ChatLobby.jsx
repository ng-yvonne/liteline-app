import CreateRoom from "../components/popups/CreateRoom";
import JoinRoom from "../components/popups/JoinRoom";

const ChatLobby = () => {
  return (
    <div className="container-center justify-center">
      <div className="flex flex-col gap-5 border-2 w-[75%] sm:max-w-md rounded-xl px-8 py-12 sm:p-12">
        <JoinRoom />
        <CreateRoom />
      </div>
    </div>
  );
};

export default ChatLobby;
