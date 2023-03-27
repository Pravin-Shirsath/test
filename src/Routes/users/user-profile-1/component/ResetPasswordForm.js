import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
// imports for form
// copied from Profile.js for making form
import { FormGroup, Input, Form, Label, Col, InputGroup, InputGroupAddon } from 'reactstrap';
import Button from '@material-ui/core/Button';
import { NotificationManager } from 'react-notifications';
import axios from "axios";
import { BASE_URL } from 'Api/APIConst';

const ResetPasswordForm = (props) => {
  const history = useHistory();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  // Form vallidation (pattern should check at newPassword)
  const [validateOld, setValidateOld] = useState(true);
  const [validateNew, setValidateNew] = useState(true);
  const [validateConfirm, setValidateConfirm] = useState(true);

  // const resetPassword = () => {
  //   const signedUpUser = JSON.parse(localStorage.getItem("signedUpUser"));
  //   console.log(oldPassword, newPassword, rePassword);
  //   const strongRegex = new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{8,})"); //must be alphanumeric and minimum 8 characters

  //   //=== Validation with regex (vishal) ====//
  //   if (oldPassword === signedUpUser.password) {
  //     setValidateOld(true)
  //     if (newPassword.match(strongRegex)) {
  //       setValidateNew(true);
  //       if (newPassword === rePassword) {
  //         setValidateConfirm(true)
  //         const password = newPassword
  //         const updatedUser = { ...signedUpUser, password }
  //         localStorage.setItem("signedUpUser", JSON.stringify(updatedUser));

  //         setOldPassword("");
  //         setNewPassword("");
  //         setRePassword("");
  //         alert('Password change success ✅')
  //         history.push("/app/dashboard/saas")
  //       } else {
  //         setValidateConfirm(false)
  //         setRePassword("");
  //       }
  //     } else {
  //       setValidateNew(false);
  //       setNewPassword("");
  //       setRePassword("");
  //     }
  //   } else {
  //     setValidateOld(false)
  //     setOldPassword("");
  //     setNewPassword("");
  //     setRePassword("");
  //   }

  //   console.log(signedUpUser, "reset password clicked...");
  // }

  
  // const authKey = localStorage.getItem("auth_key");
  const resetPassword = () => {
    if (oldPassword.trim() == '' && newPassword.trim() == '' && rePassword.trim() == "") {
      // setNameError('* This is required Field');
      // setPassError('* This is required Field');
      // setShow(true);
    } else {
      console.log("Updated Details:", oldPassword, newPassword, rePassword);

      axios.post(`${BASE_URL}/version_0/authentication/change-password/`, {
        "old_password": oldPassword,
        "new_password1": newPassword,
        "new_password2": rePassword,
      },
        {
          headers: {
            "content-type": "application/json",
            "accept": "application/json",
            "Authorization": "Token " + localStorage.getItem("auth_key"),
          }
        })
        .then(res => {
          console.log("Change Password :", res);
          return res;
        }).then((res) => {
          if (res?.status === 200) {
            console.log("Response from Chage Password:", res);
            // history.push("/confirm-password") // currently not in use, confirm-password component is still there
            localStorage.clear();
            history.push("/login");

            // localStorage.setItem("user_id", "user-id");
            // dispatch({ type: LOGIN_USER_SUCCESS, payload: localStorage.getItem('user_id') });
            // history.push('/selectactivity');
            // setShow(false);
            // setNameError('');
            // setPassError('');
          } else if (res?.status === 400) {
            // setShow(false);
            // setNameError('');
            // setPassError('');
            console.log("Response from Change Password:", res);
          } else if (res?.status === 500) {
            // setShow(false);
            // setNameError('');
            // setPassError('');
            console.log("Response from Change Password:", res);
          }
          else {
            // setShow(false);
            // setNameError('');
            // setPassError('');
            console.log("Response from Change Password:", res);
          }
        }).catch(err => {
          console.log("Change password error :", err?.response);
        });
    }
  }



  console.log(oldPassword, newPassword, rePassword);
  console.log(validateOld, validateNew, validateConfirm);
  return (
    <>

      {/****************** NEW FORM (Copy of Profile.js) ********************/}
      <div className="profile-wrapper w-50">
        <h2 className="heading">Reset Password</h2>
        <Form>
          <FormGroup row className='justify-content-center align-items-center'>
            <Label for="oldPassword" sm={3}>Old Password</Label>
            <Col sm={9} className="d-flex flex-column">
              <Input value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} type="text" name="oldPassword" id="oldPassword" className="input-lg" />
              <Label>{validateOld ? "" : <span style={{ color: "red", marginLeft: "15px" }}>old password not matched</span>}</Label>
            </Col>
          </FormGroup>

          <FormGroup row className='justify-content-center align-items-center'>
            <Label for="newPassword" sm={3}>New Password</Label>
            <Col sm={9} className="d-flex flex-column">
              <Input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="text" name="newPassword" id="newPassword" className="input-lg" />
              <Label>{validateNew ? "" : <span style={{ color: "red", marginLeft: "15px" }}>must be alphanumeric and minimum 8 characters long</span>}</Label>
            </Col>
          </FormGroup>

          <FormGroup row className='justify-content-center align-items-center'>
            <Label for="confirmNew" sm={3}>Confirm Password</Label>
            <Col sm={9} className="d-flex flex-column">
              <Input value={rePassword} onChange={(e) => setRePassword(e.target.value)} type="text" name="confirmNew" id="confirmNew" className="input-lg" />
              <Label>{validateConfirm ? "" : <span style={{ color: "red", marginLeft: "15px" }}>confirm password incorrect</span>}</Label>
            </Col>
          </FormGroup>
        </Form>

        <hr />
        <Button variant="contained" color="primary" className="text-white" onClick={resetPassword} >Reset Password</Button>
      </div>
    </>
  )
}

export default ResetPasswordForm;

