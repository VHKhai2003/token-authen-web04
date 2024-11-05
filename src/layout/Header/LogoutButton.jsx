import { useContext } from "react";
import { UserContext } from "../../context";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    logout();
    navigate("/");
  };

  return (
    <div
      onClick={handleLogout}
      className="text-center w-[100px] px-4 py-2 bg-white text-green-600 border border-green-500 rounded-md hover:bg-green-600 hover:text-white cursor-pointer transition "
    >
      Logout
    </div>
  );
}

export default LogoutButton;
