import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, AppBar, Toolbar } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { Form, FormGroup, Input } from 'reactstrap';
import LinearProgress from '@material-ui/core/LinearProgress';
import QueueAnim from 'rc-queue-anim';
import { NotificationManager } from 'react-notifications';
import Checkbox from '@material-ui/core/Checkbox';
import '../Assets/css/main.css';

import { Helmet } from 'react-helmet'

// app config
import AppConfig from 'Constants/AppConfig';

// redux action
import {
   signinUserInFirebase,
   signinUserWithFacebook,
   signinUserWithGoogle,
   signinUserWithGithub,
   signinUserWithTwitter
} from 'Store/Actions';



import { LOGIN_USER_SUCCESS } from 'Store/Actions/types';

//Auth File
import Auth from 'Auth/Auth';

import { login } from '../Api/index';

import { str } from '../Constants/stringConst';

const auth = new Auth();

function Signin(props) {

   const history = useHistory();
   const [check, setChecked] = useState(false);
   const [name, setName] = useState('');
   const [password, setPassword] = useState('');
   const dispatch = useDispatch();
   const loading = useSelector(state => state.loading);
   const [show, setShow] = useState(false);
   const [nameError, setNameError] = useState('');
   const [passError, setPassError] = useState('');
   const [passToggle, setpassToggle] = useState(false);

   const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
   const regexname = /^[a-zA-Z0-9/@/./+/-/_]*$/
   const regexpassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  
   let type = JSON.parse(localStorage.getItem('user_type'));

  




   useEffect(() => {

      const checkCredentials = JSON.parse(localStorage.getItem('rememberMe'));
  

      if (checkCredentials) {
      
      if (checkCredentials?.username !== "" && checkCredentials?.password !== "") {
      
         setName(checkCredentials.username);
      
         setPassword(checkCredentials.password)
      
      }
      
      }




      const isLoggedInBool = localStorage.getItem("isLoggedIn")
     
      if (isLoggedInBool === "true") {
        
         if(type === "admin"){
      
            history.push("/app/dashboard/Admin/Dashboard")
          }
         
          
          if(type === "customer"){
      
            history.push('/app/dashboard/saas');
          }
          
        
    
      } else {
         history.push("/signin")
      }
   }, [])

   const onUserSignUp = () => {
      props.history.push('/signup');
   }

   const goToForgotPassword = () => {
      props.history.push('/forgotpwd');
   }





   // API Call for Login
   const onUserLogin = () => {
      setNameError('');
      setPassError('');
      setShow(true);
      if (name.trim() == '' && password.trim() == '') {
         setNameError(str.MandotoryField);
         setPassError(str.MandotoryField);
         setShow(true);

      } else {

         if(regexname.test(name.trim()) != true ){
            setNameError('User name must contain only  alpha-numeric character and no spacings!');
           }else
         if (regexpassword.test(password.trim()) != true) {
            setPassError(str.InvalidPassword)
         } else {

            if (check == true) {

               localStorage.setItem('rememberMe', JSON.stringify({ "username": name, "password": password }))
               // NotificationManager.success('save the credentials!');
               }

            login(name, password).then((res) => {
               if (res?.data?.token) {
                  localStorage.setItem('token', JSON.stringify(res.data.token));
                  localStorage.setItem("isLoggedIn", JSON.stringify(true))
                  localStorage.setItem("user_id", "user-id");
                  localStorage.setItem("user_type", JSON.stringify(res?.data?.user?.user_type));

                  dispatch({ type: LOGIN_USER_SUCCESS, payload: localStorage.getItem('user_id') });
                  
                  if(res?.data?.user?.user_type === "admin"){
                   history.push("app/dashboard/Admin/Dashboard")
                  
                  }

                   if(res?.data?.user?.user_type === "customer"){
                     history.push('/app/dashboard/saas');
                   }

                  
                  NotificationManager.success('User Login Successfully!');
                  setShow(false);
                  setNameError('');
                  setPassError('');
               } else if (res?.data?.error) {
                  NotificationManager.error(res?.data?.error);

               } else {
                  setShow(false);

               }
            }).catch(err => {
               console.log("err:", err)
               if (err?.response?.data?.non_field_errors?.[0]) {

                  NotificationManager.error(err?.response?.data?.non_field_errors?.[0]);
               } else {
                  NotificationManager.error("login failed");

               }
            });
         }


      }
   }


   return (

      <div className="user-management">
         <Helmet>
            <title>Automaton | Sign-In</title>
            <meta name="description" content="Automaton Widgets" />
         </Helmet>
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
                        <div className='d-flex align-items-center'>
                           
                           <h4  className="mr-15 mt-2 text-theme">{str.NewUser}</h4>
                           <Button
                              component={Link}
                              to="/signup"
                              variant="contained "
                              className="text-white theme-background"
                           >
                              {str.SignupText}
                           </Button>
                        </div>
                     </div>
                  </div>
               </Toolbar>
            </AppBar>
            <div className="session-inner-wrapper">
               <div className="container">
                  <div className="row row-eq-height justify-content-center" style={{ marginTop: '100px' }} >
                     <div className="col-sm-7 col-md-7 col-lg-8">
                        <div className="session-body text-center">
                           <div className="session-head mb-30">
                              {/* <h2 className="font-weight-bold text-theme">{str.LoginText}</h2> */}
                           </div>
                           <Form>
                              <div style={{ textAlign: "start" }}>
                                 <p className="text-dark"> {str.NameField} <span style={{ color: "red" }}>*</span> </p>
                              </div>

                              <FormGroup className="has-wrapper">
                                 <Input
                                    type="text"
                                    value={name}
                                    name="user-name"
                                    id="user-name"
                                    className="has-input input-lg"
                                    // placeholder="Company/User Name"
                                    onChange={(e) => setName(e.target.value)}
                                 />

                                 <span className="has-icon"><i className="ti-user"></i></span>
                              </FormGroup>
                              {
                                 show && <p className='error'>{nameError}</p>
                              }

                              <div style={{ textAlign: "start" }}>
                                 <p className="text-dark"> {str.PasswardField} <span style={{ color: "red" }}>*</span></p>
                              </div>
                              <FormGroup className="has-wrapper">
                                 <Input
                                    value={password}
                                    type={passToggle ? "text" : "password"}
                                    name="user-pwd"
                                    id="pwd"
                                    className="has-input input-lg"
                                    // placeholder="Password"
                                    onChange={(event) => setPassword(event.target.value)}
                                 />



                                 <span onClick={() => setpassToggle(!passToggle)} className="has-icon"><i className="ti-eye"></i></span>

                              </FormGroup>

                              {
                                 show && <p className='error'>{passError}</p>
                              }

                              <div style={{ display: "flex" ,alignItems:"center"}}>
                                  <div >

                                 <Checkbox
                                    checked={check}
                                    onChange={() => setChecked(!check)}

                                    color="default"
                                 />
                                  </div>
                                <div> Remember me</div>
                              </div>

                              <FormGroup className="mb-15">
                                 <Button
                                    color="primary"
                                    className="btn-block text-white w-50 theme-background"
                                    variant="contained"
                                    size="large"
                                    onClick={onUserLogin}
                                 >
                                    {str.LoginText}
                                 </Button>

                              </FormGroup>
                              <a style={{ cursor: "pointer" }} className="text-theme" onClick={goToForgotPassword}>{str.ForgotPassword}</a>

                           </Form>

                        </div>
                     </div>

                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Signin;
