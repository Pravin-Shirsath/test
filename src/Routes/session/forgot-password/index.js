import React, { useState } from 'react';
import { Form, FormGroup, Input } from 'reactstrap';
import { Button, AppBar, Toolbar } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { Link, useHistory } from 'react-router-dom';
import QueueAnim from 'rc-queue-anim';
import axios from "axios";
import { Helmet } from 'react-helmet'
// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar'
// intl messages
import IntlMessages from 'Util/IntlMessages'
// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard'
import { NotificationManager } from 'react-notifications';

// app config
import AppConfig from 'Constants/AppConfig';
import "../../../Assets/css/main.css";
import { BASE_URL } from 'Api/APIConst';

export default function Forgotpwd() {
   const [email, setEmail] = useState("")
   
 

   const handleMailChange = (e) => {
      setEmail(e.target.value)
   }

   let regexVal = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

   const history = useHistory()
   const handleForgotPassword = (props) => {

      if (email.trim() == '') {
      
         NotificationManager.error('Field cant be left empty!');
      } else if(!regexVal.test(email)){
         NotificationManager.error('Invalid email address format!');
      } else {
         // console.log("Forgot password email detail:", email);

         axios.post(`${BASE_URL}/api/version_0/authentication/forgot-password/`, {
            email: email,
         },
            {
               headers: {
                  "content-type": "application/json",
                  "accept": "application/json",
                  "GUEST-AUTH-TOKEN": "b6d18755-3766-4487-9029-b540ae24d054"
               }
            })
            .then(res => {
               // console.log("Forgot Password :", res);
               return res;
            }).then((res) => {
               if (res?.status === 200) {
                  // console.log("Response from Forgot Password:", res);
                  NotificationManager.success('Reset password link has been sent to the registered email !');
                  
               } else if (res?.status === 400) {
                 
                  // console.log("Response from Forgot Password:", res);
                  NotificationManager.error('Data validation failed');
               } else if (res?.status === 500) {
                
                  // console.log("Response from Forgot Password:", res);
                  NotificationManager.error('Internal server error !');
               }
               else {
            
                  // console.log("Response from Forgot Password:", res);
               }
            }).catch(err => {
               // console.log("Forgot password error :", err?.response);
            });
      }

      setEmail("");
   }


   return (
      
         <div className="user-management">
         <Helmet>
           <title>Automaton | Forgot Password</title>
           <meta name="description" content="Automaton Widgets" />
         </Helmet>
            <div className="rct-session-wrapper" key="1">
               <AppBar position="static" className="session-header">
                  <Toolbar>
                     <div className="container">
                        <div className="d-flex justify-content-between">
                           <div className="session-logo">
                              <Link to="/">
                                 <img src={AppConfig.appLogo} alt="session-logo" className="img-fluid" width="250"/>
                              </Link>
                           </div>
                          
                        </div>
                     </div>
                  </Toolbar>
               </AppBar>
               <div className="session-inner-wrapper p-4 p-md-0" >
                  <div className="row">
                     <div className="col-sm-8 col-lg-5 mx-auto" style={{marginTop:'100px'}}>
                        <div className="session-body text-center">
                           <div className="session-head mb-30">
                              {/* <h2>Get started with {AppConfig.brandName}</h2> */}
                           </div>
                           <Form>
                              <FormGroup className="has-wrapper">
                                 <Input onChange={handleMailChange} value={email} type="mail" name="user-mail" id="user-mail" className="has-input input-lg" placeholder="Enter Email Address" />
                                 <span className="has-icon"><i className="ti-email"></i></span>
                              </FormGroup>
                              <FormGroup>
                                 <Button onClick={handleForgotPassword} variant="contained" className="theme-background text-white btn-block btn-large w-100">Reset Password</Button>
                              </FormGroup>
                              <Button component={Link} to="/signin" className="btn-dark btn-block btn-large text-white w-100">Already having account?  Login</Button>
                           </Form>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
   );
}
