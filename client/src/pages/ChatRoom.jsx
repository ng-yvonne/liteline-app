import { useParams } from "react-router-dom";

const ChatRoom = () => {
  const { id } = useParams(); // unique id for each chat room

  return (
    <div className="container-center flex-row justify-between">
      <div className="flex flex-col w-1/5 min-w-fit justify-center items-center">
        Left Panel
      </div>
      <div className="border-2 h-full"></div>
      <div className="flex flex-col w-4/5 min-w-fit h-full items-center">
        <div className="flex border-b-2 w-full h-16 justify-center items-center">Chat Room Name</div>
        <div className="flex flex-row w-full h-full">
          <div className="flex flex-col w-3/4 min-w-fit justify-center items-center">Chat</div>
          <div className="border-2 h-full"></div>
          <div className="flex flex-col w-1/4 min-w-fit justify-center items-center">Right Panel</div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
