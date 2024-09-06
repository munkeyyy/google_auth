import { Modal } from "antd";
import { useContext, useEffect, useRef, useState } from "react";
import GoogleLogin from "./GoogleLogin";
import { UserContext } from "../Contexts/User.context";
import axios from "axios";
import Cookies from "js-cookie"
// import { googleLogout, useGoogleLogin } from "@react-oauth/google";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShowing, setIsShowing] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    window.google.accounts.id.disableAutoSelect(); // Disable automatic sign-in
    setUser(null); // Clear user data from state
 
    console.log(document.cookie)
    // Optionally revoke the token
    if (user) {
      window.google.accounts.id.revoke(user.email, (done) => {
        console.log("User signed out.");
      });
    }
  };
  useEffect(() => {
    // getToken()
  }, []);

  const getToken = async () => {
    try {
      const response = await axios.get("http://localhost:8000/auth/google");
      console.log("token", response.data.token); // Store token
    } catch (err) {
      console.error("Error fetching token:", err);
    }
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //   useEffect(
  //     () => {
  //         console.log(user)
  //         if (user) {
  //             console.log("user",user)
  //             axios
  //                 .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
  //                     headers: {
  //                         Authorization: `Bearer ${user.access_token}`,
  //                         Accept: 'application/json'
  //                     }
  //                 })
  //                 .then((res) => {
  //                     console.log(res.data)
  //                     setProfile(res.data);
  //                 })
  //                 .catch((err) => console.log(err));
  //         }
  //     },
  //     [ user ]
  // );

  // const logOut = () => {
  //   googleLogout();
  //   setProfile(null)
  // };
  const showButton = () => {
    setIsShowing(!isShowing);
  };

  const handleGoogleLogin = async () => {
    try {
      // Get the Google authentication URL from the backend
      const response = await axios.get('http://localhost:8000/auth/google/url');
      const authUrl = response.data;
      
      // Redirect the user to the Google authentication page
      window.location.href = authUrl;
    } catch (error) {
      console.error('Error fetching Google auth URL:', error);
    }
  };
  return (
    <div className="flex items-center justify-between">
      <p className="text-white font-bold text-2xl">Logo</p>
      {user ? (
        <div className="flex flex-col gap-4">
          
          <div className="block">
            {console.log(user)}
            <p>{user.name}</p>
            <button
              onClick={handleSignOut}
              className="text-white bg-gray-400 border border-black"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={showModal}
          className="text-slate-300 tarnsition-all cursor pointer hover:text-white"
        >
          Login
        </div>
      )}

      <Modal
        title="Login"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form action="">
          <div className=" my-8 flex items-center w-[25vw] mx-auto justify-center flex-col gap-6">
            <input
              className="border border-gray-200 p-2 rounded-md w-full"
              type="text"
              placeholder="username"
            />
            <input
              className="border border-gray-200 p-2 rounded-md w-full"
              type="password"
              placeholder="password"
            />
          </div>
          <p className="text-center text-gray">Or</p>
          <div className="flex items-center justify-center my-2">
            {/* <GoogleLogin handleCancel={handleCancel}/> */}
            {/* <a href="https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&response_type=code&client_id=824517453804-4nv0lhl83s0kfe9ofn9sqsdjp2rrskf0.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Fauth%2Fgoogle" target="_self">
              Login with google
            </a> */}

            <button onClick={handleGoogleLogin}>Login with google</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Navbar;
