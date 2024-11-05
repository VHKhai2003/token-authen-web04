import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context";
import LogoutButton from "./LogoutButton";

function Header() {
  const { user } = useContext(UserContext);

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-sky-500 text-white shadow-md">
      <Link to={"/"}>
        <h1 className="text-2xl font-bold">Home</h1>
      </Link>

      {/* display login and register button for unlogined user,
          display logout button for logined user */}
      {!user.email ? (
        <div className="flex space-x-4">
          <Link to={"/login"}>
            <div className="text-center w-[100px] px-4 py-2 bg-yellow-500 rounded-md hover:bg-yellow-600 transition">
              Login
            </div>
          </Link>
          <Link to={"/register"}>
            <div className="text-center w-[100px] px-4 py-2 bg-green-500 rounded-md hover:bg-green-600 transition">
              Register
            </div>
          </Link>
        </div>
      ) : (
        <div className="flex space-x-4">
          <Link to={"/profile"}>
            <div className="text-center w-[100px] px-4 py-2 bg-yellow-500 rounded-md hover:bg-yellow-600 transition">
              Profile
            </div>
          </Link>
          <LogoutButton />
        </div>
      )}
    </header>
  );
}

export default Header;
