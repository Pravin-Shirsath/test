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
        title={<IntlMessages id="sidebar.createTask" />}
        match={props.match}
      />

      <RctCollapsibleCard fullBlock>
            <div style={{padding:"80px", alignItems: "center", justifyContent: 'center', display: "flex", }}>
                
            </div>
        {loading && <RctSectionLoader />}
      </RctCollapsibleCard>
    </>
  );
};

export default CreateDataset;
