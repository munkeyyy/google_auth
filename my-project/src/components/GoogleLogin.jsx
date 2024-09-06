import { useContext, useEffect } from "react";
import { UserContext } from "../Contexts/User.context";
import { jwtDecode } from "jwt-decode";
const GoogleLogin = ({handleCancel}) => {
//   const [user, setUser] = useState(null);
const {user, setUser}=useContext(UserContext)
  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: "824517453804-4nv0lhl83s0kfe9ofn9sqsdjp2rrskf0.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("googleSignInButton"),
      {
        theme: "outline",
        size: "large",
      }
    );
  }, []);


  const handleCredentialResponse = (response) => {
    console.log(response)
    if(response){
handleCancel()
    }
    const decodedToken = jwtDecode(response.credential);
    console.log("decoded user", decodedToken)
    setUser(decodedToken);  // Save the decoded user data
  };

  return (
    <div>
      <div id="googleSignInButton"></div>
      {user && (
        <div>
          <h3>Welcome, {user.name}</h3>
          <p>Email: {user.email}</p>
          <img src={user.picture} alt="Profile" />
        </div>
      )}
    </div>
  );
};

export default GoogleLogin;
