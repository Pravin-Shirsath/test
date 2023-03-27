import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";

import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

import IntlMessages from 'Util/IntlMessages';

import Papa from "papaparse";
import { NotificationManager } from 'react-notifications';


import {  useHistory } from 'react-router-dom';

import {
   Button,
   Form,
   FormGroup,
   Label,
   Input,
} from 'reactstrap';

// import for loader spinner
import { RotatingLines } from 'react-loader-spinner'
// import for react-countdown-circle-timer
import { CountdownCircleTimer } from "react-countdown-circle-timer";

// dummy json data, response of impactable sales outcome
import data from "./v0_sales_outcome.json"

//===== imports for loading spinner modal and timer modal ====//
// import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import '../../../Assets/css/modal.css';
import { createModal, getAdminList, scenarioPlanning, getImpactableSalesOutcome, postMlDataWithModelRef } from 'Api';

import '../../../Assets/css/main.css';
import { rgbaToRgb } from '@amcharts/amcharts4/.internal/core/utils/Colors';

export default function CreateNewModal(props) {
   const history = useHistory();
   const [options, setOptions] = useState();
   const [timeVariable, setTimeVariable] = useState();
   const [dependentVariable, setDependentTimeVariable] = useState();
   const [promotionalDrivers, setPromotionalDrivers] = useState([]);
   const [nonPromotionalDrivers, setNonPromotionalDrivers] = useState([]);
   const [csvFile, setCSVFile] = useState(null);
   const [modelRefNo, setModelRefNo] = useState("");

   // state used for countdown timer modal
   const [openTimer, setOpenTimer] = useState(false);

   // state used for countdown timer modal
   const [openLoding, setOpenLoading] = useState(false);


   useEffect(() => {
      const isLoggedInBool = localStorage.getItem("isLoggedIn")
      if(isLoggedInBool !== "true"){
         history.push("/login")
         // localStorage.clear();
      }

      // == using adminlist api as dummy for token validation ===//
      const accessToken = JSON.parse(localStorage.getItem('token'))

      //conditional rendring
      // if (accessToken !== null) {
      //    getAdminList(accessToken, "")
      //       .then((res) => {
      //       })
      //       .catch((err) => {
      //          // console.log("status of invalid token", err?.response?.data, err?.response?.status)
      //          if (err?.response?.status == 401) {
      //             localStorage.clear();
      //             history.push("/login");
      //             // window.location.reload();
      //          } else {
      //             // console.log('Response from createmdodal:', err)
      //          }
      //       })
      // }
   }, [])


   //==== ORIGINAL GENERATE MODAL, with proper API validations and chaining ======//
   // const generateModal = () => {
   //    console.log("options:", options, timeVariable, dependentVariable, promotionalDrivers, nonPromotionalDrivers, csvFile)
   //    const accessToken = JSON.parse(localStorage.getItem('token'));
   //    if (accessToken !== null) {
   //       console.log(" accessToken", accessToken)

   //       createModal(accessToken, options, timeVariable, dependentVariable, promotionalDrivers, nonPromotionalDrivers, csvFile)
   //          .then((res) => {
   //             if (res?.status === 200) {
   //                NotificationManager.success('Model created successfully!!');
   //                setOptions();
   //                setTimeVariable();
   //                setDependentTimeVariable();
   //                setPromotionalDrivers();
   //                setNonPromotionalDrivers();
   //                // setCSVFile(null);
   //                console.log(document.getElementById("fileField"), "file field element")
   //                document.getElementById("fileField").value = null;
   //                setFile(null);
   //                console.log("Response from create modal", res);

   //                // below is the API handling for scenario planning API, we are passing, token, csvfile and all data inside a single array as parameters
   //                handleClickOpenLoadingBox()
   //                console.log(accessToken, csvFile, [timeVariable, dependentVariable, ...promotionalDrivers, ...nonPromotionalDrivers], "Data to send in scenario planning")
   //                scenarioPlanning(accessToken, csvFile, [timeVariable, dependentVariable, ...promotionalDrivers, ...nonPromotionalDrivers])
   //                   .then(res => {
   //                      handleCloseLoadingBox();
   //                      console.log(res, "Res from scenario planning called after generating model")
   //                      if (res.status == 200) {
   //                         getImpactableSalesOutcome()
   //                            .then(res => {
   //                               console.log(res, "response from getIMpactable sales outcome then block")
   //                               if (res.status == 200) {
   //                                  console.log("response on success from getImpactable sales outcome!")
   //                               }
   //                            })
   //                            .catch(err => {
   //                               console.log(err, "Error on running getImpactables sales outcome!")
   //                            })
   //                      }
   //                   })
   //                   .catch(err => {
   //                      console.log(err.response, "errr from scenario planning called after generating model")
   //                      handleCloseLoadingBox();
   //                      NotificationManager.error("Unable to get data..!!")
   //                      if (err.response == undefined) {
   //                         handleClickOpenTimerBox();
   //                         console.log("undefined in catch of scenario planning!")
   //                      }
   //                   })
   //             }
   //             else {
   //                NotificationManager.error('Error while creating a model');
   //             }
   //          })
   //          .catch(err => {
   //             NotificationManager.error('Error while creating a model');
   //             console.log(" ERR Response from create modal", err)
   //          });
   //    }
   // }

   //==== JUGADU GENERATE MODAL, with not proper validations, explicitly making API response true and working aage ======//
   const generateModal = () => {
      // console.log("options:", options, timeVariable, dependentVariable, promotionalDrivers, nonPromotionalDrivers, csvFile)
      const accessToken = JSON.parse(localStorage.getItem('token'));
      if (accessToken !== null) {
         // console.log(" accessToken", accessToken)

         if(timeVariable && dependentVariable && promotionalDrivers.length > 0 && nonPromotionalDrivers.length > 0){
            createModal(accessToken, options, timeVariable, dependentVariable, promotionalDrivers, nonPromotionalDrivers, csvFile)
            .then((res) => {
               if (res?.status === 200) {
                  NotificationManager.success('Model created successfully!!');
                  setOptions();
                  setTimeVariable();
                  setDependentTimeVariable();
                  setPromotionalDrivers();
                  setNonPromotionalDrivers();
                  setModelRefNo(res.data.ref_no)
                  localStorage.setItem("modelRefNo", res.data.ref_no);
                  // setCSVFile(null);
                  // console.log(document.getElementById("fileField"), "file field element")
                  document.getElementById("fileField").value = null;
                  setFile(null);
                  // console.log("Response from create modal", res);

                  // below is the API handling for scenario planning API, we are passing, token, csv-file and all data inside a single array as parameters
                  // handleClickOpenLoadingBox();
                  // console.log(accessToken, csvFile, [timeVariable, dependentVariable, ...promotionalDrivers, ...nonPromotionalDrivers], "Data to send in scenario planning")

                  // below using setTimeout as for the resposne from the scenario planning API (csv validation), that its fulfilled
                  setTimeout(() => {
                     handleCloseLoadingBox();

                     // senario planing (csv validation fulfilled ho gaya to new api call i.e; get_impactable_sales_outcome API) call hua and niche new setTimeOut chlega
                     // loading spinner close hoga after 10 seconds and 7 seconds timer strt hoga and then console krega client ka json data
                     handleClickOpenTimerBox();
                     setTimeout(() => {
                     
                        let parsedData = JSON.parse(data) /// an object (parsed data is acceptable by the API)
                        let jsonSendFormat = JSON.stringify(parsedData); // stringified parsed data is #not acceptable by the API
                        let modelRef = localStorage.getItem("modelRefNo");


                        postMlDataWithModelRef(accessToken, modelRef, parsedData)
                           .then(res =>{
                              NotificationManager.success(res?.data?.message)
                           })
                           .catch(err =>{
                              // console.log(err, "errrrrrrrr")
                              NotificationManager.error('bllaaaahhhhh.... errorrr')
                           })
                     }, 10000)
                  }, 5000)
               }
               else {
                  NotificationManager.error('Error while creating a model');
               }
            })
            .catch(err => {
               NotificationManager.error('Error while creating a model');
               // console.log(" ERR Response from create model", err)
            });
         } else {
            NotificationManager.error("All fields must pe selected!")
         }
      }

   }


   // function which i making mm:ss time format in react timer
   const children = ({ remainingTime }) => {
    
      const minutes = Math.floor(remainingTime / 60);
      const seconds = remainingTime % 60;

      if (remainingTime === 0) {
         handleCloseTimerBox();
      }

      return (
         <div className="timer">
            <div className="value" style={{ fontSize: "35px", color: "white" }}>{minutes}:{seconds}</div>
         </div>
      );
   };


   // Handling multiple select for promotional driver
   const handlePromotonalDriver = (e) => {
      setPromotionalDrivers(Array.from(e.target.selectedOptions, (option) => option.value));
   }

   // Handling multiple select for non-promotional driver
   const handleNonPromotonalDriver = (e) => {
      setNonPromotionalDrivers(Array.from(e.target.selectedOptions, (option) => option.value));
   }


   const [file, setFile] = useState(null);

   const [parsedData, setParsedData] = useState([]);


   const changeHandler = (event) => {
      // Passing file data (event.target.files[0]) to parse using Papa.parse
      // console.log("file", event.target.files[0])
      setCSVFile(event.target.files[0]);
      Papa.parse(event.target.files[0], {
         header: true,
         skipEmptyLines: true,
         complete: function (results) {


            // Parsed Data Response in array format
            setParsedData(results.data);
            // console.log("parsed Data", results.data, results?.meta?.fields)
            setOptions(results?.meta?.fields)


         },
      });
   };

   // functions for opening and closing of timer modal box
   const handleClickOpenTimerBox = () => {
      setOpenTimer(true);
   };

   const handleCloseTimerBox = (event, reason) => {
      if (reason && reason == "backdropClick" || reason && reason == "escapeKeyDown")
         return;
      setOpenTimer(false);
   };

   // functions for opening and closing of loading modal box
   const handleClickOpenLoadingBox = () => {
      setOpenLoading(true);
   };

   const handleCloseLoadingBox = (event, reason) => {
      if (reason && reason == "backdropClick" || reason && reason == "escapeKeyDown")
         return;
      setOpenLoading(false)
   };

   // console.log(modelRefNo, "modelll refff noooo");
   return (
      <div className="blank-wrapper">
         <Helmet>
            <title>Automaton | Create a New Model</title>
            <meta name="description" content="Automaton Widgets" />
         </Helmet>
         <PageTitleBar
            title={<IntlMessages id="sidebar.modal1" />}
            match={props.match}
         />
         <div className="row d-flex justify-content-center align-items-center model-form">
            <div className="col-sm-12 col-md-12 col-xl-12">
               <RctCollapsibleCard>
                  <Form>
                     <FormGroup className='d-flex justify-content-between'>
                        <div className='d-flex justify-content-between w-100'>
                           <Label for="File">Load Input Data</Label>
                           <input
                              type="file"
                              id="fileField"
                              name="file"
                              onChange={changeHandler}
                              accept=".csv"
                              style={{ display: "block" }}
                              className='w-75'
                           />

                          
                        </div>
                     </FormGroup>

                     <FormGroup className='d-flex justify-content-between'>
                        <div className='w-100 d-flex justify-content-between'>
                           <Label for="Select">Select Dependent Variable</Label>
                           <Input type="select" name="select" className='w-75' value={dependentVariable}
                              onClick={(e) => setDependentTimeVariable(e.target.value)} >

                              {options ? options?.map((item, id) => (
                                 <option key={id}
                                    value={item}>{item}</option>
                              )) : <option>Select Dependent Variable</option>
                              }

                           </Input>
                        </div>
                     </FormGroup>

                     <FormGroup className='d-flex justify-content-between'>
                        <div className='w-100 d-flex justify-content-between'>
                           <Label for="Select">Select Time Variable</Label>
                           <Input type="select" name="select" className='w-75' value={timeVariable}
                              onClick={(e) => setTimeVariable(e.target.value)}>
                              {options ? options?.map((item, id) => (
                                 <option key={id}
                                    value={item}>{item}</option>

                              )) : <option>Select Time Variablee</option>}
                           </Input>
                        </div>
                     </FormGroup>
                
                     <FormGroup className='d-flex justify-content-between'>
                        <div className='w-100 d-flex justify-content-between'>
                           <Label for="SelectMulti">Select Promotional Drivers</Label>
                           <Input type="select" name="selectMulti" id="SelectMulti" className='w-75' multiple
                              value={promotionalDrivers}
                              onChange={handlePromotonalDriver} >
                              {options ? options?.map((item, id) => (
                                 <option key={id}
                                    value={item}>{item}</option>

                              )) : <option>Select Promotional Drivers</option>}
                           </Input>
                        </div>
                     </FormGroup>
                 
                   
                     <FormGroup className='d-flex justify-content-between'>
                        <div className='w-100 d-flex justify-content-between'>
                           <Label for="SelectMulti">Select Non-Promotional Drivers</Label>
                           <Input type="select" name="selectMulti" id="SelectMulti" className='w-75' multiple
                              value={nonPromotionalDrivers}
                              onChange={handleNonPromotonalDriver}>

                              {options ? options?.map((item, id) => (
                                 <option key={id}
                                    value={item}>{item}</option>
                              )) : <option>Select Non-Promotional Drivers</option>}
                           </Input>
                        </div>
                     </FormGroup>

                     <FormGroup className='d-flex justify-content-between align-items-center m-auto' style={{ width: "300px" }}>
                        <Button onClick={generateModal} color="primary" className='btn-block py-2 m-auto'>Run Impactable Sales Model</Button>
                     </FormGroup>
                  </Form>


                
                  <Dialog
                     PaperProps={{
                        style: {
                           backgroundColor: 'transparent',
                           boxShadow: 'none',
                        },
                     }}
                     open={openLoding} onClose={(event, reason) => handleCloseLoadingBox(event, reason)} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                     {/* <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle> */}
                     <DialogContent>
                        <DialogContentText id="alert-dialog-description" className='d-flex justify-content-center align-items-center'>
                           <RotatingLines
                              strokeColor="white"
                              strokeWidth="5"
                              animationDuration="0.75"
                              width="96"
                              visible={true}
                           />
                        </DialogContentText>
                     </DialogContent>
                     <DialogActions>
                   
                     </DialogActions>
                  </Dialog>

               
                  <Dialog
                     PaperProps={{
                        style: {
                           backgroundColor: 'transparent',
                           boxShadow: 'none',
                        },
                     }}
                     open={openTimer} onClose={(event, reason) => handleCloseTimerBox(event, reason)} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                     <DialogContent>
                        <DialogContentText id="alert-dialog-description" className='d-flex justify-content-center align-items-center'>
                           <CountdownCircleTimer
                              isPlaying
                              duration={10} 
                              colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                              colorsTime={[7, 5, 2, 0]}
                              children
                           >
                           
                              {children}
                           </CountdownCircleTimer>
                        </DialogContentText>
                     </DialogContent>
                     <DialogActions>
                       
                     </DialogActions>
                  </Dialog>
               </RctCollapsibleCard>
            </div>
         </div>
      </div>
   );
}

