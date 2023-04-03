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

const CreateDataset = (props) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [datasetName, setDatasetName] = useState("");
  const [comment, setComment] = useState("");

  const handleDatasetName = (e) => {
    setDatasetName(e.target.value)
  }

  const handleComment = (e) => {
    setComment(e.target.value)
  }

  const handleSave = () => {
    const authToken = JSON.parse(localStorage.getItem("token"));
    const projectId = localStorage.getItem("projId");

    if(authToken !== null){
      if(projectId){
        if(datasetName){
          console.log(authToken, typeof authToken, "autthhh token")
          createDataset(authToken, projectId, datasetName)
          .then(res => {
            console.log(res, "resss in handle save function")
            console.log(res?.data, "ress dataaa i n handle save function")

            if(res.status == "200"){
              // NotificationManager.success("dataset created !")
              setDatasetName("")
              setComment("");
            }
          })
        }
      }
    }
  }

  console.log(datasetName, "Dataset name")
  console.log(comment, "Commmenttt")

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

      <RctCollapsibleCard fullBlock>
      <div style={{padding:"80px", alignItems: "center", justifyContent: 'center', display: "flex", }}>
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
                                       
                                        <span> Comment<span className="text-danger madatory-field">*</span></span>
                                    </Label>
                                    <Input
                                        type="text"
                                        // className="input-lg"
                                        style={{height:"100px"}}
                                        value={comment}
                                        onChange= {handleComment}
                                        sm={10}
                                    />
                                </Col>

                            </FormGroup>
                            <div className="d-flex align-items-center justify-content-center" style={{ marginTop: '30px', marginBottom: "30px" }}>
                                <Button variant="contained" color="primary" style={{width:"100px", padding:"7px 5px"}} className="projectCardButton mx-2" onClick={handleSave}>Save</Button>
                                <Button variant="contained" color="primary" style={{width:"100px", padding:"7px 5px"}}  className="mx-2 d-flex justify-content-center align-items-center"><AddIcon/>Upload</Button>
                                <Button variant="contained" color="danger" style={{width:"100px", padding:"7px 5px"}}  className="mx-2 d-flex justify-content-center align-items-center" onClick={()=> history.push("/app/dashboard/project")}>Cancel</Button>
                                
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
