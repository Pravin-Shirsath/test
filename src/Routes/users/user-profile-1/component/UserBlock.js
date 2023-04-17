/**
 * User Block
 */
import { BASE_URL } from 'Api/APIConst';
import React,{useEffect,useState} from 'react';
import { NotificationManager } from 'react-notifications';
import { profileInfo } from '../../../../Api/index';

function UserBlock({GettingImage}){
   
   const [profileData, setProfileData] = useState({});
   const [image, setImage] = useState(null);

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

   
      const handleImageUpload = e => {

         const [file] = e.target.files;
         
         if (e.target.files.length) {
         
         var Obj = {
         
         preview: URL.createObjectURL(e.target.files[0]),
         
         raw: e.target.files[0]
         
         };
         console.log("newimg", Obj.raw);
        if( Obj?.raw?.type?.includes("image") ){
        
         setImage(Obj.preview)



         setProfileData ({... profileData, profile_image:Obj.preview})
         GettingImage(Obj?.raw)
       

        }else{
          NotificationManager.error("Only image format file upload ");

        }
       
         
     
         
         // setProfilePic(Obj.raw);
         
         
         
         
         }
         
         };
   

   return (
      
        
            <div className="profile-content">
               <div className="media d-flex justify-content-center align-items-center">
                  <div style={{ position:"relative"}}>
                     <img src={ profileData?.profile_image == null ?  `${process.env.PUBLIC_URL}/assets/images/avatars/user-15.jpg` : image == null ? `${BASE_URL+profileData.profile_image}`:image  } alt="user profile" className="rounded-circle bordered ml-4 mt-3" width="140" height="140" />
                     <i className="ti-pencil rounded-circle bordered text-white" style={{position:"absolute",bottom:"6px",right:"20%",backgroundColor:"#464D69"}} > </i>
                     <input type='file' className="rounded-circle bordered" onChange={handleImageUpload}  style={{position:"absolute",bottom:"6px",right:"20%",backgroundColor:"#464D69", width:"30px", height:"30px",opacity:0}}/>
                  </div>
                  <div className="media-body">
                        <div className="d-flex flex-column align-items-baseline">
                           {/* <h2 className="user-name text-white">{profileData?.first_name} {profileData?.last_name}</h2> */}
                           <h2 className="m-0">{profileData?.username}</h2>
                           <p>{profileData?.email}</p>
                        </div>
                  </div>
               </div>
            </div>
   
   );
}

export default UserBlock;
