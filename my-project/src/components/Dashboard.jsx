import  { useEffect, useState } from 'react';
import axios from "axios"
const Dashboard = () => {
  // const [userInfo, setUserInfo] = useState(null);

  // useEffect(() => {
  //   const token = localStorage.getItem('authToken');
  //   if (token) {
  //     // Fetch user data using the token or make authenticated API requests
  //     fetch('http://localhost:8000/api/protected-route', {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((data) => setUserInfo(data))
  //       .catch((error) => console.error('Error fetching user data:', error));
  //   }
  // }, []);

  // useEffect(()=>{
  //   async function getInfo(){
  //     await axios.get("http://localhost:8000/userinfo",{
  //       withCredentials:true
  //     })
  //     .then((res)=>(console.log(res.data)))
  //     .catch((err)=>console.log(err))
  //   }
  //   getInfo()
  // },[])

  return (
    <div>
      <h1>Dashboard</h1>
      {/* {userInfo && <p className='text-white'>Welcome, {userInfo.name}</p>} */}
    </div>
  );
};

export default Dashboard;
