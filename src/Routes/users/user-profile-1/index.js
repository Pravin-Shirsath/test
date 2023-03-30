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
import PhoneInput, { parsePhoneNumber, isValidPhoneNumber } from 'react-phone-number-input'
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
import { Zip_code_data } from 'Constants/Zipcodedata';

export default function UserProfile(props) {
  const [type, setUserType] = useState(JSON.parse(localStorage.getItem('user_type')));

  const [firstName, setFirstName] = useState(JSON.parse(localStorage.getItem("ProfileData")).first_name);
  const [lastName, setLastName] = useState(JSON.parse(localStorage.getItem("ProfileData")).last_name);
  const [email, setEmail] = useState(JSON.parse(localStorage.getItem("ProfileData")).email);
  const [phone, setPhone] = useState(JSON.parse(localStorage.getItem("ProfileData")).mobile_number);

  let lcountry = JSON.parse(localStorage.getItem("ProfileData")).country
  let lzipCode = JSON.parse(localStorage.getItem("ProfileData")).zip_code
  let lstate = JSON.parse(localStorage.getItem("ProfileData")).state
  let lbillingAddress = JSON.parse(localStorage.getItem("ProfileData")).billing_address
  let ltaxNumber = JSON.parse(localStorage.getItem("ProfileData")).tax_number
  let lcompanyname = JSON.parse(localStorage.getItem("ProfileData")).company_name

  const [country, setCountry] = useState((lcountry != null && lcountry != "" ? lcountry : ""))
  const [zipCode, setZipCode] = useState(lzipCode != null && lzipCode != "" ? lzipCode : "")
  const [state, setState] = useState(lstate != null && lstate != "" ? lstate : "")
  const [companyName, setCompanyName] = useState(lcompanyname != null && lcompanyname != "" ? lcompanyname : "")
  const [billingAddress, setBillingAddress] = useState(lbillingAddress != null && lbillingAddress != "" ? lbillingAddress : "")
  const [taxNumber, setTaxNumber] = useState(ltaxNumber != null && ltaxNumber != "" ? ltaxNumber : "")
  const [companyAddress, setCompanyAddress] = useState("")


  const [firstNameError, setFirstNameError] = useState('')
  const [lastNameError, setLastNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [image, setImage] = useState(null)
  const [countryError, setCountryError] = useState("")
  const [zipCodeError, setZipCodeError] = useState("")
  const [stateError, setStateError] = useState("")
  const [companyNameError, setCompanyNameError] = useState("")
  const [billingAddressError, setBillingAddressError] = useState("")
  const [taxNumberError, setTaxNumberError] = useState("")
  const [companyAddressError, setCompanyAddressError] = useState("")

  const [show, setShow] = useState(false)
  const history = useHistory();
  // console.log({
  //   "firstName:": firstName, "lastName:": lastName, "email": email, "phone": phone, "country": country, "zipCode:": zipCode, "state:": state, "companyName:": companyName,
  //   "billingAddress:": billingAddress, "taxNumber:": taxNumber, "companyAddress:": companyAddress
  // }
  // )
  //==================== MY update profile ====================//

  // getting image from user block component
  const GettingImage = (pic) => {

    if (pic != null && pic != undefined) {
      console.log("pic=========", pic)
      setImage(pic)
    }
  }

  const ProfileApiCall = (ProfileDetails) => {
    console.log("Profile_Details==", ProfileDetails)
    const accessToken = JSON.parse(localStorage.getItem('token'))
    const userId = JSON.parse(localStorage.getItem('ProfileData'))
    if (accessToken !== null) {

      updateProfileInfo(ProfileDetails, accessToken, userId.id).then((res) => {
        if (res?.status === 200) {
          console.log('Response from update profile:', res)


          NotificationManager.success('Profile Updated Successfully!');

          setShow(false)
          setFirstNameError('')
          setLastNameError('')
          setEmailError('')
          setPhoneError('')
          setCompanyNameError("")
          setTaxNumberError("")
          setBillingAddressError("")

          setFirstName('')
          setLastName('')
          setPhone('')
          setEmail('')

          setCountry('')
          setZipCode('')
          setState('')
          setCompanyName('')
          setBillingAddress('')
          setTaxNumber('')
          setCompanyAddress('')

          if(type === "admin"){
            history.push("/app/dashboard/Admin/Dashboard")
           
           }

            if(type === "customer" || type === "company_admin"){
              history.push('/app/dashboard/saas');
            }

          //  alert("done")
          // setTimeout(() => {
          //   history.push('/');
          // }, 1000)
          //  history.push('/');
          //  window.location.reload();
        }
      })
        .catch((err) => {

          console.log('Update profile error :', err?.response)
          console.log(err?.response?.data, "error data from user profile");
          if (err?.response?.status === 400) {
            if (err?.response?.data) {
              let data = err?.response?.data
              for (var key in data) {
                if (data.hasOwnProperty(key)) {
                  NotificationManager.error(data[key]);
                  // console.log(key + " -> " + data[key]);
                }
              }
              // err?.response?.data.forEach(item=>{

              //   NotificationManager.error(item);
              // })
            }
          }
        })
    } else {
      NotificationManager.error("accessToken not found");
    }

  }

  const AdminupdateProfile = () => {
    const Profile_Details = {}
    const fd = new FormData();
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const phoneRegex = /^\d{10}$/;  // /^[6789]\d{9}$/ (previous rule)
    const regexName = /^[a-zA-Z]{1,30}$/; // only alpha, no space, min-1, max-30
    const TaxnumberRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
    const isValidZip = /^[1-9][0-9]\d{6}$/
    if (email.trim() !== '' && (phone !== null || phone !== undefined) && firstName.trim() !== '' && lastName.trim() !== '') {
      setShow(false)
      setFirstNameError('')
      setLastNameError('')
      setEmailError('')
      setPhoneError('')
     
      if (country != "") {

        fd.append('country', country)
      }
      if (state != "") {

        fd.append('state', state)
      }


      if (image != null) {
        Profile_Details.profile_image = image
        fd.append('profile_image', image)
      }
      if (zipCode != "") {

        const zipobjget = async (zipCode) => {
          const Zip_obj = await Zip_code_data.find((item) => item.Country.toLowerCase() == country.toLowerCase())
          const re = new RegExp(Zip_obj.Regex);
          return re.test(zipCode + "".trim())
        }
        if (zipobjget(zipCode)) {
          if (regexName.test(firstName.trim())) {
            if (regexName.test(lastName.trim())) {

              if ((isValidPhoneNumber(phone + "".trim("")))) {

                if (emailRegex.test(email.trim(""))) {

                  
                    fd.append('zip_code', zipCode)
                    fd.append('first_name', firstName)
                    fd.append('last_name', lastName)
                    fd.append('mobile_number', phone)
                    fd.append('email', email.toLowerCase())
                   

                    ProfileApiCall(fd)
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

        }else{
          NotificationManager.error('Invalid format Zip-code!');
        }


      }else{
        if (regexName.test(firstName.trim())) {
          if (regexName.test(lastName.trim())) {

            if ((isValidPhoneNumber(phone + "".trim("")))) {

              if (emailRegex.test(email.trim(""))) {
               
                  // fd.append('zip_code', zipCode)
                  fd.append('first_name', firstName)
                  fd.append('last_name', lastName)
                  fd.append('mobile_number', phone)
                  fd.append('email', email.toLowerCase())
                 
                  ProfileApiCall(fd)
               
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
      }

    } else {
      setFirstNameError('')
      setLastNameError('')
      setEmailError('')
      setPhoneError('')



      if (email.trim() == '') {
        setEmailError('* This is required Field')
      }
      if (firstName.trim() == '') {
        setFirstNameError('* This is required Field')
      }
      if (lastName.trim() == '') {
        setLastNameError('* This is required Field')
      }
      if (phone == null) {
        setPhoneError('* This is required Field')
      }

      setShow(true)
    }
  }

  const updateProfile = () => {
    const Profile_Details = {}
    const fd = new FormData();
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const phoneRegex = /^\d{10}$/;  // /^[6789]\d{9}$/ (previous rule)
    const regexName = /^[a-zA-Z]{1,30}$/; // only alpha, no space, min-1, max-30
    const TaxnumberRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
    const isValidZip = /^[1-9][0-9]\d{6}$/

    if (email.trim() !== '' && (phone !== null || phone !== undefined) && firstName.trim() !== '' && lastName.trim() !== '' && companyName.trim() !== '' && billingAddress.trim() !== '' && taxNumber.trim() !== '') {

      setShow(false)
      setFirstNameError('')
      setLastNameError('')
      setEmailError('')
      setPhoneError('')
      setCompanyNameError("")
      setTaxNumberError("")
      setBillingAddressError("")

      if (country != "") {

        fd.append('country', country)
      }
      if (state != "") {

        fd.append('state', state)
      }



      if (companyAddress != "") {

        fd.append('company_address', companyAddress)
      }

      if (image != null) {
        Profile_Details.profile_image = image
        fd.append('profile_image', image)
      }


      if (zipCode != "") {

        const zipobjget = async (zipCode) => {
          const Zip_obj = await Zip_code_data.find((item) => item.Country.toLowerCase() == country.toLowerCase())
          const re = new RegExp(Zip_obj.Regex);
          return re.test(zipCode + "".trim())
        }

        if (zipobjget(zipCode)) {

          if (regexName.test(firstName.trim())) {
            if (regexName.test(lastName.trim())) {

              if ((isValidPhoneNumber(phone + "".trim("")))) {

                if (emailRegex.test(email.trim(""))) {

                  if (TaxnumberRegex.test(taxNumber + "".trim(""))) {
                    console.log(zipCode, ">>>>>>>>>>>>>")
                    // fd.append('parcel_id', parcelID) 
                    fd.append('zip_code', zipCode)
                    fd.append('first_name', firstName)
                    fd.append('last_name', lastName)
                    fd.append('mobile_number', phone)
                    fd.append('email', email.toLowerCase())
                    fd.append('billing_address', billingAddress)
                    fd.append('tax_number', taxNumber);
                    fd.append('company_name', companyName)

                    ProfileApiCall(fd)

                  } else {
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
          NotificationManager.error('Invalid format Zip-code!');

        }



      } else {
        if (regexName.test(firstName.trim())) {
          if (regexName.test(lastName.trim())) {

            if ((isValidPhoneNumber(phone + "".trim("")))) {

              if (emailRegex.test(email.trim(""))) {

                if (TaxnumberRegex.test(taxNumber + "".trim(""))) {

                  // fd.append('parcel_id', parcelID)              
                  fd.append('first_name', firstName)
                  fd.append('last_name', lastName)
                  fd.append('mobile_number', phone)
                  fd.append('email', email.toLowerCase())
                  fd.append('billing_address', billingAddress)
                  fd.append('tax_number', taxNumber);
                  fd.append('company_name', companyName)
                  ProfileApiCall(fd)

                } else {
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
      }


    } else {
      setFirstNameError('')
      setLastNameError('')
      setEmailError('')
      setPhoneError('')

      setCompanyNameError("")
      setTaxNumberError("")
      setBillingAddressError("")

      if (email.trim() == '') {
        setEmailError('* This is required Field')
      }
      if (firstName.trim() == '') {
        setFirstNameError('* This is required Field')
      }
      if (lastName.trim() == '') {
        setLastNameError('* This is required Field')
      }
      if (companyName.trim() == '') {
        setCompanyNameError("* This is required Field")

      }
      if (billingAddress.trim() == '') {
        setBillingAddressError("* This is required Field")

      }

      if (taxNumber.trim() == '') {
        setTaxNumberError("* This is required Field")

      }
      if (phone == null) {

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
        title={<IntlMessages id={type ==="admin"?"sidebar.AdminProfile" :"sidebar.userProfile" }/>}
        match={props.match}
      />
      <RctCard data-bs-spy="scroll">
        <UserBlock GettingImage={GettingImage} />

        <Form className="border">
          <section className="bg-danger border border-5 py-10 d-flex align-items-center justify-content-center dark-primary text-white">
            <h2 className='m-auto'>Personal Details</h2>
          </section>

          <div className="edit-form">
            <FormGroup row >
              <Col sm={6} >
                <Col sm={12} className="d-flex justify-content-center align-items-center">
                  <Label for="firstName" sm={3} className="d-flex">
                    First Name <span className="text-danger madatory-field">*</span>
                  </Label>

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
                <Col sm={12} className="d-flex justify-content-center align-items-center" >
                  <Label for="lastName" sm={3} className="d-flex">
                    Last Name <span className="text-danger madatory-field">*</span>
                  </Label>

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
                <Col sm={12} className="d-flex justify-content-center align-items-center">
                  <Label for="email" sm={3} className="d-flex ">
                    Email Id <span className="text-danger madatory-field">*</span>
                  </Label>

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
                <Col sm={12} className="d-flex justify-content-center align-items-center">
                  <Label for="state" sm={3}>
                    State
                  </Label>
                  <RegionDropdown
                    classes="w-100 form-control form-control-lg text-md"
                    style={{ fontSize: '16px', type: "text" }}
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
                <Col sm={12} className="d-flex justify-content-center align-items-center">
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
                <Col sm={12} className="d-flex justify-content-center align-items-center">
                  <Label for="zipCode" sm={3}>
                    Zip-code
                  </Label>
                  <Input
                    type="text"
                    name="zipcode"
                    className="input-lg"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    sm={9}
                    disabled={state.length > 0 ? false : true}
                  />
                </Col>
                <div className="d-flex align-item-center justify-content-center">

                  {show && <p className="error mt-0">{zipCodeError}</p>}
                </div>
              </Col>

            </FormGroup>

            <FormGroup row>

              <Col sm={6} >
                <Col sm={12} className="d-flex justify-content-center align-items-center">
                  <Label for="phone" sm={3} className="d-flex">
                    Phone <span className="text-danger madatory-field">*</span>
                  </Label>

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
            {type == "admin" && <>
            <FormGroup className="row mt-50">
                  <Col sm={6}>
                    <h4>   <span className="text-danger madatory-field">*</span> Mandatory Field</h4>
                  </Col>
                  <Col sm={6}>
                    <section  style={{display:"flex", justifyContent:"flex-end", alignItems:"center", gap:"0px"}} >

                      <Col sm={6} lg={3} className="d-flex justify-content-center align-item-center">
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
                      <Col sm={6} lg={3} className="d-flex justify-content-center align-item-center">
                        <Button
                          color="primary"
                          className="btn-block px-50 text-white fw-bold btn-danger"
                          variant="contained"
                          size="medium"
                          onClick={() => { history.push("/") }}
                          style={{ maxWidth: "150px" }}
                        >
                          Cancel
                        </Button>
                      </Col>

                    </section>
                  </Col>
                </FormGroup>
            </>}

          </div>
          {(type == "customer" || type == "company_admin") &&

            (<>
              <section className="border border-5 py-10 d-flex align-item-center justify-content-center dark-primary text-white">
                <h2 className='m-auto'>Company Details</h2>
              </section>
              <div className="edit-form">

                <FormGroup row >

                  <Col sm={6} >
                    <Col sm={12} className="d-flex justify-content-center align-items-center">
                      <Label for="companyName" sm={3} className="d-flex">
                        Company Name <span className="text-danger madatory-field">*</span>
                      </Label>

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
                    <Col sm={12} className="d-flex justify-content-center align-items-center">
                      <Label for="billingAddress" sm={3} className="d-flex">
                        Billing Address <span className="text-danger madatory-field">*</span>
                      </Label>

                      <Input
                        // type="text"
                        style={{ height: 55 }}
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
                    <Col sm={12} className="d-flex justify-content-center align-items-center">
                      <Label for="taxNumber" sm={3} className="d-flex">
                        Tax Number <span className="text-danger madatory-field">*</span>
                      </Label>

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
                    <Col sm={12} className="d-flex justify-content-center align-items-center">
                      <Label for="companyAddress" sm={3}>
                        Company Address
                      </Label>
                      <Input
                        // type="text"
                        type="textarea"
                        // rows={15}
                        style={{ height: 55 }}
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
                    <h4>   <span className="text-danger">*</span> Mandatory Field</h4>
                  </Col>
                  <Col sm={6}>
                    <section  style={{display:"flex", justifyContent:"flex-end", alignItems:"center", gap:"0px"}} >

                      <Col sm={6} lg={3} className="d-flex justify-content-center align-item-center">
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
                      <Col sm={6} lg={3} className="d-flex justify-content-center align-item-center">
                        <Button
                          color="primary"
                          className="btn-block px-50 text-white fw-bold btn-danger"
                          variant="contained"
                          size="medium"
                          onClick={() => { history.push("/") }}
                          style={{ maxWidth: "150px" }}
                        >
                          Cancel
                        </Button>
                      </Col>

                    </section>
                  </Col>
                </FormGroup>
              </div>


            </>)
}

        </Form>
      </RctCard>
    </div>
  )
}
