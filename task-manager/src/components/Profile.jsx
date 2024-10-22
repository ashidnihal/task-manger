import React, { useEffect, useState } from 'react';
import { logoutAPI, profileAPI } from '../services/allAPIs';
import { useNavigate } from 'react-router-dom';


function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState("");
  const getProfileData = async () => {
    try {
      
      const token = sessionStorage.getItem('access');
      if (token) {
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        };

        
        const result = await profileAPI(reqHeader);
        console.log(result);

       
        setProfile(result.data);
      } else {
        console.error("No access token found");
      }
    } catch (error) {
      
      console.error("Error fetching profile data", error);
    }
  };
  const handleLogout=async()=>{
      try {
       const refresh=sessionStorage.getItem("refresh")
       const access =sessionStorage.getItem("access")

       console.log("Refresh Token:", refresh);
        if(!refresh|| !access){
          console.error("no refresh token or access token");
          return;
        }
        const reqBody = {
          refresh: refresh
        };
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + access,
        };
  
    
        const response = await logoutAPI(reqBody,reqHeader);
console.log(response);

if (response.status === 205) {
  console.log("Logout successful:", response.data.message);
  
  sessionStorage.removeItem("access");
  sessionStorage.removeItem("refresh");
  navigate('/');
}
} catch (error) {
console.error("Logout failed:", error);
}
};
 
  useEffect(() => {
    getProfileData();
  }, []);  
  
  return (
    <div className="container">
      <div className="row align-items-center py-3">
        <div className="col-12 col-md-2 text-center">
          <img
            src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
            className="img-fluid rounded-circle"
            alt="avatar"
            width={40} 
          />
        </div>
        <div className="col-12 col-md-3 text-center text-md-left">
          <h6 className="mb-1">{profile.username}</h6>
        </div>
        <div className="col-12 col-md-4 text-center text-md-left">
          <p className="mb-0">{profile.email}</p>
        </div>
        <div className='col-12 col-md-3 text-end '>
            <button className='btn btn-danger' onClick={handleLogout}>LogOut</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
