import "./createDataset.css"

// import React, { useEffect, useState, useRef } from "react";
// import { Helmet } from "react-helmet";
// // page title bar
// import PageTitleBar from "../../../Components/PageTitleBar/PageTitleBar";
// // intl messages
// import IntlMessages from "../../../Util/IntlMessages";
// // rct card box
// import RctCollapsibleCard from "../../../Components/RctCollapsibleCard/RctCollapsibleCard";

// rct section loader
import RctSectionLoader from "../../../Components/RctSectionLoader/RctSectionLoader";
import UploadIcon from '@mui/icons-material/Upload';
// import { Button } from "reactstrap";

import PageTitleBar from 'Components/PageTitleBar/PageTitleBar'
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard'
// import React,{useState} from 'react'
import { Helmet } from 'react-helmet'
import { useHistory } from 'react-router'
import IntlMessages from 'Util/IntlMessages'
import React, { useEffect, useState } from 'react'
import {
  Progress, Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Col,
  FormFeedback, CustomInput
} from 'reactstrap';
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import { Avatar } from '@material-ui/core';
import { BASE_URL } from 'Api/APIConst';
import { NotificationManager } from 'react-notifications'
import { createDataset } from 'Api'
import AddIcon from '@mui/icons-material/Add';



import Uppy from "@uppy/core";
import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import '@uppy/webcam/dist/style.min.css';
import { DragDrop, StatusBar, Dashboard } from '@uppy/react';
import Tus from '@uppy/tus'
import XHR from '@uppy/xhr-upload';
import AwsS3Multipart from '@uppy/aws-s3-multipart';
const { DashboardModal } = require("@uppy/react");
// Don’t forget to keep the Uppy instance outside of your component.
// const uppy = new Uppy()
// // .use(RemoteSources, { companionUrl: 'https://companion.uppy.io' })
// // .use(Webcam, { target: Dashboard })
// // .use(ImageEditor, { target: Dashboard })
// .use(Tus, { endpoint: 'https://tusd.tusdemo.net/files/' })
// .on('complete', (result) => {
//   console.log('Upload result:', result)
// });

;




const CreateDataset = (props) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [datasetName, setDatasetName] = useState("");
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState()
  const [instance, setInstance] = useState()
  const [disabled, setDisabled] = useState(true)
  const handleDatasetName = (e) => {
    setDatasetName(e.target.value)
  }

  const handleComment = (e) => {
    setComment(e.target.value)
  }

  const handleSave = () => {
    const authToken = JSON.parse(localStorage.getItem("token"));
    const projectId = localStorage.getItem("projId");

    if (authToken !== null) {
      if (projectId) {
        if (datasetName) {
          console.log(authToken, typeof authToken, "autthhh token")
          createDataset(authToken, projectId, datasetName)
            .then(res => {



              console.log(res, "resss in handle save function")
              console.log(res?.data, "ress dataaa i n handle save function")

              if (res?.status == 200) {

                if (typeof (res?.data?.message) == "string") {
                  NotificationManager.error(res?.data?.message)
                } else if (res?.data?.message?.Dataset_created) {
                  localStorage.setItem("projId", res?.data?.message?.Dataset_created?.project_id)
                  localStorage.setItem("datasetid", res?.data?.message?.Dataset_created?.id)
                  setDisabled(false)
                  NotificationManager.success("Dataset created !")

                } else {
                  NotificationManager.error("Dataset create process failed!")
                }



              } else {

                NotificationManager.error("Dataset create process failed!")
              }
            }).catch((error) => {
              console.log("Dataset create error", error)
            })
        }
      }
    }
  }

  console.log(datasetName, "Dataset name")
  console.log(comment, "Commmenttt")


  // S3 BUCCEKET  





  // const UploadFile = async () => {
  //   const accessToken = JSON.parse(localStorage.getItem('token'))
  //   const projectId = JSON.parse(localStorage.getItem('projId'))

  //   if (open === undefined) {

  //     const uppy3 = new Uppy({
  //       // id : res,e
  //       // id: projectId,
  //       autoProceed: false,
  //       debug: true,
        
  //       allowMultipleUploads: true,
  //       methods: ["OPTIONS", "GET", "POST", "PATCH", "PUT"],
  //       exposedHeaders: ["Access-Control-Allow-Headers"],
  //       allowedHeaders: [
  //         "uppy-auth-token",
  //         "Content-Type",
  //         "Authorization",
  //         "Uppy-Versions",
  //         "Accept",
  //         "dataset_id",
  //         "id",
  //       ],
  //     }).use(AwsS3Multipart, {
  //       getChunkSize: () => 5 * 1024 * 1024, // 5MB
  //       getUploadId: (file) => `${file.id}-${Date.now()}`,
  //       partSize: 5 * 1024 * 1024, // 5MB
  //       retryDelays: [0, 1000, 3000, 5000], // Milliseconds between retries
  //       companionHeaders: {
  //         "uppy-auth-token":
  //           accessToken +
  //           "@@" + 252,

  //         // this.state.proj_id,
  //       },
       
  //       companionUrl:

  //         "https://api-automaton.progfeel.co.in/api/automaton/file-uploads/upload-project-video/",

  //     })
  //     uppy3 .on('file-added', (file) => {
  //       console.log('Added file', file);

  //       // uppy3.setFileMeta("images",file );
  //       // uppy3.setFileState(file.id, { fieldName: 'images' });

  //     })
  //     uppy3.on('complete', (result) => {
  //       console.log('Upload result:', result)
  //     })
        
  //     uppy3.on("upload-success", (file, response) => {
  //         console.log("upload-success");
         
  //       })
  //       uppy3.on('upload-error', (file, error, response) => {
  //         console.log("error===", file, error, response)
  //         if (error.isNetworkError) {
  //           // Let your users know that file upload could have failed
  //           // due to firewall or ISP issues
  //           console.log("error===", error)
  //         }
  //       })

  //     setInstance(uppy3);
  //     setOpen(true)
  //   } else {
  //     setOpen(true)
  //   }
  // }

  const UploadFile = async () => {
    const accessToken = JSON.parse(localStorage.getItem('token'))
    const DatasetId = JSON.parse(localStorage.getItem('datasetid'))

    try {
 
      if (open === undefined) {


        const uppy3 = new Uppy({
          id: 'uppy',
          autoProceed: false,
          exposedHeaders: ["Access-Control-Allow-Headers"],
          hidePauseResumeButton:false
        });

          uppy3.use(XHR, {
          endpoint: `${BASE_URL}/api/automaton/file-uploads/uppy/xhr/upload/${DatasetId}/`,
          method: 'POST',
          
          fieldName: 'files',
         
          headers: {
            'X-My-Custom-Header': 'header-value',
            Authorization: accessToken,
          //  "Content-Type": "multipart/form-data"
          "Acess-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS, GET, POST, PATCH, PUT",
          "Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept, Authorization, Extra-Data",
          
          },
        });

        // Listen for events
        uppy3.on('file-added', (file) => {
          console.log('Added file', file);
        });

        uppy3.on('upload', (data) => {
          console.log('Started uploading');
 
        });

        uppy3.on('upload-success', (file, response) => {
          console.log('Upload successful');
        });

        uppy3.on('upload-error', (file, error, response) => {
          console.log('Upload failed', error);
        });










  //       const uppy3 = await new Uppy({
  //         id: "uppy3",
  //         autoProceed: false,
  //         debug: true,
  //         restrictions: {
  //           allowedFileTypes: ['image/*'],

  //         },

  //         methods: ["OPTIONS", "GET", "POST", "PATCH", "PUT"],
  //         exposedHeaders: ["Access-Control-Allow-Headers"],


  //       })
  //         .use(XHR, {
  //           endpoint: `https://httpbin.org/post`,
  //           method: 'POST',
  //           formData: true,
  //           fieldName: 'file',

  //           headers: {
  //             Authorization: accessToken,
  //             "Content-Type": "multipart/form-data"

  //           },
  //           formData: (file, formData) => {
  //              console.log(file,"sfsdafsdfasdfasdfsd")
  //               return {
  //                 file:file
  //               }
  //             }

  //         })
  //         .on('before-send', (request) => {
  //           console.log('Payload:', request);

  //         }).on('file-added', (file) => {
  //           console.log('Added file', file);

  //           // uppy3.setFileMeta("images",file );
  //           // uppy3.setFileState(file.id, { fieldName: 'images' });

  //         }).on('complete', (result) => {
  //           console.log('Upload result:', result)
  //         })
  //         .on("upload-success", (file, response) => {
  //           console.log("upload-success");

  //         }).on('upload-error', (file, error, response) => {
  //           console.log("error===", file, error, response)
  //           if (error.isNetworkError) {
  //             // Let your users know that file upload could have failed
  //             // due to firewall or ISP issues
  //             console.log("error===", error)
  //           }
  //         })





  //       // formData: (file, formData) => {
  //       //   formData.append('file', file.data);
  //       //   return formData;
  //       // }


  //       // uppy3.on('upload', (data) => {

  //       //   const allFiles = uppy3.getFiles()
  //       //   console.log(allFiles)




  //         // const fileIDs = Object.keys(files)

  //         // const formData = new FormData()

  //         // const promises =  allFiles.map((fileID)=>{


  //         //   formData.append('file',fileID)



  //       //   const promises = allFiles.map(fileID => {
  //       //     const file = allFiles[fileID.id]

  //       //     console.log(file,">>>>file")

  //       //     const formData = new FormData()
  //       //     formData.append('file', file)
  //       //     return fetch(`${BASE_URL}/api/automaton/file-uploads/upload/${143}/`, {
  //       //       method: 'POST',
  //       //       headers: {
  //       //             Authorization: accessToken,
  //       //             "Content-Type": "multipart/form-data",

  //       //           },
  //       //       body: formData
  //       //     })
  //       //       .then((response) => {

  //       //         if (response.ok) {
  //       //           return response.json()
  //       //         } else {
  //       //           console.log("failed to upload")

  //       //           // throw new Error('Failed to upload file')
  //       //         }
  //       //       })
  //       //   })
  //       //   Promise.all(promises)
  //       //     .then((results) => {
  //       //       console.log('Upload complete:', results)
  //       //     })
  //       //     .catch((error) => {
  //       //       console.error('Upload failed:', error)
  //       //     })
  //       // })


  //       uppy3.on('before-send', (request) => {

  //         console.log('Payload:', request.data);
  //       });

        setInstance(uppy3);
        setOpen(true)
      } else {
        setOpen(true)
      }
    } catch (error) {
      console.log("catch ", error)
    }




  }











  console.log(open, "open")


  return (
    <>
      <Helmet>
        <title>Automaton | Create Dataset</title>
        <meta name="description" content="Automaton Widgets" />
      </Helmet>
      <PageTitleBar
        title={<IntlMessages id="sidebar.createDataset" />}
        match={props.match}
      />
      {
        instance != undefined &&
        <DashboardModal
          uppy={instance}
          open={open}
          target={document.body}
          onRequestClose={() => setOpen(false)}
          hideCancelButton={true}
          hidePauseResumeButton={true}
          showPauseResume={true}
          proudlyDisplayPoweredByUppy={false}
        />

      }
      <RctCollapsibleCard fullBlock>
        <div style={{ padding: "80px", alignItems: "center", justifyContent: 'center', display: "flex", }}>
          <div className="user-profile-widget box-shadow-box" style={{ width: "60%", backgroundColor: "white" }}>
            <div className="p-20">
              <div style={{ marginTop: "30px" }}>
                <FormGroup row >
                  <Col sm={12} className="d-flex  align-items-center justify-content-center">
                    <Label for="firstName" sm={3} className="d-flex ">

                      <span>Dataset Name<span className="text-danger madatory-field">*</span></span>
                    </Label>
                    <Input
                      type="text"
                      className="input-md"
                      sm={10}
                      onChange={handleDatasetName}
                      value={datasetName}
                    />
                  </Col>

                </FormGroup>
                <FormGroup row >


                  <Col sm={12} className="d-flex  align-items-center justify-content-center">
                    <Label for="firstName" sm={3} className="d-flex primary-dark">

                      <span> Comment</span>
                    </Label>
                    <Input
                      type="text"
                      // className="input-lg"
                      style={{ height: "100px" }}
                      value={comment}
                      onChange={handleComment}
                      sm={10}
                    />
                  </Col>

                </FormGroup>
                <div className="d-flex align-items-center justify-content-end" style={{ marginTop: '30px', marginBottom: "30px" }}>
                  <Button variant="contained" color="primary" style={{ width: "100px", padding: "7px 5px" }} className="projectCardButton mx-2" onClick={handleSave}>Save</Button>
                  <Button variant="contained" color="danger" style={{ width: "100px", padding: "7px 5px" }} className="mx-2 d-flex justify-content-center align-items-center" onClick={() => history.push("/app/dashboard/project")}>Cancel</Button>
                  <Button variant="contained" color="primary" style={{ width: "100px", padding: "7px 5px" }} disabled={disabled} className="mx-2 d-flex justify-content-center align-items-center" onClick={() => UploadFile()}><UploadIcon />Upload</Button>

                </div>
              </div>
            </div>
          </div>
        </div>

        {loading && <RctSectionLoader />}
      </RctCollapsibleCard>
    </>
  );
};

export default CreateDataset;
