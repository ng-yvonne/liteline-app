import JoinRoom from "../popups/JoinRoom";
import CreateRoom from "../popups/CreateRoom";
import UserSettings from "../popups/UserSettings";
import Room from "../member/Room";


const LeftSidebar = (props) => {
    return (
    <div className="flex flex-col justify-between w-1/5 min-w-fit h-full">
        <h1 className="text-lg font-bold mt-4 text-center">Available Rooms</h1>
        <div className="p-4 text-gray-800 h-[70%] overflow-y-hidden">

                {/* Scrollable Container for Room Components */}
                <div id="roomContainer" className="overflow-y-auto flex flex-col items-center items-stretch space-y-3 h-full">
                  {/* Example for how Room components are used */}
                    <Room name="CPSC 559 Study Group" link="/chatroom"/>
                    <Room name="413 Study Pals"/>
                    <Room name="Gaming Discussion"/>
                    {/* <Room/>
                    <Room/>
                    <Room/>
                    <Room/>
                    <Room/>
                    <Room/>
                    <Room/>
                    <Room/>
                    <Room/>
                    <Room/>
                    <Room/>
                    <Room/>
                    <Room/>
                    <Room/>
                    <Room/>
                    <Room/>
                    <Room/>
                    <Room/>
                    <Room/>
                    <Room name="Last Room 1"/>
                    <Room name="Last Room 2"/> */}
                    
                    
                  
                </div>
          </div>
          <div className="p-4 flex flex-col justify-between">
            <hr className="my-6 border-gray-200 dark:border-gray-400" />
              
            {/* Button for User Settings */}
            <UserSettings />
            
            <hr className="my-6 border-gray-200 dark:border-gray-400" />
            
            {/* Container for Join Room and Create Room buttons */}
            <div className="flex flex-col gap-4">
                {/* Buttons for Joining and Creating a Room */}
                <JoinRoom />
                <CreateRoom />
            </div>
          </div>
      </div>
    );
};

export default LeftSidebar;