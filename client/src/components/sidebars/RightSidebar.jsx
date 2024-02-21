import RoomSettings from "../popups/RoomSettings";
import ShareRoom from "../popups/ShareRoom";
import Member from "../member/Member";


const RightSidebar = (props) => {
    return (
    <div className="flex flex-col justify-between h-full w-1/5 min-w-fit">
        <h1 className="text-lg mt-4 text-center">Current Members</h1>
        <div className="p-4 text-gray-900 h-[74%] overflow-y-hidden">
              
              {/* Scrollable Container for People Components */}
              <div id="memberContainer" className="overflow-y-auto flex flex-col items-center items-stretch space-y-3 h-full">
                  {/* Example member components. Members should be dynamically added from the backend */}
                  <Member name="You" isOwner="true"/>
                  <Member name="Jennifer Lawrence" isOwner="false"/>
                  <Member isAFK="true"/>
                  {/* <Member name="Andrew 'Spider-Man' Garfield" isOwner="false"/>
                  <Member />
                  <Member />
                  <Member />
                  <Member />
                  <Member />
                  <Member />
                  <Member />
                  <Member />
                  <Member />
                  <Member />
                  <Member />
                  <Member />
                  <Member />
                  <Member />
                  <Member />
                  <Member />
                  <Member />
                  <Member />
                  <Member />
                  <Member />
                  <Member />
                  <Member />
                  <Member />
                  <Member />
                  <Member />
                  <Member name="Last Dude 1"/>
                  <Member name="Last Dude 2"/> */}
              </div>
          </div>
          
          <div className="p-4 flex flex-col justify-between">
              <hr className="my-6 border-gray-200 dark:border-gray-400" />
              
              {/* Button for Room Settings */}
              <RoomSettings roomName={props.roomName} isOwner={props.isRoomOwner} />
              
              <hr className="my-6 border-gray-200 dark:border-gray-400" />
              
              {/* Button for Sharing */}
              <ShareRoom roomName={props.roomName} roomCode={props.id} />
          </div>
      </div>
    );
};

export default RightSidebar;