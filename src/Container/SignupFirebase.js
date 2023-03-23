/**
 * Sign Up With Firebase
 */
import React, { useState ,useEffect} from 'react';

import { Button, AppBar, Toolbar } from '@material-ui/core';


import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import { Form, FormGroup, Input } from 'reactstrap';
import LinearProgress from '@material-ui/core/LinearProgress';
import QueueAnim from 'rc-queue-anim';

import AppConfig from 'Constants/AppConfig';
import '../Assets/css/main.css';
import { str } from '../Constants/stringConst';

// redux action
import {
   signupUserInFirebase,
   signinUserWithFacebook,
   signinUserWithGoogle,
   signinUserWithGithub,
   signinUserWithTwitter
} from 'Store/Actions';

// imported by us
import { SIGNUP_USER_SUCCESS } from 'Store/Actions/types';
import { useHistory } from "react-router-dom"
import { register } from '../Api/index';
import { NotificationManager } from 'react-notifications';



function SignupFirebase(props) {
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [comfpass, setComfpass] = useState('');

   const dispatch = useDispatch();
   const loading = useSelector(state => state.loading);
   const [show, setShow] = useState(false);
   const [nameError, setNameError] = useState('');
   const [emailError, setEmailError] = useState('');
   const [passError, setPassError] = useState('');
   const [comfpassError, setComfpassError] = useState('');
   const [passToggle, setpassToggle] = useState(false);
   const [comfpassToggle, setComfpassToggle] = useState(false);

   const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
   const regexname = /^[a-zA-Z0-9/@/./+/-/_]*$/;
   const regexpassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

   const history = useHistory();

useEffect(()=>{
   alert("useeffect")
   setName("")
   setEmail("")
   setPassword("")
   setComfpass("")
},[])

   // Sign Up API Call
   const onUserSignUp = () => {
      setNameError('');
      setEmailError('');
      setPassError('');
      setComfpassError('');
      setShow(true);

      if (name.trim() == '' && email.trim() == '' && password.trim() == '' && comfpass.trim() == '') {

         setNameError(str.MandotoryField);
         setEmailError(str.MandotoryField);
         setPassError(str.MandotoryField);
         setComfpassError(str.MandotoryField);
         setShow(true);

      } else {



         if (regexname.test(name.trim()) != true) {
            setNameError('User name must contain only  alpha-numeric character and no spacings!');
         } else
            if (emailRegex.test(email.trim()) != true) {
               setEmailError(str.InvalidEmail);
            } else if (regexpassword.test(password.trim()) != true) {
               setPassError(str.InvalidPassword)
            } else if (password.trim() != comfpass.trim()) {
               setComfpassError(str.InvalidComfimpass);
            } else {

               // NotificationManager.success('start');
               register(name, email.toLowerCase(), password).then((res) => {
                  if (res?.status === 200) {
                     console.log("Response from auth:", res);

                     localStorage.setItem("signedUpUser", JSON.stringify({ name, email, password }));
                     localStorage.setItem("user_id", "user-id");

                     dispatch({ type: SIGNUP_USER_SUCCESS, payload: localStorage.getItem('user_id') });
                     NotificationManager.success('User Registration Successfully!');
                     history.push('/signin');
                     setName("")
                     setEmail("")
                     setPassword("")
                     setComfpass("")
                     setShow(false);
                     setNameError('');
                     setEmailError('');
                     setPassError('');
                     setComfpassError('');

                  } else if (res?.status === 400) {
                     setShow(false);
                     setNameError('');
                     setEmailError('');
                     setPassError('');
                     setComfpassError('');
                     console.log("Response from auth:", res);


                     const emailErr = res?.data?.email
                     const usernameErr = res?.data?.username

                     if (emailErr != undefined) {

                        NotificationManager.error(emailErr[0]);
                     }
                     if (usernameErr != undefined) {

                        NotificationManager.error(usernameErr[0]);
                     }
                  }
                  else {
                     setShow(false);
                     setNameError('');
                     setEmailError('');
                     setPassError('');
                     setComfpassError('');
                     console.log("Response from auth:", res);


                     //   NotificationManager.error('User Registration Successfully!');
                  }
               }).catch(err => {
                  console.log("Registration error :", err?.response);
                  const emailErr = err?.response?.data?.email
                  const usernameErr = err?.response?.data?.username

                  if (emailErr != undefined) {

                     NotificationManager.error(emailErr[0]);
                  }
                  if (usernameErr != undefined) {

                     NotificationManager.error(usernameErr[0]);
                  }
               });
            }

      }

















      //    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      //    if (email.trim() == '' && password.trim() == '' && name.trim() == '') {
      //       setNameError('* This is required Field');
      //       setEmailError('* This is required Field');
      //       setPassError('* This is required Field');
      //       setShow(true);

      //    } else if(emailRegex.test(email.trim())) {
      //       console.log("Register Details:", email,password,name);

      //       register(name,email,password).then((res) => {
      //          if (res?.status === 200) {
      //              console.log("Response from auth:", res);  

      //              localStorage.setItem("signedUpUser", JSON.stringify({name, email, password}));
      //              localStorage.setItem("user_id", "user-id");

      //              dispatch({ type: SIGNUP_USER_SUCCESS, payload: localStorage.getItem('user_id') });
      //              history.push('/signin');
      //              setShow(false);
      //              setNameError('');
      //              setEmailError('');
      //              setPassError('');
      //          } else if(res?.status === 400) { 
      //             setShow(false);
      //             setNameError('');
      //             setEmailError('');
      //             setPassError('');
      //             console.log("Response from auth:", res); 
      //           }
      //          else {
      //             setShow(false);
      //             setNameError('');
      //             setEmailError('');
      //             setPassError('');
      //           console.log("Response from auth:", res);
      //          }
      //      }).catch(err => {
      //       console.log("Registration error :",err?.response);
      //   });

      //    } else {
      //       setShow(true);
      //       setNameError('');
      //       setPassError('');
      //       setEmailError("* Please Enter Valid Email address");
      //    }
   }

   return (
      <QueueAnim type="bottom" duration={2000}>
         <div className="rct-session-wrapper">
            {loading &&
               <LinearProgress />
            }
            <AppBar position="static" className="session-header">
               <Toolbar>
                  <div className="container">
                     <div className="d-flex justify-content-between align-items-center">
                        <div className="session-logo">
                           <Link to="/signin">

                              <img src={AppConfig.appLogo} className="img-fluid" alt="session-logo" width="250" />
                           </Link>
                        </div>
                        <div className='d-flex align-items-center justify-contain-center'>
                           <h4 className="mr-15 mt-2 ">{str.AlreadyAccountText}</h4>
                           <Button
                              component={Link}
                              to="/signin"
                              variant="contained "
                              className="text-white theme-background"
                           >
                              {str.LoginText}
                           </Button>
                        </div>
                     </div>
                  </div>
               </Toolbar>
            </AppBar>
            <div className="session-inner-wrapper">
               <div className="container">
                  <div className="row row-eq-height justify-content-center" style={{ marginTop: '40px' }} >
                     <div className="col-sm-7 col-md-7 col-lg-8">
                        <div className="session-body text-center">
                           <div className="session-head mb-30">
                              <h2 className="font-weight-bold " style={{ textTransform: 'capitalize' }}>{str.createAccountText} </h2>
                           </div>
                           <Form>
                              <div style={{ textAlign: "start" }}>
                                 <p className="text-dark">  {str.NameField} <span style={{ color: "red" }}>*</span> </p>
                              </div>

                              <FormGroup className="has-wrapper">
                                 <Input
                                    type="text"
                                    value={name}
                                    // name="user-name"
                                    // id="user-name"
                                    className="has-input input-lg"
                                    // placeholder="Company/User Name"
                                    onChange={(e) => setName(e.target.value)}
                                    autoComplete="off"
                                 />

                                 <span className="has-icon"><i className="ti-user"></i></span>
                              </FormGroup>
                              {
                                 show && <p className='error'>{nameError}</p>
                              }
                              <div style={{ textAlign: "start" }}>
                                 <p className="text-dark"> {str.emailField} <span style={{ color: "red" }}>*</span> </p>
                              </div>
                            
                              <FormGroup className="has-wrapper">
                                 <Input
                                    type="text"
                                    value={email}
                                    // name="user-email"
                                    // id="user-email"
                                    className="has-input input-lg"
                                    // placeholder="Company/User Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="off"
                                 />

                                 <span className="has-icon"><i className="ti-email"></i></span>
                              </FormGroup>

                              {
                                 show && <p className='error'>{emailError}</p>
                              }
                              <div style={{ textAlign: "start" }}>
                                 <p className="text-dark">{str.PasswardField}<span style={{ color: "red" }}>*</span> </p>
                              </div>
                              <FormGroup className="has-wrapper">
                                 <Input
                                    value={password}
                                    type={passToggle ? "text" : "password"}
                                    // name="user-pwd"
                                    // id="pwd"
                                    className="has-input input-lg"
                                    // placeholder="Password"
                                    onChange={(event) => setPassword(event.target.value)}
                                    autoComplete="off"
                                 />

                                 {/* <span className="has-icon"><i className="ti-lock"></i></span> */}

                                 <span onClick={() => setpassToggle(!passToggle)} className="has-icon"><i className="ti-eye"></i></span>

                              </FormGroup>

                              {
                                 show && <p className='error'>{passError}</p>
                              }
                              <div style={{ textAlign: "start" }}>
                                 <p className="text-dark">{str.ComfompasField} <span style={{ color: "red" }}>*</span> </p>
                              </div>
                              <FormGroup className="has-wrapper">
                                 <Input
                                    value={comfpass}
                                    type={comfpassToggle ? "text" : "password"}
                                    // name="user-pwd"
                                    // id="pwd2"
                                    className="has-input input-lg"
                                    // placeholder="Confirm password"
                                    onChange={(event) => setComfpass(event.target.value)}
                                    autoComplete="off"
                                 />
                                 {/* <span className="has-icon"><i className="ti-lock"></i></span> */}
                                 <span onClick={() => setComfpassToggle(!comfpassToggle)} className="has-icon"><i className="ti-eye"></i></span>
                              </FormGroup>
                              {
                                 show && <p className='error'>{comfpassError}</p>
                              }

                              <FormGroup className="mb-15">
                                 <Button
                                    color="primary"
                                    className="btn-block text-white w-50 theme-background"
                                    variant="contained"
                                    size="large"
                                    onClick={onUserSignUp}
                                 >
                                    {str.SignupText}
                                 </Button>

                              </FormGroup>

                              {/* <a style={{ cursor: "pointer" }} className="text-theme" onClick={goToForgotPassword}>Forgot Password?</a> */}
                              <p style={{ marginTop: "8px" }}>{str.PrivacyPolicyText}</p>
                           </Form>

                        </div>
                     </div>

                  </div>
               </div>
            </div>
         </div>
      </QueueAnim>
   );
}

export default SignupFirebase;
