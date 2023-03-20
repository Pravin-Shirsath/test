import React, { useState, useRef, useEffect } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Badge } from 'reactstrap';

import { NotificationManager } from 'react-notifications';
import {
   LOGOUT_USER,
   LOGIN_USER_FAILURE
} from 'Store/Actions/types';

import '../../Assets/css/main.css';
import { logoutUserFromFirebase } from 'Store/Actions';
// intl messages

import IntlMessages from 'Util/IntlMessages';
import { logOut, profileInfo, getAdminList } from '../../Api/index'

//----- React strap modaal form-1 for reset password -------//
// import React, { useState } from 'react';
import { TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import Button from '@material-ui/core/Button'
import {
   Form,
   FormGroup,
   Label,
   Input,
   FormText,
   Col,
   FormFeedback
} from 'reactstrap';
import axios from "axios";


import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import { id } from 'date-fns/locale';
import { BASE_URL } from 'Api/APIConst';
//--------------------------- END ---------------------------//

function UserBlockHorizontal(props) {
   const [userDropdownMenu, setUserDropdownMenu] = useState(false);
   const [profileData, setProfileData] = useState({});

   const history = useHistory();

   const dispatch = useDispatch();

   const logoutUser = () => {
      const accessToken = JSON.parse(localStorage.getItem('token'));
      const checkCredentials = JSON.parse(localStorage.getItem('rememberMe'));
    

      // console.log("Token", accessToken)
      if (accessToken !== null) {
         logOut(accessToken)
            .then(res => {
               console.log("ResponseData", res)
               if (res?.status === 204) {
                  console.log("ResponseData", res?.data)
                  dispatch({ type: LOGOUT_USER });
                  localStorage.removeItem('user_id');
                  localStorage.removeItem('token');
                  localStorage.removeItem('user_type');
                  localStorage.removeItem('isLoggedIn');
                  localStorage.clear();
                   localStorage.setItem('rememberMe', JSON.stringify(checkCredentials))

                  NotificationManager.success('User Logout Successfully');
               }
               else {
                  console.log("Response", res);
                  dispatch({ type: LOGIN_USER_FAILURE });
                  NotificationManager.error('Unable to logout');
               }

            }).catch(err => {
               console.log("errr====", err)
               dispatch({ type: LOGIN_USER_FAILURE });
               NotificationManager.error('Unable to logout');
               console.log(err);
            });

      }
   }

   /**
    * Toggle User Dropdown Menu
    */
   const toggleUserDropdownMenu = () => {
      //==== this is original content of this function ===//
      setUserDropdownMenu(!userDropdownMenu);

   }

   /**
    * handle Reset Password Click
    */
   const handleResetPasswordClick = () => {
      history.push("/")
   }

   useEffect(() => {
      getProfileInfo();
   }, [])



   //Get User Profile Info
   const getProfileInfo = () => {
      const accessToken = JSON.parse(localStorage.getItem('token'));
      console.log("Token", accessToken)
      if (accessToken !== null) {
         profileInfo(accessToken)
            .then(res => {
               if (res?.status === 200) {
                  setProfileData(res?.data);
                  localStorage.setItem("ProfileData", JSON.stringify(res?.data));
                  console.log("Profile Info ResponseData", res?.data)
               } else if (res?.status === 400) {
                  console.log("Profile Info Response", res)
               }
               else {
                  console.log("Profile Info Response", res)
               }
            }).catch(err => {
               // localStorage.clear();
               // history.push("/signin");
               console.log("error from profile info in userblock horizontal..", err);
            });
      }
   }




   //------ ractstrap form-1 ---------------------//
   const [open, setOpen] = useState(false);
   const [oldPassword, setOldPassword] = useState("");
   const [newPassword, setNewPassword] = useState("");
   const [rePassword, setRePassword] = useState("");
   const [show, setShow] = useState(false);

   // Form vallidation (pattern should check at newPassword)
   const [validateOld, setValidateOld] = useState(true);
   const [validateNew, setValidateNew] = useState(true);
   const [validateConfirm, setValidateConfirm] = useState(true);

   const handleClickOpen = () => {
      //==== below is the original function ====// 
      console.log(open, "open");
      setOpen(true);


   };

   const handleClose = () => {
      setOldPassword("")
      setNewPassword("")
      setRePassword("")
      setOpen(false);
   };


   // const authKey = localStorage.getItem("auth_key");
   const resetPassword = () => {
      let regexFormat = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$/

      if (oldPassword.trim() == '' && newPassword.trim() == '' && rePassword.trim() == "") {
         NotificationManager.error('Fields cant be left empty!');
         console.log("empty field....")
      } else if (newPassword !== rePassword) {
         NotificationManager.error('Confirm password did not matched!');
         setRePassword("");
      } else {
         if (regexFormat.test(newPassword.trim())) {
            console.log("Updated Details:", oldPassword, newPassword, rePassword);

            axios.post(`${BASE_URL}/api/version_0/authentication/change-password/`, {
               "old_password": oldPassword,
               "new_password1": newPassword,
               "new_password2": rePassword,
            },
               {
                  headers: {
                     "content-type": "application/json",
                     "accept": "application/json",
                     // "Authorization": "Token " + localStorage.getItem("token"),
                     "Authorization": "Token " + JSON.parse(localStorage.getItem("token")),
                  }
               })
               .then((res) => {
                  if (res?.status === 200) {
                     console.log("Response 200 from Chage Password:", res);
                     // history.push("/confirm-password") // currently not in use, confirm-password component is still there
                     localStorage.clear();
                     setOpen(false);
                     history.push("/signin");
                     //  NotificationManager.success('Password changed successfully!');   
                     NotificationManager.success(res?.data?.detail);

                     setOldPassword("");
                     setNewPassword("");
                     setRePassword("");

                     // localStorage.setItem("user_id", "user-id");
                     // dispatch({ type: LOGIN_USER_SUCCESS, payload: localStorage.getItem('user_id') });
                     // history.push('/selectactivity');
                     // setShow(false);
                     // setNameError('');
                     // setPassError('');
                  }
               })
               .catch(err => {
                  console.log("Change password error :", err?.response);
                  // if (err?.response?.status === 500) {
                  //    console.log("Response from Change Password:", err?.response?.data?.[0].old_password);
                  //    NotificationManager.error(err?.response?.data?.[0].old_password);
                  // }

                  // console.log(err?.response?.data[0]?.new_password2[0], "yooo errrr")
                  // const oldPasswordError = err?.response?.data[0]?.old_password[0]
                  const newPasswordError = err?.response?.data?.[0]?.new_password2
                  // console.log(newPasswordError, "newww passswordd errrr")

                  const oldPasswordError =err?.response?.data?.[0]?.old_password
                  // console.log(oldPasswordError, "ollddd pwwddd errrrr")

                  if (oldPasswordError) {
                     NotificationManager.error(`Old Password is ${oldPasswordError[0]}`)
                  } 
                   if (newPasswordError) {
                     NotificationManager.error(`New Password is ${newPasswordError[0]}`)
                  }

                 
               });
         } else {
            NotificationManager.error('Password should have one uppercase, one number, one symbol!');
         }
      }
   }

   console.log(oldPassword, newPassword, rePassword, "old, new , re");
   console.log(validateOld, validateNew, validateConfirm, "vO, vN, vC");

   //-------------------- END ----------------//


   return (
      <div className="top-sidebar">
         <div className="sidebar-user-block profile-block" >
            <Dropdown
               isOpen={userDropdownMenu}
               toggle={() => toggleUserDropdownMenu()}
               className="rct-dropdown"
            >
               <DropdownToggle
                  tag="div"
                  className="d-flex align-items-center g-2  myprofile-block100"
               >
                  <div className="userInfoMainWrapper" >

                        <div className="userProfileWrapper">


                        <img
                           src={`${process.env.PUBLIC_URL}/assets/images/avatars/user-15.jpg`}
                           alt="user profile"
                           className="img-fluid rounded-circle"
                           width={40}
                           height={40}
                        />
                         </div>
                   

                     <div className="userNameWrapper">
                        {/* <span className="user-name ml-4 text-white">{profileData?.first_name} {profileData?.last_name}</span> */}
                        
                      <span className="userEmailWrap">  <span className="userNameText" >{profileData?.username}</span> </span>
                      
                     </div>
                  </div>

                  <i className="zmdi zmdi-chevron-down dropdown-icon text-white DropDownIcon "></i> 
               </DropdownToggle>
               <DropdownMenu style={{ left: '65px', top: '5px' }}>
                  <ul className="list-unstyled mb-0 profile-block-wrap" >
                     <li className="p-15 border-bottom user-profile-top userBlockHorizontalDropdown">
                        <p className="text-white mb-0 fs-14">{profileData?.username}</p>
                        <span className="text-white fs-14">{profileData?.email}</span>
                     </li>
                     <li>
                        <Link to={{
                           pathname: '/app/users/user-profile-1',
                           state: { activeTab: 0 }
                        }}>
                           <i className="zmdi zmdi-account text-primary mr-3"></i>
                           <span><IntlMessages id="widgets.profile" /></span>
                        </Link>
                     </li>

                     {/* Resetstrap form-1 password modal, the above one, which was in users profile, is got hidden, this will be new */}
                     <div>
                        {/* <Button variant="contained" className="btn-info text-white btn-block" onClick={handleClickOpen}>Open form dialog</Button> */}
                        <li className="border-top">
                           <a onClick={handleClickOpen}>
                              <i class="zmdi zmdi-lock-outline mr-3 text-primary"></i>
                              <span>Change Password</span>
                           </a>
                        </li>
                     </div>
                     {/************* RESET PASSWORD PART OVER *****************/}

                     <li className="border-top">
                        <a>
                           <i className="zmdi zmdi-power text-danger mr-3"></i>
                           <span onClick={logoutUser}><IntlMessages id="widgets.logOut" /></span>
                        </a>
                     </li>
                  </ul>
               </DropdownMenu>
            </Dropdown>
         </div>
         {/* <SupportPage
             isOpen={isSupportModal}
             onCloseSupportPage={() => onCloseSupportPage()}
             onSubmit={() => onSubmitSupport()}
          /> */}

         {/**** Modal for change password  *****/}
         <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Reset Password</DialogTitle>
            <DialogContent>
               <RctCollapsibleCard>
                  <Form>
                     <FormGroup>
                        <Label for="oldPassword">Old Password</Label>
                        <Input value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} type="password" name="password" id="oldPassword" placeholder="old password" className="py-3" />
                        <Label>{validateOld ? "" : <span style={{ color: "red", marginLeft: "15px" }}>old password not matched</span>}</Label>
                     </FormGroup>

                     <FormGroup>
                        <Label for="newPassword">New Password</Label>
                        <Input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="password" name="password" id="newPassword" placeholder="new password" className="py-3" />
                        <Label>{validateNew ? "" : <span style={{ color: "red", marginLeft: "15px" }}>must be alphanumeric and minimum 8 characters long</span>}</Label>
                     </FormGroup>

                     <FormGroup>
                        <Label for="confirmPassword">Confirm Password</Label>
                        <Input value={rePassword} onChange={(e) => setRePassword(e.target.value)} type="password" name="password" id="confirmPassword" placeholder="confirm password" className="py-3" />
                        <Label>{validateConfirm ? "" : <span style={{ color: "red", marginLeft: "15px" }}>confirm password incorrect</span>}</Label>
                     </FormGroup>
                  </Form>
               </RctCollapsibleCard>
            </DialogContent>
            <DialogActions>
               <Button variant="contained" onClick={resetPassword} className="py-2" style={{ backgroundColor: "#0b3d45", color: "#fff", borderRadius: "6px" }} >
                  Change Password
               </Button>
               <Button variant="contained" onClick={handleClose} className="py-2 px-3" style={{ backgroundColor: "#E0E0E0", color: "#000", borderRadius: "6px", cursor: "pointer" }}>
                  Cancel
               </Button>
            </DialogActions>
         </Dialog>
      </div>
   );
}


export default UserBlockHorizontal;
