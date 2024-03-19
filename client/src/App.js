import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ChatPage from "./pages/ChatPage";
import ProtectedRoute from "./components/authenticator/ProtectedRoute";
import Toast from "./components/toast/Toast";

const App = () => {
  return (
    <div className="relative min-h-screen">
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route
          path="/chatroom/*"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
      <Toast />
    </div>
  );
};

export default App;
