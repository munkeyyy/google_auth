import { useContext, useEffect } from "react";
import { UserContext } from "../Contexts/User.context";
import axios from "axios";
const Home = () => {
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    async function getInfo() {
      await axios
        .get("http://localhost:8000/user-info", {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data);
          setUser(res.data.user);
        })
        .catch((err) => console.log(err));
    }

    getInfo();
  }, []);
  return (
    <div className="h-screen flex items-center justify-center">
      {user&&<p className="text-white font-bold">hi {user.name}</p>}
    </div>
  );
};

export default Home;
