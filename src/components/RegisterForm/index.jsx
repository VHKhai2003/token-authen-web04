import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidConfirmedPassword, setIsValidConfirmedPassword] =
    useState(true);

  const navigate = useNavigate();

  // call api
  const handleRegister = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_HOST}/register`,
        JSON.stringify({
          username,
          password,
          confirmedPassword,
          email,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(response.data);
      // success registration, and then navigate to login
      navigate("/login");
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // check email
    if (!emailRegex.test(email)) {
      setIsValidEmail(false);
      return;
    }

    // check confirmed password
    if (confirmedPassword !== password) {
      setIsValidConfirmedPassword(false);
      return;
    }

    toast.promise(handleRegister(), {
      pending: "Register...",
      success: "Register successfully",
      error: {
        render({ data }) {
          console.log(data);
          return data.message;
        },
      },
    });
    setIsValidConfirmedPassword(true);
    setIsValidEmail(true);
  };

  return (
    <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
      <div className="bg-white rounded-lg shadow w-96">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
          <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Create an account
          </h1>

          {/* Register form */}
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg outline-none focus:border-sky-600 block w-full p-2.5"
                placeholder="vhkhai123@gmail.com"
                required
              />
              {!isValidEmail && (
                <div className="text-red-500">*Invalid email</div>
              )}
            </div>

            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg outline-none focus:border-sky-600 block w-full p-2.5"
                placeholder="vhkhai"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg outline-none focus:border-sky-600 block w-full p-2.5"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label
                htmlFor="confirmedPassword"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Confirmed Password
              </label>
              <input
                type="password"
                name="confirmedPassword"
                id="confirmedPassword"
                value={confirmedPassword}
                onChange={(e) => setConfirmedPassword(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg outline-none focus:border-sky-600 block w-full p-2.5"
                placeholder="••••••••"
                required
              />
              {!isValidConfirmedPassword && (
                <div className="text-red-500">
                  *Confirmed Password is not correct
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full text-white bg-sky-500 hover:bg-sky-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Create an acount
            </button>

            {/* Go to login page */}
            <p className="text-sm font-light text-gray-500 text-center">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="font-medium text-sky-500 hover:underline"
              >
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
