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
               <div style={{ position:"relative"}}>
               <img src={ profileData?.profile_image == null ?  `${process.env.PUBLIC_URL}/assets/images/avatars/user-15.jpg` : profileData.profile_image } alt="user profile" className="rounded-circle bordered" width="140" height="140" />
               <i className="ti-pencil rounded-circle bordered text-white" style={{position:"absolute",bottom:"6px",right:"20%",backgroundColor:"#464D69"}} > </i>
               <input type='file' className="rounded-circle bordered"  style={{position:"absolute",bottom:"6px",right:"20%",backgroundColor:"#464D69", width:"30px", height:"30px",opacity:0}}/>
           
               </div>
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
