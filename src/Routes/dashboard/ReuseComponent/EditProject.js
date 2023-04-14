import React, { useEffect, useState } from 'react'
import {
    Progress, Button,
    Form,
    FormGroup,
    Label,
    Input,
    FormText,
    Col,
    FormFeedback
} from 'reactstrap';
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import { Avatar } from '@material-ui/core';
import { BASE_URL } from 'Api/APIConst';
import { NotificationManager } from 'react-notifications'
import { EditProjectDetails } from 'Api';

const EditProject = ({ selected, Modalopen, close,reloadlist }) => {
    const [projectName, setProjectName] = useState("")
    const [projectDes, setProjectDes] = useState( "")
    const [image, setImage] = useState(null)
    const [open, setOpen] = useState(false)
    const [objImage, setObjImage] = useState(null)


    useEffect(() => {
        if(selected){
            setProjectName(selected?.project_name ||"" )
            setProjectDes(selected?.project_description || "")
        }
        //  setImage(item?.project_image)
        setOpen(Modalopen)

    }, [Modalopen])




    const handleImageUpload = e => {
        console.log(e.target.files , "handle image upload click krne pe files hai ya nahi")

        const [file] = e.target.files;
        if (e.target.files.length) {
            var Obj = {
                preview: URL.createObjectURL(e?.target?.files[0]),
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


    const SaveEditDetails = () => {
      
            const accessToken = JSON.parse(localStorage.getItem('token'))
            const fd = new FormData();
            if (projectName != "" || projectDes != "" || objImage != null) {
                if (projectName != "") {
                    fd.append('project_name', projectName)
                }
                if (projectDes != "") {
                  fd.append('project_description', projectDes)
                }
                if (objImage != null) {
                    fd.append('project_image', objImage)
                }
              
                if (accessToken !== null) {
                    EditProjectDetails(accessToken, fd, selected?.id)
                        .then((res) => {
                            if (res?.status === 200) {
                             if(reloadlist){
                                reloadlist()
                                setOpen(false)
                                 if(close){
                                    close()
                                    }
                                    NotificationManager.success(" Project update suceesfull !") 
                                    setImage(null)
                             }
                                console.log('Response from search  :', res)
                            } else {
                                // console.log('Response from customerlist:', res)
    
                                NotificationManager.error("Project details update failed!")
                                setImage(null)
                            }
                        })
                        .catch((err) => {
                            // console.log('Response from customerlist:', err)
                        })
                }
            } else {
                NotificationManager.error("All field is empty!")
            }
                  

    }


    console.log(selected, "Selectedddd in edit projectttt")
    console.log(objImage, "object imaggeee")
    return (
        <Dialog
            onClose={() => (close(false), setOpen(false))}
            open={open}

        >
            <DialogContent style={{ margin: 0, padding: 0 }}>
                <div className="user-profile-widget">
                    <div className="c-primary py-70"></div>
                    <div className="p-20">
                        <div className="d-flex user-avatar">
                            <div style={{ position: "relative" }}>
                                <Avatar
                                    alt="user 2"
                                    src={selected?.project_image == null ? 
                                            (image == null ? `${process.env.PUBLIC_URL}/assets/images/avatars/user-15.jpg` : image )
                                            : (image !== null ? image : `${selected.project_image}`)}
                                    className="size-100 rounded-circle mr-15 "
                                />
                                <div className=" rounded-circle bordered d-flex align-items-center justify-content-center" style={{ position: "absolute", bottom: "-7px", right: "17px", backgroundColor: "#464D69", width: '30px', height: "30px" }}>

                                    <i className="ti-pencil rounded-circle bordered text-white" > </i>
                                    <input type='file' onChange={handleImageUpload} className="rounded-circle bordered" style={{ position: "absolute", bottom: "0px", right: "0px", width: "30px", height: "30px", opacity: 0 }} />

                                </div>
                            </div>

                            <div className="user-info text-white pt-20">
                                <h2 className="mb-0">{selected?.project_name}</h2>
                                <span>{selected?.project_description}</span>
                            </div>
                        </div>
                        <div style={{ marginTop: "30px" }}>
                            <FormGroup row >
                                <Col sm={12} className="d-flex  align-items-center justify-content-center">
                                    <Label for="firstName" sm={3} className="d-flex ">
                                        Project Name :
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
                                        comment:
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
                            <div className="d-flex align-items-center justify-content-end" style={{ marginTop: '30px', marginBottom: "30px" }}>
                                <Button variant="contained" color="primary" className="projectCardButton mx-2" onClick={SaveEditDetails} >Change</Button>
                                <Button variant="contained" color="danger" className="projectCardButton mx-2" onClick={() => (close(false), setOpen(false, setImage(null)))}>Cancel</Button>
                            </div>
                        </div>

                    </div>
                </div>


            </DialogContent>
        </Dialog>
    )
}

export default EditProject
