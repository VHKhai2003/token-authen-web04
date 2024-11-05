import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function ProfileCard() {
  const { user, logout } = useContext(UserContext);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // check login
    if (!user.accessToken) {
      navigate("/login");
      return;
    }
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_HOST}/profile`,
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          }
        );
        // console.log(response.data.data);
        const createdAt = new Date(response.data.data.createdAt);
        setProfile({
          email: response.data.data.email,
          username: response.data.data.username,
          createdAt: createdAt.toISOString().substring(0, 10),
        });
      } catch (error) {
        console.log(error);
        toast.error("Please login to continue", { toastId: 403 });
        // use this function to clear accessToken
        // require user login again
        logout();
        navigate("/login");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
      {profile && (
        <div className="w-[500px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col items-center pb-8 pt-4">
            <div className="text-center font-bold text-sky-800 text-3xl mb-8">
              User Profile
            </div>
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg"
              src="/avatar.jpg"
              alt="Bonnie image"
            />

            {/* Display user profile */}
            <div>
              <div className="flex items-end space-x-4 mt-4">
                <label className="block text-lg font-medium text-gray-900 w-36">
                  Email:
                </label>
                <input
                  value={profile.email}
                  readOnly
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg outline-none focus:border-sky-600 block w-full p-2"
                />
              </div>

              <div className="flex items-end space-x-4 mt-4">
                <label className="block text-lg font-medium text-gray-900 w-36">
                  Username:
                </label>
                <input
                  value={profile.username}
                  readOnly
                  type="text"
                  name="username"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg outline-none focus:border-sky-600 block w-full p-2"
                />
              </div>

              <div className="flex items-end space-x-4 mt-4">
                <label className="block text-lg font-medium text-gray-900 w-36">
                  Created at:
                </label>
                <input
                  value={profile.createdAt}
                  readOnly
                  type="date"
                  name="createdAt"
                  id="createdAt"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg outline-none focus:border-sky-600 block w-full p-2"
                />
              </div>

              <div className="flex mt-8 justify-end w-full">
                <div
                  onClick={(e) =>
                    toast.info("This function will be coming soon.")
                  }
                  className="cursor-pointer py-2 px-8 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                >
                  Edit
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileCard;
