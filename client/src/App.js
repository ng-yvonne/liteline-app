import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import ChatPage from "./pages/ChatPage";

const App = () => {
  return (
    <div className="relative min-h-screen">
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/chatroom/*" element={<ChatPage />}></Route>
      </Routes>
    </div>
  );
};

export default App;
