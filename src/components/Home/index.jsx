import { useContext, useEffect } from "react";
import { UserContext } from "../../context";

function Home() {
  const { user } = useContext(UserContext);
  return (
    <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
      <h2 className="text-4xl font-semibold text-gray-700">
        {user.email ? `Hi ${user.email}` : "Welcome to Home Page!"}
      </h2>
    </div>
  );
}

export default Home;
