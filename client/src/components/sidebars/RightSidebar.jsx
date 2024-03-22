import { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import RoomSettings from "../popups/RoomSettings";
import ShareRoom from "../popups/ShareRoom";
import Member from "../member/Member";
import { setUserInfo } from "../../store/user/userSlice";
import { setRoomInfo } from "../../store/room/roomSlice";
import { setInfoAlert } from "../../store/notification/notificationSlice";
import {
  isDifferentUserArray,
  sortUsersByUsernameAsc,
} from "../../utils/utility";
import { SocketContext } from "../../SocketProvider";
import socket from "../../socket";

const RightSidebar = () => {
  // const socket = useContext(SocketContext);
  const { userInfo } = useSelector((state) => state.user);
  const { roomInfo, onlineMembers } = useSelector((state) => state.room);

  const [online, setOnline] = useState([]);
  const [offline, setOffline] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const online = roomInfo.members.filter((member) => {
      if (onlineMembers.some((on) => on.uid === member.uid)) {
        return true;
      } else {
        return false;
      }
    });
    sortUsersByUsernameAsc(online);

    const offline = roomInfo.members.filter((member) => {
      if (online.some((on) => on.uid === member.uid)) {
        return false;
      } else {
        return true;
      }
    });
    sortUsersByUsernameAsc(offline);

    setOnline(online);
    setOffline(offline);
  }, [roomInfo.members, onlineMembers]);

  return (
    <div className="flex flex-col justify-between h-full w-1/5 min-w-fit">
      <h1 className="text-lg mt-4 text-center">Current Members</h1>
      <div className="p-4 text-gray-900 h-[74%] overflow-y-hidden">
        {/* Scrollable Container for People Components */}
        <div
          id="memberContainer"
          className="overflow-y-auto flex flex-col items-stretch space-y-3 h-full"
        >
          {online.map((member) => (
            <Member
              key={member.uid}
              name={member.username}
              isOwner={roomInfo.owner === member.uid}
              isOnline={true}
            />
          ))}
          {offline.map((member) => (
            <Member
              key={member.uid}
              name={member.username}
              isOwner={roomInfo.owner === member.uid}
              isOnline={false}
            />
          ))}
        </div>
      </div>

      <div className="p-4 flex flex-col justify-between">
        <hr className="my-6 border-gray-200 dark:border-gray-400" />

        {/* Button for Room Settings */}
        <RoomSettings />

        <hr className="my-6 border-gray-200 dark:border-gray-400" />

        {/* Button for Sharing */}
        <ShareRoom />
      </div>
    </div>
  );
};

export default RightSidebar;
