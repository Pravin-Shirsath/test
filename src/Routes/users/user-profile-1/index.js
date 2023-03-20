/**
 * User Profile Page
 */
import React, { useState, useEffect } from 'react'

import { Helmet } from 'react-helmet'

import UserBlock from './component/UserBlock'
import { Form, FormGroup, Input, Label, Col } from 'reactstrap'
import { useHistory } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import 'react-phone-number-input/style.css'
import PhoneInput,{parsePhoneNumber,isValidPhoneNumber} from 'react-phone-number-input'
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
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

  const [country, setCountry] = useState("")
  const [zipCode, setZipCode] = useState("")
  const [state, setState] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [billingAddress, setBillingAddress] = useState("")
  const [taxNumber, setTaxNumber] = useState("")
  const [companyAddress, setCompanyAddress] = useState("")
  

  const [firstNameError, setFirstNameError] = useState('')
  const [lastNameError, setLastNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [phoneError, setPhoneError] = useState('')

  const [countryError, setCountryError] = useState("")
  const [zipCodeError, setZipCodeError] = useState("")
  const [stateError, setStateError] = useState("")
  const [companyNameError, setCompanyNameError] = useState("")
  const [billingAddressError, setBillingAddressError] = useState("")
  const [taxNumberError, setTaxNumberError] = useState("")
  const [companyAddressError, setCompanyAddressError] = useState("")

  const [show, setShow] = useState(false)
  const history = useHistory();
  console.log({
    "firstName:": firstName, "lastName:": lastName, "email": email, "phone": phone, "country": country, "zipCode:": zipCode, "state:": state, "companyName:": companyName,
    "billingAddress:": billingAddress, "taxNumber:": taxNumber, "companyAddress:": companyAddress
  }
  )
  //==================== MY update profile ====================//

const ProfileApiCall=()=>{  
  const accessToken = JSON.parse(localStorage.getItem('token'))

    if (accessToken !== null) {

      NotificationManager.success('Profile Updated Successfully!');

  // updateProfileInfo(firstName, lastName, email.toLowerCase(), phone, accessToken)
  //   .then((res) => {
  //     if (res?.status === 200) {
  //       console.log('Response from update profile:', res)
  //       setShow(false)
  //       setFirstNameError('')
  //       setLastNameError('')
  //       setEmailError('')
  //       setPhoneError('')
  //       setCompanyNameError("")
  //       setTaxNumberError("")
  //       setBillingAddressError("")

  //       setFirstName('')
  //       setLastName('')
  //       setPhone('')
  //       setEmail('')

  //       setCountry('')
  //       setZipCode('')
  //       setState('')
  //       setCompanyName('')
  //       setBillingAddress('')
  //       setTaxNumber('')
  //       setCompanyAddress('')
  //       NotificationManager.success('Profile Updated Successfully!');
  //       history.push('/app/dashboard/saas');
  //       window.location.reload();
  //     }
  //   })
  //   .catch((err) => {
   
  //     console.log('Update profile error :', err?.response)
  //     console.log(err?.response?.data, "error data from user profile");
  //     if (err?.response?.status === 400) {
  //       NotificationManager.error(err?.response?.data?.email?.[0]);
  //     }
  //   })
}else{
  NotificationManager.error("accessToken not found");
}

}


  const updateProfile = () => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const phoneRegex = /^\d{10}$/;  // /^[6789]\d{9}$/ (previous rule)
    const regexName = /^[a-zA-Z]{1,30}$/; // only alpha, no space, min-1, max-30
    const TaxnumberRegex=/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
    const  isValidZip = /^[1-9][0-9]{5}$/
    if (email.trim() !== '' && (phone !== null || phone !== undefined) && firstName.trim() !== '' && lastName.trim() !== '' && companyName.trim() !== '' && billingAddress.trim() !== '' && taxNumber.trim() !== '') {
      setShow(false)
      setFirstNameError('')
      setLastNameError('')
      setEmailError('')
      setPhoneError('')
      
      setCompanyNameError("")
      setTaxNumberError("")
      setBillingAddressError("")
     
     
      // const phoneNumbervalidation = parsePhoneNumber(phone+"")
 

      if (regexName.test(firstName.trim())) {
        if (regexName.test(lastName.trim())) {
         
          if ((isValidPhoneNumber(phone+"".trim("")))) {
            
            if (emailRegex.test(email.trim(""))) {
             if(TaxnumberRegex.test(taxNumber+"".trim(""))){
             
              if(zipCode != ""){
                if(isValidZip.test(zipCode.trim(""))){
                NotificationManager.error("Invalid Zip-Code format!");

                }else{
                  ProfileApiCall()
                }
              }else{
                ProfileApiCall()
              }
          
             }else{
              NotificationManager.error("Invalid Tax format!");
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
      setFirstNameError('')
      setLastNameError('')
      setEmailError('')
      setPhoneError('')
      
      setCompanyNameError("")
      setTaxNumberError("")
      setBillingAddressError("")
      
    if (email.trim() == ''){
      setEmailError('* This is required Field')

    } 
    if(firstName.trim() == '' ){
      setFirstNameError('* This is required Field')
    }
     if(lastName.trim() == ''){
      setLastNameError('* This is required Field')
    }
     if(companyName.trim() == ''){
      setCompanyNameError("* This is required Field")

    }
     if(billingAddress.trim() == ''){
      setBillingAddressError("* This is required Field")

    }
    
    if(taxNumber.trim() == ''){
      setTaxNumberError("* This is required Field")

    }
      if(phone == null ){

        setPhoneError('* This is required Field')
      }
      
     
      
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
      <RctCard data-bs-spy="scroll">
        <UserBlock />

        <Form className="border">
          <section className="border border-5 py-10 d-flex align-item-center justify-content-center bg-dark text-white">
            <h2>Personal Details</h2>
          </section>
          <div className="edit-form">

            <FormGroup row >

              <Col sm={6} >
                <Col sm={12} className="d-flex ">
                  <Label for="firstName" sm={3} className="d-flex">
                    First Name
                  </Label>
                  <span className="text-danger">*</span>
                  <Input
                    type="text"
                    name="firstname"
                    className="input-lg"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    sm={9}
                  />
                </Col>
                <div className="d-flex align-item-center justify-content-center">

                  {show && <p className="error mt-0">{firstNameError}</p>}
                </div>
              </Col>


              <Col sm={6} >
                <Col sm={12} className="d-flex ">
                  <Label for="lastName" sm={3} className="d-flex">
                    Last Name
                  </Label>
                  <span className="text-danger">*</span>
                  <Input
                    type="text"
                    name="lastName"
                    className="input-lg"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    sm={9}
                  />
                </Col>
                <div className="d-flex align-item-center justify-content-center">

                  {show && <p className="error mt-0">{lastNameError}</p>}
                </div>
              </Col>
            </FormGroup>




            <FormGroup row>

              <Col sm={6} >
                <Col sm={12} className="d-flex ">
                  <Label for="email" sm={3} className="d-flex">
                    Email Id
                  </Label>
                  <span className="text-danger">*</span>
                  <Input
                    type="text"
                    name="email"
                    className="input-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sm={9}
                  />
                </Col>
                <div className="d-flex align-item-center justify-content-center">

                  {show && <p className="error mt-0">{emailError}</p>}
                </div>
              </Col>

              <Col sm={6} >
                <Col sm={12} className="d-flex ">
                  <Label for="state" sm={3}>
                    State
                  </Label>
                  <RegionDropdown
                    classes="w-100 form-control form-control-lg"
                    style={{ fontSize: '19px', type: "text" }}
                    country={country}
                    value={state}
                    onChange={(val) => (setState(val), console.log(val))} />
                  {/* <Input
                    type="text"
                    name="state"
                    className="input-lg"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    sm={9}
                  /> */}
                </Col>
                <div className="d-flex align-item-center justify-content-center">

                  {show && <p className="error mt-0">{stateError}</p>}
                </div>
              </Col>

            </FormGroup>

            <FormGroup row>
              <Col sm={6} >
                <Col sm={12} className="d-flex ">
                  <Label for="country" sm={3}>
                    Country
                  </Label>
                  <CountryDropdown
                    classes="w-100 form-control form-control-lg text-md"
                    value={country}
                    onChange={(val) => (setCountry(val))}
                    style={{ fontSize: '17px', type: "text" }}
                  />



                  {/* <Input
                    type="text"
                    name="country"
                    className="input-lg"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    sm={9}
                  /> */}
                </Col>
                <div className="d-flex align-item-center justify-content-center">

                  {show && <p className="error mt-0">{countryError}</p>}
                </div>
              </Col>

              <Col sm={6} >
                <Col sm={12} className="d-flex ">
                  <Label for="zipCode" sm={3}>
                    Zipcode
                  </Label>
                  <Input
                    type="text"
                    name="zipcode"
                    className="input-lg"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    sm={9}
                  />
                </Col>
                <div className="d-flex align-item-center justify-content-center">

                  {show && <p className="error mt-0">{zipCodeError}</p>}
                </div>
              </Col>

            </FormGroup>

            <FormGroup row>

              <Col sm={6} >
                <Col sm={12} className="d-flex ">
                  <Label for="phone" sm={3} className="d-flex">
                    Phone
                  </Label>
                  <span className="text-danger">*</span>
                  <PhoneInput
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e) => setPhone(e)}
                    defaultCountry={"IN"}
                    className="w-100 form-control form-control-lg text-md"
                    // focusInputOnCountrySelection={false}


                    limitMaxLength={true}


                    sm={9}
                  />
                  {/* <Input
                    type="number"
                    // placeholder="Enter phone number"
                    maxLength="10"
                    max={10}
                    name="phone"
                    className="input-lg"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    sm={9}
                  /> */}
                </Col>
                <div className="d-flex align-item-center justify-content-center">

                  {show && <p className="error mt-0">{phoneError}</p>}
                </div>
              </Col>




            </FormGroup>


          </div>
          <section className="border border-5 py-10 d-flex align-item-center justify-content-center bg-dark text-white">
            <h2>Company Details</h2>
          </section>
          <div className="edit-form">

            <FormGroup row >

              <Col sm={6} >
                <Col sm={12} className="d-flex ">
                  <Label for="companyName" sm={3} className="d-flex">
                    Company Name
                  </Label>
                  <span className="text-danger">*</span>
                  <Input
                    type="text"
                    name="companyName"
                    className="input-lg"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    sm={9}
                  />
                </Col>
                <div className="d-flex align-item-center justify-content-center">

                  {show && <p className="error mt-0">{companyNameError}</p>}
                </div>
              </Col>


              <Col sm={6} >
                <Col sm={12} className="d-flex ">
                  <Label for="billingAddress" sm={3} className="d-flex">
                    Billing Address
                  </Label>
                  <span className="text-danger">*</span>
                  <Input
                    // type="text"
                    style={{ height: 120 }}
                    type="textarea"
                    name="billingAddress"
                    className="input-lg"
                    value={billingAddress}
                    onChange={(e) => setBillingAddress(e.target.value)}
                    sm={9}
                  />
                </Col>
                <div className="d-flex align-item-center justify-content-center">

                  {show && <p className="error mt-0">{billingAddressError}</p>}
                </div>
              </Col>
            </FormGroup>




            <FormGroup row>

              <Col sm={6} >
                <Col sm={12} className="d-flex ">
                  <Label for="taxNumber" sm={3} className="d-flex">
                    Tax Number
                  </Label>
                  <span className="text-danger">*</span>
                  <Input
                    type="text"
                    name="taxNumber"
                    className="input-lg"
                    value={taxNumber}
                    onChange={(e) => setTaxNumber(e.target.value)}
                    sm={9}
                  />
                </Col>
                <div className="d-flex align-item-center justify-content-center">

                  {show && <p className="error mt-0">{taxNumberError}</p>}
                </div>
              </Col>

              <Col sm={6} >
                <Col sm={12} className="d-flex ">
                  <Label for="companyAddress" sm={3}>
                    company Address
                  </Label>
                  <Input
                    // type="text"
                    type="textarea"
                    // rows={15}
                    style={{ height: 120 }}
                    name="companyAddress"
                    className="input-lg"
                    value={companyAddress}
                    onChange={(e) => setCompanyAddress(e.target.value)}
                    sm={9}
                  />
                </Col>
                <div className="d-flex align-item-center justify-content-center">

                  {show && <p className="error mt-0">{companyAddressError}</p>}
                </div>
              </Col>

            </FormGroup>




            <FormGroup className="row mt-50">
              <Col sm={6}>
                <h4>   <span className="text-danger">*</span> Compulsory Field</h4>
              </Col>
              <Col sm={6}>
                <section className="row " >

                  <Col sm={6}>
                    <Button
                      color="primary"
                      className="btn-block text-white px-50 fw-bold bg-primary.bg-gradient"
                      variant="contained"
                      size="medium"
                       onClick={updateProfile}
                      style={{ maxWidth: "150px" }}
                    >
                      Save
                    </Button>

                  </Col>
                  <Col sm={6}>
                    <Button
                      color="primary"
                      className="btn-block px-50 py-2 text-white fw-bold btn-danger"
                      variant="contained"
                      size="medium"
                      // onClick={()=>{ history.push("/signin")}}
                      style={{ maxWidth: "150px" }}
                    >
                      Cancel
                    </Button>
                  </Col>

                </section>


              </Col>






            </FormGroup>
          </div>
        </Form>
      </RctCard>
    </div>
  )
}
