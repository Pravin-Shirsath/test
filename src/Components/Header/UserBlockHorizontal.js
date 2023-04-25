import React, { useState, useRef, useEffect } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Badge } from 'reactstrap';
import NotificationsIcon from '@material-ui/icons/Notifications';
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
import { TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider } from '@material-ui/core';

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

//MaterialUI
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
//--------------------------- END ---------------------------//





// Don't forget the CSS: core and the UI components + plugins you are using.
// import { Dashboard } from "@uppy/react";
// import Uppy from "@uppy/core";
// const Uppy = require("@uppy/core");
// import '@uppy/core/dist/style.min.css';
// import '@uppy/dashboard/dist/style.min.css';
// import '@uppy/webcam/dist/style.min.css';
import { DragDrop, StatusBar, Dashboard } from '@uppy/react';
// import Tus from '@uppy/tus'

import eventBus from '../../Constants/eventBus';
// import { getUppyArray, setUppyArray } from 'Constants/UppyState';
import { ErrorHandling } from 'Constants/ErrorHandling';
// const { DashboardModal } = require("@uppy/react");
// // Don’t forget to keep the Uppy instance outside of your component.


import Uppy from '@uppy/core';
import { DashboardModal } from '@uppy/react';
// import '@uppy/core/dist/style.css';
// import '@uppy/dashboard/dist/style.css';


import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import "@uppy/status-bar/dist/style.css";
import "@uppy/progress-bar/dist/style.css";
import "@uppy/informer/dist/style.css";
import XHR from '@uppy/xhr-upload';

import UppyModal from './UppyModal';
import Notifications from './Notifications';

function UserBlockHorizontal(props) {
  const [userDropdownMenu, setUserDropdownMenu] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [uppyInstances, setUppyInstances] = useState({});

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
          console.log(err,history);
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

    eventBus.on("UpdateProfile", (res) => {
     
      if (res?.message) {
        getProfileInfo();
        
       
      }
    })

    return () =>{( eventBus.remove("UpdateProfile"))};
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
            localStorage.setItem("user_type", JSON.stringify(res?.data?.user_type));
            console.log("Profile Info ResponseData", res?.data)
          } else if (res?.status === 400) {
            console.log("Profile Info Response", res)
          }
          else {
            console.log("Profile Info Response", res)
          }
        }).catch(err => {
          ErrorHandling(err,history)
          
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



  const [userDetailsLocal, setUserDetailsLocal] = useState({ user_type: "admin" })

  // const [str1, setStr1] = useState("uppy")
  // const [str2, setStr2] = useState(localStorage.getItem("projectId") || "")
  // const [currentUppy, SetCurrentUppy] = useState(str1.concat(str2))
  // const [opn1, setOpn1] = useState("open")
  // const [opn2, setOpn2] = useState(localStorage.getItem("projectId")|| "")
  // const [opnres, setOpnres] = useState(opn1.concat(opn2))





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
              history.push("/login");
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

            const oldPasswordError = err?.response?.data?.[0]?.old_password
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








 // Dynamically generate an ID for a new Uppy instance
 const generateUppyId = () => {
  return `uppy-${Math.floor(Math.random() * 1000)}`;
};

// Create a new Uppy instance and add it to the state
const addUppyInstance = () => {
  const accessToken = JSON.parse(localStorage.getItem('token'))
  const DatasetId = JSON.parse(localStorage.getItem('datasetid'))
  NotificationManager.success("hello")

  const uppyId = generateUppyId();
  const uppyInstance = new Uppy({
    id: 'uppy',
    autoProceed: false,
    pauseResume: true,
    exposedHeaders: ["Access-Control-Allow-Headers"],
    hidePauseResumeButton:false
  });

  uppyInstance.use(XHR, {
    endpoint: `${BASE_URL}/api/automaton/file-uploads/uppy/xhr/upload/${DatasetId}/`,
    method: 'POST',
    resume: true,
    fieldName: 'files',
   
    headers: {
      'X-My-Custom-Header': 'header-value',
      Authorization: accessToken,
    //  "Content-Type": "multipart/form-data"
    "Acess-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, GET, POST, PATCH, PUT",
    "Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept, Authorization, Extra-Data",
    
    },
  });

  // Listen for events
  uppyInstance.on('file-added', (file) => {
    console.log('Added file', file);
  });

  uppyInstance.on('upload', (data) => {
    console.log('Started uploading');

  });

  uppyInstance.on('upload-success', (file, response) => {
    console.log('Upload successful');
  });

  uppyInstance.on('upload-error', (file, error, response) => {
    // Check if the error is an instance of Error or a string
    const errorMessage = error instanceof Error ? error.message : error;
    // alert(`Error uploading ${file.name}: ${response.body.message}`);
    // console.log(response)
    // console.log(error.getResponseError)
    // // Display the error message to the user
    // alert(`Error uploading ${file.name}: ${errorMessage}`);
  });

  setUppyInstances((prevState) => ({
    ...prevState,
    [uppyId]: uppyInstance,
  }));
};
console.log(uppyInstances)
// Cancel upload of a specific file
const cancelUpload = (uppyId, fileId) => {
  uppyInstances[uppyId].cancel(fileId);
};














// class="uppy-u-reset uppy-c-btn uppy-StatusBar-actionBtn uppy-StatusBar-actionBtn--done"

// console.log(document.getElementsByClassName(".uppy-StatusBar-actionBtn--done"),">>>>")
// console.log(document.querySelector('.uppy-StatusBar-actionBtn--done'),">>>")


// console.log(document.getElementsByClassName(".uppy-u-reset"),">>>uppy-u-reset")
// console.log(document.querySelector('.uppy-c-btn'),">>>uppy-c-btn")
// console.log(document.querySelector('.uppy-StatusBar'),">>>.uppy-StatusBar")

// console.log(document.querySelector('.uppy-StatusBar-actionBtn--done'),">>>.uppy-StatusBar-actionBtn--done")

// console.log(document.querySelector('.uppy-StatusBar'),">>>")



let m = false

const h=(e)=>{
  // e.preventDefault()
  // alert("hello world")
  // console.log(e,">>>>>>>>>>>")
}
  return (
    <div className="top-sidebar">




<div>
     


      <UppyModal  />



{/*       
      {
        Object.keys(uppyInstances).map((uppyId) => (
        <div key={uppyId}>

      


          <DashboardModal
            uppy={uppyInstances[uppyId]}
            closeModalOnClickOutside
            showProgressDetails
            open={true}
            hideCancelButton={false}
            hidePauseResumeButton={false}
            hideUploadButton={false}
            hideRetryButton={false}
            theme="dark"
            // disableInformer={true}
          //  doneButtonHandler={(e)=>h(e)}
            doneButtonHandler={()=> {
              alert("Hi");
              return 
              }}
            onRequestCloseModal={()=>alert("close")}

           

            showPauseResume={true}
            proudlyDisplayPoweredByUppy={false}
            onFilePause={(file) => {
              console.log(`File paused: ${file.name}`);
            }}
            onFileResume={(file) => {
              console.log(`File resumed: ${file.name}`);
            }}
            onCancel={(file) => {
              console.log(`Upload of ${file.name} cancelled`);
              cancelUpload(uppyId, file.id);
            }}
          />
        </div>
      ))
      } */}
    </div>

    













{/* 
    {Object.keys(uppyInstances).length > 0 && (
          <div
            className='css-uhb5lp'
            style={{ position: "absolute", bottom:-100, right:0, backgroundColor: '#fff' }}    //position: absolute;top: 27%;left: 66%
          
            // open= {this.state.createUserDialog}
            open={true}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle
            
            >
              Video Uploading Status
            </DialogTitle>
            <Divider
             
            ></Divider>
            <DialogContent
              
            >
              {Object.keys(uppyInstances).length > 0 &&
                Object.keys(uppyInstances).map(
                  (upp, index) =>
                    upp && (
                      <div>
                        {upp && (
                          <label
                          
                          >
                            Project Name : {upp?.opts?.id}
                            <ol>
                              {upp && upp.store.state.files && Object.keys(upp.store.state.files).length && Object.values(upp.store.state.files).map((file) =>
                              (<div><li>{file.name}
                                <br />
                                <Progress
                                  percent={file.progress.percentage}
                                  status="success"
                                />
                              </li>
                              </div>))
                              }
                            </ol>
                          </label>
                        )}
                        // <Dashboard
                        //   uppy={uppyInstances[upp]}
                        //   height="50%"
                        //   width="100%"
                        // />
                        <StatusBar
                          uppy={uppyInstances[upp]}
                          // hideUploadButton
                          hideAfterFinish={false}
                          showProgressDetails
                        />
                      </div>
                    )
                )}
            </DialogContent>
            <Divider
             
            ></Divider>
            <DialogActions
            
            >
              <Button
               
                 
                
                // onClick={this.handleCancel}
                variant="contained"
                className="btn-primary text-white bg-primary"
                autoFocus
              >
                OK
              </Button>
            </DialogActions>
          </div>
        )} */}











      <div className="sidebar-user-block profile-block d-flex text-align-center justify-content-center align-items-center" >
        <div style={{ color: "#fff " }} className="mt-2 mr-2">
          {/* <NotificationsIcon style={{fontSize:"30px"}} /> */}
          <Notifications/>
        </div>
        <Dropdown
          isOpen={userDropdownMenu}
          toggle={() => toggleUserDropdownMenu()}
          className="rct-dropdown"
        >
          <DropdownToggle
            tag="div"
            className="d-flex align-items-center g-2  "
          >
            <div className="userProfileWrapper">


              <div className="text-white mx-3 text-align-center justify-content-center mt-1">

              </div>
              <img
                src={profileData?.profile_image == null ? `${process.env.PUBLIC_URL}/assets/images/avatars/user-15.jpg` : `${BASE_URL + profileData.profile_image}`}
                alt="user profile"
                className=" rounded-circle"
                width={55}
                height={55}
              />
            </div>
            {/* <div className="user-profile">

                     <img
                         src={ profileData?.profile_image == null ?  `${process.env.PUBLIC_URL}/assets/images/avatars/user-15.jpg` : `${BASE_URL+profileData.profile_image}`}
                         alt="user profile"
                         className="img-fluid rounded-circle"
                         width={40}
                         height={40}
                      />
                  </div> */}

            <div className="user-info flex-column d-flex ml-2">
              <span className="user-name ml-4 text-white" style={{fontSize:"16px"}}>{profileData?.username} </span>
              {/* <span className="user-name ml-4 text-white">{profileData?.email}</span> */}

            </div>
            <i className="zmdi zmdi-chevron-down dropdown-icon text-white" style={{ marginLeft: '16px' }} ></i>
            {/* <div className="userInfoMainWrapper" >

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
                        <span className="user-name ml-4 text-white">{profileData?.first_name} {profileData?.last_name}</span>
                        
                      <span className="userEmailWrap">  <span className="userNameText" >{profileData?.username}</span> </span>
                      
                     </div>
                  </div> */}

            {/* <i className="zmdi zmdi-chevron-down dropdown-icon text-white DropDownIcon "></i>  */}
          </DropdownToggle>
          <DropdownMenu style={{ left: '65px', top: '5px' }}>
            <ul className="list-unstyled mb-0 profile-block-wrap " >
              <li className="p-15 border-bottom user-profile-top userBlockHorizontalDropdown ">
                <p className="text-white mb-0 fs-14 userNameText pr-3">{profileData?.username}</p>
                <span className="text-white fs-14 pr-3 userNameText">{profileData?.email}</span>
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
                    <i class="zmdi zmdi-lock-outline mr-3 primary-dark"></i>
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
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >

      <div className="p-10">
        <div className=" d-flex  align-items-center justify-content-center Comman-Heading dark-primary-text">Reset Password</div>
        <DialogContent>
          {/* <RctCollapsibleCard> */}
            <Form>
              <FormGroup >
                <Label for="oldPassword">Old Password</Label>
                <Input value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} type="password" name="password" id="oldPassword" placeholder="Old password" className="py-3" />
                {/* <Label>{validateOld ? "" : <span style={{ color: "red", marginLeft: "15px" }}>old password not matched</span>}</Label> */}
              </FormGroup>

              <FormGroup>
                <Label for="newPassword">New Password</Label>
                <Input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="password" name="password" id="newPassword" placeholder="New password" className="py-3" />
                {/* <Label>{validateNew ? "" : <span style={{ color: "red", marginLeft: "15px" }}>must be alphanumeric and minimum 8 characters long</span>}</Label> */}
              </FormGroup>

              <FormGroup>
                <Label for="confirmPassword">Confirm Password</Label>
                <Input value={rePassword} onChange={(e) => setRePassword(e.target.value)} type="password" name="password" id="confirmPassword" placeholder="Confirm password" className="py-3" />
                {/* <Label>{validateConfirm ? "" : <span style={{ color: "red", marginLeft: "15px" }}>confirm password incorrect</span>}</Label> */}
              </FormGroup>
            </Form>
          {/* </RctCollapsibleCard> */}
        <div className= 'd-flex  align-items-end justify-content-end' >
          <Button variant="contained" color="primary" onClick={resetPassword} className="py-2 mx-2" style={{ cursor: "pointer" }} >
            Change Password
          </Button>
          <Button variant="contained" color="danger" onClick={handleClose} className="py-2 px-3" style={{ backgroundColor: "#FC443C", color: "#fff", cursor: "pointer" }}>
            Cancel
          </Button>
        </div>
        </DialogContent>
        </div>
      </Dialog>



      {/* Uppy progress bar  */}





    </div>
  );
}


export default UserBlockHorizontal
