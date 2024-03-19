import { useSelector } from "react-redux";
import Authenticator from "../components/authenticator/Authenticator";
import SignOut from "../components/authenticator/Signout";

const LandingPage = () => {
  const { userInfo } = useSelector((state) => state.user);
  return (
    <div className="container-center justify-center">
      {userInfo ? <SignOut /> : <Authenticator />}
    </div>
  );
};

export default LandingPage;
