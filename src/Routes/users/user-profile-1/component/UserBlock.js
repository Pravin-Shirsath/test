/**
 * User Block
 */
import React,{useEffect,useState} from 'react';
import { profileInfo } from '../../../../Api/index';

function UserBlock(){
   const [profileData, setProfileData] = useState();

   useEffect(() => {
      getProfileInfo();
    }, [])
   
    const getProfileInfo =  () => {
      const accessToken = JSON.parse(localStorage.getItem('token'));
      console.log("Token",accessToken)
      if(accessToken !== null) {
         profileInfo(accessToken)
         .then(res => {      
            if (res?.status === 200) {
               setProfileData(res?.data);
               console.log("Profile Info ResponseData", res?.data)     
           } else if(res?.status === 400) { 
            console.log("Profile Info Response", res)    
           }
           else {
            console.log("Profile Info Response", res)    
           }
     
   
         }) .catch(err => {
            console.log(err);
          });
   
      }
    }

   return (
      
        
            <div className="profile-content">
               <div className="media align-items-center">
               <img src={`${process.env.PUBLIC_URL}/assets/images/avatars/user-15.jpg`} alt="user profile" className="rounded-circle bordered" width="140" height="140" />
                  <div className="media-body pt-25">
                        <div className="d-flex flex-column align-items-baseline">
                           <h2 className="user-name text-white">{profileData?.first_name} {profileData?.last_name}</h2>
                           <h2>{profileData?.username}</h2>
                           <p>{profileData?.email}</p>
                        </div>
                  </div>
               </div>
            </div>
   
   );
}

export default UserBlock;
