import io from "socket.io-client";
const serverUrl = "https://liteline-api.azurewebsites.net";
const socket = io(serverUrl, {
  autoConnect: false,
  withCredentials: true,
});
export default socket;
