import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Input } from 'reactstrap';
import { Button, AppBar, Toolbar } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import axios from "axios";
import { Helmet } from 'react-helmet'


import { NotificationManager } from 'react-notifications';

// app config
import AppConfig from 'Constants/AppConfig';
import "../../../Assets/css/main.css";
import { str } from '../../../Constants/stringConst';
import { BASE_URL } from 'Api/APIConst';

export default function ConfirmPwd() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [pathKey, setPathkKey] = useState("");
    const [token, setToken] = useState("");
 
    const history = useHistory();

    useEffect(() => {
        const currPath = window.location.pathname;
        const currSplit = currPath.split("/");

        let key = currSplit[currSplit.length - 3];
        let token = currSplit[currSplit.length - 2];

        setPathkKey(key);
        setToken(token);

    
    }, [])

 
   
     

    const handleChangeConfirmPassword = () => {
        if (newPassword.trim() == '' && confirmNewPassword.trim() == "") {
            // setNameError('* This is required Field');
            // setPassError('* This is required Field');
            // setShow(true);
            NotificationManager.error('Fields cant be blank!');
            // console.log("Fields cant be blank...")
        } else if (newPassword !== confirmNewPassword) {
            NotificationManager.error('Confirm password does not match!');
            // console.log("Confirm password not matched....")
        }
        else {
            // console.log("Updated Details:", newPassword, confirmNewPassword);
            axios.post(`${BASE_URL}/api/version_0/authentication/forgot-password/confirm/`, {
                "new_password1": newPassword,
                "new_password2": confirmNewPassword,
                "uid": pathKey,
                "token": token
            },
                {
                    headers: {
                        "content-type": "application/json",
                        "accept": "application/json",
                        "GUEST-AUTH-TOKEN": "b6d18755-3766-4487-9029-b540ae24d054"
                    }
                })
                .then(res => {
                     console.log("Confirm Forgot Password :", res);
                    return res;
                })
                .then((res) => {
                    if (res?.status === 200) {
                        // console.log("Response from Chage Password:", res);
                        // history.push("/confirm-password") // currently not in use, confirm-password component is still there
                        NotificationManager.success('Password change successfully!');
                        localStorage.clear();
                        history.push("/login");

                        // localStorage.setItem("user_id", "user-id");
                        /// dispatch({ type: LOGIN_USER_SUCCESS, payload: localStorage.getItem('user_id') });
                        // history.push('/selectactivity');
                       
                    } else if (res?.status === 400) {
                        
                        // console.log("Response from Change Password:", res);
                        NotificationManager.error('Validation failed! try again!');
                    } else if (res?.status === 500) {
                        
                        NotificationManager.error('Internal server error!');
                        // console.log("Response from Change Password:", res);
                    }
                    else {
                        // setShow(false);
                        // setNameError('');
                        // setPassError('');
                        NotificationManager.error('Unsuccessful attempt!!');
                        // console.log("Response from Change Password:", res);
                    }
                })
                .catch(err => console.log(err))
        }

        setConfirmNewPassword("");
        setNewPassword("");
    }

    // console.log(newPassword, "New password");
    // console.log(confirmNewPassword, "Confirm New Password")
    // console.log(pathKey, "path key");
    // console.log(token, "token");
    return (
      
        <div className="user-management">
            <Helmet>
            <title> Automaton | Reset Password</title>
            <meta name="description" content="Automaton Widgets" />
            </Helmet>
                <div className="rct-session-wrapper" key="1">
                    <AppBar position="static" className="session-header">
                        <Toolbar>
                            <div className="container">
                                <div className="d-flex justify-content-between">
                                    <div className="session-logo">
                                        <Link to="/">
                                            <img src={AppConfig.appLogo} alt="session-logo" className="img-fluid" width="170" />
                                        </Link>
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
                                    {/* <h2 className="font-weight-bold text-theme">Change Password</h2> */}
                                </div>
                                <Form>

                                <div style={{textAlign:"start"}}>
                              <p className="text-dark">{str.EnterNewPassText} </p>
                              </div>
                                <FormGroup className="has-wrapper">
                                        <Input
                                            type="Password"
                                            name="user-pwd"
                                            id="pwd"
                                            className="has-input input-lg"
                                            // placeholder="Enter New Password"
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            value={newPassword}
                                        />
                                    </FormGroup>
                                   
                                    <div style={{textAlign:"start"}}>
                              <p  className="text-dark">{str.Re_enterPassText}  </p>
                              </div>
                                    <FormGroup className="has-wrapper">
                                    
                                        <Input
                                            type="Password"
                                            name="user-pwd"
                                            id="pwd"
                                            className="has-input input-lg"
                                            // placeholder="Confirm Password"
                                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                                            value={confirmNewPassword}
                                        />
                                    </FormGroup>
                                   
                            
                                    <FormGroup className="d-flex justify-content-around">
                                      <div>
                                        <Button
                                            color="primary"
                                            className="btn-block text-white px-50 fw-bold bg-primary.bg-gradient"
                                            variant="contained"
                                            size="small"
                                            onClick={handleChangeConfirmPassword}
                                            style={{maxWidth:"150px"}}
                                        >
                                           {str.changeText}
                                        </Button>
                                        </div> 
                                        <div>
                                        <Button
                                            color="primary"
                                            className="btn-block px-50 text-white fw-bold btn-danger"
                                            variant="contained"
                                            size="small"
                                            onClick={()=>{ history.push("/login")}}
                                            style={{maxWidth:"150px"}}
                                        >
                                          {str.CancelText}
                                        </Button>
                                        </div>
                                       
                                    </FormGroup>
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
