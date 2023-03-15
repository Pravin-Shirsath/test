/**
 * User Profile Page
 */
import React, { useState, useEffect } from 'react'

import { Helmet } from 'react-helmet'

import UserBlock from './component/UserBlock'
import { Form, FormGroup, Input, Label, Col } from 'reactstrap'
import { useHistory } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';

// rct card box
import { RctCard } from 'Components/RctCard'

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar'

// intl messages
import IntlMessages from 'Util/IntlMessages'
import '../../../Assets/css/main.css'
import { updateProfileInfo } from '../../../Api/index'
import Button from '@material-ui/core/Button'

export default function UserProfile(props) {
  const [firstName, setFirstName] = useState(JSON.parse(localStorage.getItem("ProfileData")).first_name);
  const [lastName, setLastName] = useState(JSON.parse(localStorage.getItem("ProfileData")).last_name);
  const [email, setEmail] = useState(JSON.parse(localStorage.getItem("ProfileData")).email);
  const [phone, setPhone] = useState(JSON.parse(localStorage.getItem("ProfileData")).mobile_number);
  const [firstNameError, setFirstNameError] = useState('')
  const [lastNameError, setLastNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [show, setShow] = useState(false)
  const history = useHistory();


  //=================== Mams update profile ====================//
  // const updateProfile = () => {
  //   const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  //   const phoneRegex = /^[6789]\d{9}$/;

  //   if (email.trim() == '' && phone.trim() == '' && firstName.trim() == '' && lastName.trim() == '') {
  //     setFirstNameError('* This is required Field') 
  //     setLastNameError('* This is required Field')
  //     setEmailError('* This is required Field')
  //     setPhoneError('* This is required Field')
  //     setShow(true)
  //   } else if (emailRegex.test(email.trim())) {
      // const accessToken = JSON.parse(localStorage.getItem('token'))
      // if (accessToken !== null) {
      //   updateProfileInfo(firstName, lastName, email, phone, accessToken)
      //     .then((res) => {
      //       if (res?.status === 200) {
      //         console.log('Response from update profile:', res)
      //         setShow(false)
      //         setFirstNameError('') 
      //         setLastNameError('')
      //         setEmailError('')
      //         setPhoneError('')
      //         setFirstName('') 
      //         setLastName('') 
      //         setPhone('') 
      //         setEmail('')
      //         NotificationManager.success('Profile Updated Successfully!');
      //         history.push('/app/dashboard/saas');
      //         window.location.reload();
      //       }
      //       // else if (res?.status === 400) {
      //       //   setShow(false)
      //       //   setFirstNameError('') 
      //       //   setLastNameError('')
      //       //   setEmailError('')
      //       //   setPhoneError('') 
      //       //   setFirstName('') 
      //       //   setLastName('') 
      //       //   setPhone('') 
      //       //   setEmail('')
      //       //   console.log('Response from auth:', res)
      //       // } else {
      //       //   setFirstNameError('') 
      //       //   setLastNameError('')
      //       //   setEmailError('')
      //       //   setPhoneError('')
      //       //   setFirstName('') 
      //       //   setLastName('') 
      //       //   setPhone('') 
      //       //   setEmail('')
      //       //   console.log('Response from auth:', res)
      //       // }
      //     })
      //     .catch((err) => {
      //       console.log('Update profile error :', err?.response)
      //       console.log(err?.response?.data , "error data");
      //       if(err?.response?.status === 400){
      //         NotificationManager.error(err?.response?.data?.email?.[0]);
      //       }
      //     })
      // }
  //   } else {
  //     setShow(true)
  //     setFirstNameError('')
  //     setLastNameError('')
  //     // setPhoneError('* This is required Field')
  //     setEmailError('* Please Enter Valid Email address')
  //   }
  // }


  //==================== MY update profile ====================//
  const updateProfile = () => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const phoneRegex = /^\d{10}$/;  // /^[6789]\d{9}$/ (previous rule)
    let regexName = /^[a-zA-Z]{1,30}$/; // only alpha, no space, min-1, max-30

    if (email.trim() !== '' && phone.trim() !== '' && firstName.trim() !== '' && lastName.trim() !== '') {
      setShow(false)
      setFirstNameError('') 
      setLastNameError('')
      setEmailError('')
      setPhoneError('')

      if(regexName.test(firstName.trim())){
        if(regexName.test(lastName.trim())){
          if(phoneRegex.test(phone.trim(""))){
            if(emailRegex.test(email.trim(""))){
              const accessToken = JSON.parse(localStorage.getItem('token'))
              if (accessToken !== null) {
                updateProfileInfo(firstName, lastName, email.toLowerCase(), phone, accessToken)
                .then((res) => {
                  if (res?.status === 200) {
                    console.log('Response from update profile:', res)
                    setShow(false)
                    setFirstNameError('') 
                    setLastNameError('')
                    setEmailError('')
                    setPhoneError('')
                    setFirstName('') 
                    setLastName('') 
                    setPhone('') 
                    setEmail('')
                    NotificationManager.success('Profile Updated Successfully!');
                    history.push('/app/dashboard/saas');
                    window.location.reload();
                  }
                })
                .catch((err) => {
                  console.log('Update profile error :', err?.response)
                  console.log(err?.response?.data , "error data from user profile");
                  if(err?.response?.status === 400){
                    NotificationManager.error(err?.response?.data?.email?.[0]);
                  }
                })
            }
            } else {
              NotificationManager.error("Invalid email format!");
            }
          } else {
            NotificationManager.error("Phone number must be 10 digit long!");
          }
        } else {
          NotificationManager.error('Last name must contain only alphabet and no spacings!');
        }
      } else {
        NotificationManager.error('First name must contain only alphabet and no spacings!');
      }
    } else {
      setFirstNameError('* This is required Field') 
      setLastNameError('* This is required Field')
      setEmailError('* This is required Field')
      setPhoneError('* This is required Field')
      setShow(true)
    }
  }


  return (
    <div className="userProfile-wrapper">
      <Helmet>
        <title>Automaton | User Profile</title>
        <meta name="description" content="User Profile" />
      </Helmet>
      <PageTitleBar
        title={<IntlMessages id="sidebar.userProfile" />}
        match={props.match}
      />
      <RctCard>
        <UserBlock />
        <Form>
          <div className="edit-form">
            <FormGroup row>
              <Label for="firstName" sm={3}>
                First Name
              </Label>
              <Col sm={6}>
                <Input
                  type="text"
                  name="firstname"
                  className="input-lg"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {show && <p className="error mt-0">{firstNameError}</p>}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="firstName" sm={3}>
                Last Name
              </Label>
              <Col sm={6}>
                <Input
                  type="text"
                  name="lastname"
                  className="input-lg"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {show && <p className="error mt-0">{lastNameError}</p>}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="lastName" sm={3}>
                Phone Number
              </Label>
              <Col sm={6}>
                <Input
                  type="number"
                  name="lastName"
                  className="input-lg"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {show && <p className="error mt-0">{phoneError}</p>}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="occupation" sm={3}>
                Email
              </Label>
              <Col sm={6}>
                <Input
                  type="email"
                  name="email"
                  className="input-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {show && <p className="error mt-0">{emailError}</p>}
              </Col>
            </FormGroup>
            
            <FormGroup>
              <Col sm={9}>
                <Button
                  style={{backgroundColor: "#0b3d45", color:"#fff", borderRadius: "6px"}} 
                  className="text-white update-btn"
                  variant="contained"
                  size="large"
                  onClick={updateProfile}
                >
                  Update Profile
                </Button>
              </Col>
            </FormGroup>
          </div>
        </Form>
      </RctCard>
    </div>
  )
}
