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
import { EditProjectDetails, UpadatDataset } from 'Api';

const EditDataset = ({ selected, Modalopen, close,reloadlist }) => {
    const [datasetName, setDatasetName] = useState("")
    const [comment, setComment] = useState("")
    
    const [open, setOpen] = useState(false)
    


    useEffect(() => {
       
        //  setImage(item?.project_image)
        setOpen(Modalopen)

    }, [Modalopen])




   
    const SaveEditDetails = () => {
      
            const accessToken = JSON.parse(localStorage.getItem('token'))
           if(datasetName != "" || comment != ""){

               if (accessToken !== null) {
                   UpadatDataset(accessToken,selected?.id,datasetName,comment)
                       .then((res) => {
                           if (res?.status === 200) {
                            if(reloadlist){
                               reloadlist()
                               setOpen(false)
                               setDatasetName("")
                               setComment("")
                              
                                if(close){
                                   close()
                                   }
                                   NotificationManager.success(" Datset update suceesfull !") 
                            }
                               console.log('Response from update dataset  :', res)
                           } else {
                               // console.log('Response from customerlist:', res)
   
                               NotificationManager.error("Dataset details update failed!")
                           }
                       })
                       .catch((err) => {
                           console.log('Response from Upadat datasett:', err)
                       })
               }
           }else{
            NotificationManager.error("All field is empty")
           }
           
                  

    }


    return (
        <Dialog
            onClose={() => (close(false), setOpen(false))}
            open={open}

        >
            <DialogContent style={{ margin: 0, padding: 0 }}>
                <div className="user-profile-widget">
                
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
                                        onChange={(e)=>setDatasetName(e.target.value)}
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
                                        style={{height:"100px"}}
                                        value={comment}
                                        onChange= {(e)=>{setComment(e.target.value)}}
                                        sm={10}
                                    />
                                </Col>

                            </FormGroup>
                            <div className="d-flex align-items-center justify-content-end" style={{ marginTop: '30px', marginBottom: "30px" }}>
                                <Button variant="contained" color="primary"  className="mx-2 d-flex justify-content-center align-items-center px-3" onClick={SaveEditDetails}>Save</Button>
                                <Button variant="contained" color="danger"   className="mx-2 d-flex justify-content-center align-items-center"  onClick={() => (close(false), setOpen(false))}>Cancel</Button>
                               
                                
                            </div>
                        </div>

                    </div>
                </div>


            </DialogContent>
        </Dialog>
    )
}

export default EditDataset
