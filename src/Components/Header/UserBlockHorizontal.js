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
import Uppy from "@uppy/core";
// const Uppy = require("@uppy/core");
import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import '@uppy/webcam/dist/style.min.css';
import { DragDrop, StatusBar, Dashboard } from '@uppy/react';
import Tus from '@uppy/tus'
import eventBus from '../../Constants/eventBus';
import { getUppyArray, setUppyArray } from 'Constants/UppyState';
import { ErrorHandling } from 'Constants/ErrorHandling';
const { DashboardModal } = require("@uppy/react");
// Don’t forget to keep the Uppy instance outside of your component.



const uppy = new Uppy()
  // .use(RemoteSources, { companionUrl: 'https://companion.uppy.io' })
  // .use(Webcam, { target: Dashboard })
  // .use(ImageEditor, { target: Dashboard })
  .use(Tus, { endpoint: 'https://tusd.tusdemo.net/files/' })
  .on('complete', (result) => {
    console.log('Upload result:', result)
  });




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


  const handleCancel = () => {
    setState(...state, { statusDialogOpen: false })

  }
  useEffect(() => {
    getProfileInfo();

    eventBus.on("Upload_file", (res) => {
      // console.log('couponApply res=',res)
      if (res.message) {
        localStorage.setItem("project_name", res.message)
        setState({ project_name: res.message ? res.message : localStorage.getItem("project_name") });

        handleModalClick();

      }
    })

    return () => eventBus.remove("Upload_file");
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



  let str1 = "uppy";
  let str2 = localStorage.getItem("projectId");
  let res = str1.concat(str2);
  let opn1 = "open";
  let opn2 = localStorage.getItem("projectId");
  let opnres = opn1.concat(opn2);




  const [uppyInstance, setUppInstance] = useState(getUppyArray())


  const [u, setU] = useState("my state")


  const [state, setState] = useState(
    {
      isMobileSearchFormVisible: false,
      userDetailsLocal: "",
      open: undefined,
      token: "",
      floatingIconVisible: false,
      cancelUpload: false,
      proj_id: "",
      project_name: "",
      uppy_name_id: "",
      dashboardArray: JSON.parse(localStorage.getItem("UppyArray")) || [],
      projArray: [],
      uppyArray: [],
      statusDialogOpen: false,

    }

  )

  console.log("my state  == ", state)



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






  // const [userProfile, setUserProfile] = useState(JSON.parse(localStorage.getItem("userDetails")))

  //  var userDetailsLocal = localStorage.getItem("userDetails");
  // var userToken = localStorage.getItem("userToken");
  // var newUserDetails = JSON.parse(userDetailsLocal);



  // console.log("hhhhh=====",uppy)

  /**
     * Handle Video Upload
     */


  // const  res1 = new Uppy({
  //   // id : res,e
  //   id: "SNT",
  //   autoProceed: false,
  //   debug: true,
  //   allowMultipleUploads: true,
  //   methods: ["OPTIONS", "GET", "POST", "PATCH", "PUT"],
  //   exposedHeaders: ["Access-Control-Allow-Headers"],
  //   allowedHeaders: [
  //     "uppy-auth-token",
  //     "Content-Type",
  //     "Authorization",
  //     "Uppy-Versions",
  //     "Accept",
  //     "project_id",
  //     "folder_id",
  //   ],
  // }).use(Tus, { endpoint: 'https://tusd.tusdemo.net/files/' })
  //   .on("complete", (result) => {
    
    
  //   }).on("complete", (result) => {
   
  //     });


    




  const handleModalClick = async () => {


    let opn1 = "open";
    let opn2 = await localStorage.getItem("projectId");
    // console.log("projectid-1 = >", opn2)
    let opnres = opn1.concat(opn2);
    let str1 = "uppy";
    let str2 = await localStorage.getItem("projectId");
    let res = str1.concat(str2);
    // console.log("project name in header", this.state.project_name)

    if (await state[opnres] === undefined) {
      let str1 = "uppy";
      let str2 = localStorage.getItem("projectId");
      // console.log("peojectID = >", str2)
      let res = str1.concat(str2);

      res = new Uppy({
        // id : res,e
        id: "SNT",
        autoProceed: false,
        debug: true,
        allowMultipleUploads: true,
        methods: ["OPTIONS", "GET", "POST", "PATCH", "PUT"],
        exposedHeaders: ["Access-Control-Allow-Headers"],
        allowedHeaders: [
          "uppy-auth-token",
          "Content-Type",
          "Authorization",
          "Uppy-Versions",
          "Accept",
          "project_id",
          "folder_id",
        ],
      }).use(Tus, { endpoint: 'https://tusd.tusdemo.net/files/' })

        // console.log("this[res]=>",this[res])
        .on("complete", (result) => {
          console.log("Result ", result)
          console.log("this.state.proj_name", this.state.project_name)
          setState({
            ...state,
            floatingIconVisible: false,
            statusDialogOpen: false,
            [opnres]: undefined,
          })
        }).on("complete", (result) => {
          // console.log("Result ",result)
          // console.log("this.state.proj_name", this.state.project_name)
          setState({
            ...state,
            floatingIconVisible: false,
            statusDialogOpen: false,
            [opnres]: undefined,
          });

          var array = [...state.dashboardArray]; // make a separate copy of the array

          var index = array.indexOf(res);
          if (index !== -1) {
            array.splice(index, 1);
            setState({ ...state, dashboardArray: array });
          }

          // let idArray = [];
          // result.successful.forEach((element) => {
          //   idArray.push(element.s3Multipart.key);
          // });
          // // console.log("Id Array", idArray);
          // var headers = {
          //   "Content-Type": "application/json",
          //   Authorization: "Token " + localStorage.getItem("tkn"),
          // };
          // var params = {
          //   project_id: localStorage.getItem("projectId"),
          //   video_count: result.successful.length,
          //   video_list: idArray,
          // };

          // axios
          //   .post(
          //     api_base_url + "/api/v0/project/upload-video-notification-mail/",
          //     params,
          //     { headers: headers }
          //   )
          //   .then((response) => { });
          // this.setState({ cancelUpload: true });
          // eventBus.dispatch("Refresh", { message: "Refresh Project Details" });
          // localStorage.removeItem("tkn");
          // NotificationManager.success("File(s) Uploaded Successfully", "", 1000);
        }).on("upload-progress", (file, progress) => {
          setState({
            ...state,
            floatingIconVisible: true,
          });
          // console.log("Uppy",this[res])
        }).on("cancel-all", () => {
          setState({
            ...state,
            floatingIconVisible: false,
            statusDialogOpen: false,
          });
        }).on("upload-error", (file, error, response) => {
          setState({ ...state, floatingIconVisible: true });
          const { name } = file;
          // message.error(`Fail to upload ${name}`);
        })

      const LArray =JSON.parse( await localStorage.getItem("UppyArray")) || []

      const AddArray = [...LArray, res]

      localStorage.setItem("UppyArray", JSON.stringify(AddArray));
      console.log(" LArray", LArray)


      // localStorage.setItem("UppyArray", );
      console.log("res==", res)

      //       let m= {...state, dashboardArray: [...state.dashboardArray, res]}
      //  console.log("state m=",m)


      //     setState(m);
      // this.setState({projArray:[...this.state.projArray,this.state.proj_name]})
      // console.log(projArray)
    }

    setState({
      ...state,
      [opnres]: !state[opnres],
      isLoading: false,
    });























    // let  res = "UppayDash"
    // // console.log("project name in header", this.state.project_name)




    //  res = new Uppy({
    //     // id : res,e
    //     id: "upp3",
    //     autoProceed: false,
    //     debug: true,
    //     allowMultipleUploads: true,
    //     methods: ["OPTIONS", "GET", "POST", "PATCH", "PUT"],
    //     exposedHeaders: ["Access-Control-Allow-Headers"],
    //     allowedHeaders: [
    //       "uppy-auth-token",
    //       "Content-Type",
    //       "Authorization",
    //       "Uppy-Versions",
    //       "Accept",
    //       "project_id",
    //       "folder_id",
    //     ],
    //   }).use(Tus, { endpoint: 'https://tusd.tusdemo.net/files/' })

    //   // console.log("this[res]=>",this[res])
    //   .on("complete", (result) => {
    //     // console.log("Result ",result)
    //     // console.log("this.state.proj_name", this.state.project_name)
    //     // setState(...state, {
    //     //   floatingIconVisible: false,
    //     //   statusDialogOpen: false,
    //     //   opnres: undefined,
    //     // }) 
    //   }).on("upload-progress", (file, progress) => {
    //       // setState(...state, {
    //       //   floatingIconVisible: true,
    //       // });
    //       // console.log("Uppy",this[res])
    //     }).on("cancel-all", () => {
    //       // setState(...state, {
    //       //   floatingIconVisible: false,
    //       //   statusDialogOpen: false,
    //       // });
    //     }).on("upload-error", (file, error, response) => {
    //       // setState(...state, { floatingIconVisible: true });
    //       // const { name } = file;
    //       // message.error(`Fail to upload ${name}`);
    //     });

    //     // var array = [...state.dashboardArray]; // make a separate copy of the array

    //     // var index = array.indexOf([res]);
    //     // if (index !== -1) {
    //     //   array.splice(index, 1);
    //     //   setState(...state, { dashboardArray: array });
    //     // }

    //     // let idArray = [];
    //     // result.successful.forEach((element) => {
    //     //   idArray.push(element.s3Multipart.key);
    //     // });
    //     // // console.log("Id Array", idArray);
    //     // var headers = {
    //     //   "Content-Type": "application/json",
    //     //   Authorization: "Token " + localStorage.getItem("tkn"),
    //     // };
    //     // var params = {
    //     //   project_id: localStorage.getItem("projectId"),
    //     //   video_count: result.successful.length,
    //     //   video_list: idArray,
    //     // };

    //     // axios
    //     //   .post(
    //     //     api_base_url + "/api/v0/project/upload-video-notification-mail/",
    //     //     params,
    //     //     { headers: headers }
    //     //   )
    //     //   .then((response) => { });
    //     // this.setState({ cancelUpload: true });
    //     // eventBus.dispatch("Refresh", { message: "Refresh Project Details" });
    //     // localStorage.removeItem("tkn");
    //     // NotificationManager.success("File(s) Uploaded Successfully", "", 1000);




    //   console.log("res =",res)



    //   // setUppInstance("uppy instance")
    //   setU("hello world")

    //     setU(res)

    //     let arr= getUppyArray()
    //     let ab= [...arr]
    //     ab.push(res)
    //       setUppyArray(ab)


    //     setUppInstance( getUppyArray())

    //     console.log("uppyInstance  internal =",uppyInstance)
    //     console.log("u internan===",u)

    //   // setState(...state, {
    //   //   dashboardArray: [...]}],

    //   // });

    //   // this.setState({projArray:[...this.state.projArray,this.state.proj_name]})
    //   // console.log(projArray)


    // // setState(...state, {
    // //   opnres: !state[opnres],
    // //   isLoading: false,
    // // });
  }







  // console.log("uppyInstance= extern==",uppyInstance)

  console.log("state external==", state)

  //  console.log(`state ${new Date()}`,state,)
  return (
    <div className="top-sidebar">






      {
        console.log("f=== ", state.dashboardArray)
      }

     
      {state.dashboardArray.length > 0 && state.dashboardArray.map(
            (key,i) =>
              i === 1 &&
              (
                <DashboardModal
                  //  uppy={this[res]}
                  // Modal={true}
                  width="80%"
                  height="80%"
                  closeModalOnClickOutside={true}
                  proudlyDisplayPoweredByUppy={false}
                  showSelectedFiles={true}
                  // showRemoveButtonAfterComplete={true}
                  uppy={key}
                  // inline={true}
                  // uppy={localStorage.getItem("projectId")}
                  // onRequestClose={() => {
                  //   this.setState({ [opnres]: false });
                  //   // console.log(opnres);
                  // }}
                  open={true}
                // open={this.state[key.opts.id]}
                // target={document.body}
                />
              )
          )}





      <div className="sidebar-user-block profile-block d-flex text-align-center justify-content-center" >
        <div style={{ color: "#fff " }} className="mt-2">
          <NotificationsIcon />
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
                width={40}
                height={40}
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

            <div className="user-info flex-column d-flex">
              <span className="user-name ml-4 text-white">{profileData?.username} </span>
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
                <p className="text-white mb-0 fs-14 userNameText">{profileData?.username}</p>
                <span className="text-white fs-14 userNameText">{profileData?.email}</span>
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
          <Button variant="contained" color="primary" onClick={resetPassword} className="py-2" style={{ cursor: "pointer" }} >
            Change Password
          </Button>
          <Button variant="contained" color="danger" onClick={handleClose} className="py-2 px-3" style={{ backgroundColor: "#FC443C", color: "#fff", cursor: "pointer" }}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>



      {/* Uppy progress bar  */}





    </div>
  );
}


export default UserBlockHorizontal
