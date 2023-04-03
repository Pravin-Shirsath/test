import PageTitleBar from 'Components/PageTitleBar/PageTitleBar'
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard'
// import React,{useState} from 'react'
import { Helmet } from 'react-helmet'
import { useHistory } from 'react-router'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import IntlMessages from 'Util/IntlMessages'
import NavTitle from '../ReuseComponent/NavTitle'
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
import { CreateNewProject } from 'Api'
import AddIcon from '@mui/icons-material/Add';


const CreateProject = (props) => {
    const history = useHistory();

    const [projectName, setProjectName] = useState("")
    const [dataset, setDataset] = useState("")
    const [projectDes, setProjectDes] = useState("")

    const [image, setImage] = useState(null)
    const [open, setOpen] = useState(false)
    const [objImage, setObjImage] = useState(null)
    const selected = {}
    console.log("propsp", props)

    const NewProject = () => {


        const accessToken = JSON.parse(localStorage.getItem('token'))
     
        if (projectName != "" && dataset != "" && projectDes!="") {
          
           
            if (accessToken !== null) {
                // console.log(projectName,dataset,projectDes)
                // console.log("accessToken,fd)",accessToken,fd,objImage)
             
                CreateNewProject(accessToken,projectName,dataset,projectDes,objImage)
                    .then((res) => {
                        console.log('Response from create project  :', res)
                        if (res?.status === 200) {
                            let data = res?.data?.message
                            console.log(data)
                            if(typeof(data) == "string"){
                                 NotificationManager.error(data)

                            }else{

                                NotificationManager.success("Project created !")
                            }
                                                      
                        } else {

                            NotificationManager.error("Project create failed!")
                        }
                    })
                    .catch((err) => {
                       
                        console.log("err=create project",err)
                        NotificationManager.error("Project create failed!")
                        if (err?.response?.status === 406) {
                            if(err?.response?.data){
                               let data = err?.response?.data?.message
                              for (var key in data) {
                                if (data.hasOwnProperty(key)) {
                                  NotificationManager.error(`${key}:${data[key][0]}`);
                                    // console.log(key + " -> " + data[key]);
                                }
                            }
                              // err?.response?.data.forEach(item=>{
                    
                              //   NotificationManager.error(item);
                              // })
                            }
                          }
                    })
            }
        } else {
            NotificationManager.error("Project name, Dataset name , descrption is required !")
        }


    }


    const handleImageUpload = e => {
        const [file] = e.target.files;
        if (e.target.files.length) {
            var Obj = {
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0]
            };
            console.log("newimg", Obj.raw);
            if (Obj?.raw?.type?.includes("image")) {
                setImage(Obj.preview)

                // setProfileData({ ...profileData, profile_image: Obj.preview })
                setObjImage(Obj?.raw)
            } else {
                NotificationManager.error("Only image format file upload ");
            }
            // setProfilePic(Obj.raw);
        }
    };




    return (
        <div>
            <Helmet>
                <title> Create Project</title>
                <meta name="description" content="Create Project" />
            </Helmet>
            <div className="charts-widgets-wrapper">
                <div className=" d-flex align-items-cente">

                    <NavTitle props={props} />
                    <PageTitleBar title={<IntlMessages id="sidebar.createproject" />} match={props.match} />

                </div>

            </div>


            <div style={{ alignItems: "center", justifyContent: 'center', display: "flex", }}>
                <div className="user-profile-widget box-shadow-box" style={{ width: "50%", backgroundColor: "white" }}>
                    <div className="c-primary py-70"></div>
                    <div className="p-20">
                        <div className="d-flex user-avatar">
                            <div style={{ position: "relative" }}>
                                <Avatar
                                    alt="user 2"
                                    src={`${process.env.PUBLIC_URL}/assets/images/avatars/user-15.jpg`}
                                    className="size-100 rounded-circle mr-15 "
                                />
                                <div className=" rounded-circle bordered d-flex align-items-center justify-content-center" style={{ position: "absolute", bottom: "-7px", right: "17px", backgroundColor: "#464D69", width: '30px', height: "30px" }}>

                                    <i className="ti-pencil rounded-circle bordered text-white" > </i>
                                    <input type='file' className="rounded-circle bordered" style={{ position: "absolute", bottom: "0px", right: "0px", width: "30px", height: "30px", opacity: 0 }} />

                                </div>
                            </div>

                            <div className="user-info text-white pt-20">
                                <h2 className="mb-0">Create New Project</h2>

                            </div>
                        </div>
                        <div style={{ marginTop: "30px" }}>
                            <FormGroup row >
                                <Col sm={12} className="d-flex  align-items-center justify-content-center">
                                    <Label for="firstName" sm={3} className="d-flex ">
                                      
                                        <span>Project Name<span className="text-danger">*</span></span>
                                    </Label>
                                    <Input
                                        type="text"
                                        className="input-md"
                                        sm={10}
                                        value={projectName}
                                        onChange={(e) => setProjectName(e.target.value)}
                                    />
                                </Col>

                            </FormGroup>
                            <FormGroup row >


                                <Col sm={12} className="d-flex  align-items-center justify-content-center">
                                    <Label for="firstName" sm={3} className="d-flex primary-dark">
                                       
                                        <span> Dataset Name<span className="text-danger">*</span></span>
                                    </Label>
                                    <Input
                                        type="text"
                                        className="input-md"
                                        value={dataset}
                                        onChange={(e) => setDataset(e.target.value)}
                                        sm={10}
                                    />
                                </Col>

                            </FormGroup>
                            <FormGroup row >
                                <Col sm={12} className="d-flex  align-items-center justify-content-center">
                                    <Label for="firstName" sm={3} className="d-flex primary-dark">
                                       <span> Project description<span className="text-danger">*</span></span>
                                    </Label>
                                    <Input
                                        type="text"
                                        className="input-md"
                                        value={projectDes}
                                        onChange={(e) => setProjectDes(e.target.value)}
                                        sm={10}
                                    />
                                </Col>

                            </FormGroup>
                            <div className="d-flex align-items-center justify-content-center" style={{ marginTop: '30px', marginBottom: "30px" }}>
                                <Button variant="contained" color="primary" className="projectCardButton mx-2" onClick={NewProject}>Save</Button>
                                <Button variant="contained" color="primary" className="projectCardButton mx-2 d-flex justify-content-center align-item-center" onClick={()=> history.push("/app/dashboard/createDataset")}><AddIcon />Dataset</Button>
                            </div>

                            {/* <FormGroup row >
                                <Col sm={12} className="d-flex  align-items-center justify-content-center">
                                    <Label for="firstName" sm={3} className="d-flex primary-dark">
                                        File Browse
                                    </Label>
                                    <CustomInput type="file" id="exampleCustomFileBrowser" name="customFile" sm={10} />
                                </Col>
                            </FormGroup> */}
                            {/* <div className="d-flex align-items-center justify-content-center" style={{ marginTop: '30px', marginBottom: "30px" }}>
                                <Button variant="contained" color="primary" className="projectCardButton mx-2" >Upload</Button>
                            </div> */}

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CreateProject