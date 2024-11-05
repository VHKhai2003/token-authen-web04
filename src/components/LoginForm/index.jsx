import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { UserContext } from "../../context";

function LoginForm() {
  const { login } = useContext(UserContext);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  // password has required attribute
  const [isValidEmail, setIsValidEmail] = useState(true);
  const navigate = useNavigate();

  // call api
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_HOST}/login`,
        JSON.stringify({
          password,
          email,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      // update usercontext
      login(response.data.data);

      navigate("/");
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

    toast.promise(handleLogin(), {
      pending: "Login...",
      error: {
        render({ data }) {
          console.log(data);
          return data.message;
        },
      },
      // error: "Incorrect email or password",
    });
    setIsValidEmail(true);
  };

  return (
    <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
      <div className="bg-white rounded-lg shadow w-96">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
          <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Log in to your account
          </h1>

          {/* Login form */}
          <form
            className="space-y-4 md:space-y-6"
            action="#"
            onSubmit={handleSubmit}
          >
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
                placeholder="vhkhai@gmail.com"
                required=""
              />
              {!isValidEmail && (
                <div className="text-red-500">*Invalid email</div>
              )}
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
                required=""
              />
            </div>
            <div className="flex items-center justify-between">
              <a
                href="#"
                className="text-sm font-medium text-sky-500 hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-sky-500 hover:bg-sky-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Sign in
            </button>

            {/* Go to Register page */}
            <p className="text-sm font-light text-gray-500 text-center">
              Don't have an account yet?{" "}
              <Link
                to={"/register"}
                className="font-medium text-sky-500 hover:underline"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
