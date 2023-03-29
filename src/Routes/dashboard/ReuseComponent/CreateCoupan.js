import React, { useEffect, useState } from 'react'

import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import { Avatar } from '@material-ui/core';
import { BASE_URL } from 'Api/APIConst';
import { NotificationManager } from 'react-notifications'
import { CreateNewCoupan, EditProjectDetails } from 'Api';

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
const CreateCoupan = ({ selected, Modalopen, close, reloadlist }) => {

    const [open, setOpen] = useState(false)
  const [amount,setAmount]  =useState("")
  const [amtRadio,setAmtRadio]  =useState(false)
  const [percentage,setPercentage]  =useState("")
  const [perRadio,setPerRadio]  =useState(false)
  const [coupan,setCoupan]  =useState("")
     
 
     
//    const copyToClipboard = (content) => {

//     const el = document.createElement('textarea');
    
//     el.value = content;
    
//     document.body.appendChild(el);
    
//     el.select();
    
//     document.execCommand('copy');
    
//     document.body.removeChild(el);
    
//     }; 


    useEffect(() => {

        //  setImage(item?.project_image)
        setOpen(Modalopen)

    }, [Modalopen])


  const ApiCall =(coupanCode,value,type,des)=>{

    const accessToken = JSON.parse(localStorage.getItem('token'))
   
   
        if (accessToken !== null) {
            CreateNewCoupan(accessToken,coupanCode,value,type,des )
                .then((res) => {
                    console.log('Response from customerlist:', res)
                
                    if (res?.status === 200) {

                        if(res?.data?.message){
                            if(reloadlist){
                                reloadlist()
                              reloadlist()
                              setOpen(false)
                               if(close){
                                  close()
                                  }
      
                          }
                         NotificationManager.success(res?.data?.message)

                     }
                     if(res?.data?.coupon_text ){
                        NotificationManager.error(res?.data?.coupon_text )

                    }

                    
                    }else {
                        // console.log('Response from customerlist:', res)

                        // NotificationManager.error("Project details update failed!")
                    }
                })
                .catch((err) => {
                    // console.log('Response from customerlist:', err)
                })
        }
   
  }





   const  CreateCoupanApi =()=>{
 if(coupan != ""){
if(amtRadio === true && perRadio === false){
    if(amount != ""){
        ApiCall(coupan,amount,"amount",`Cupon for ${50} rupees off`)
    }else{
        NotificationManager.error("amount empty!")
    }
}else if( perRadio === true && amtRadio === false){
    if(percentage != ""){
        ApiCall(coupan,percentage,"percentage",`Cupon for ${50} percentage off`)
    }else{
        NotificationManager.error("percentage empty!")
    }
}else if(perRadio === false && amtRadio === false){
    NotificationManager.error("Discount empty!")
}


 }else{
    NotificationManager.error("Coupan code empty!")

 }
   }


    return (
        <Dialog
            onClose={() => (close(false), setOpen(false))}
            open={open}
            
           
        >
            <DialogContent style={{paddingVertical:"30%",paddingBottom:"20px",margin:'20px'}}>
                <div className="d-flex align-item-center d-coupan-box ">
                    <p className="dark-primary-text d-coupan-heading ">Discount Coupon</p>
                </div>
                <section>
                    <FormGroup row >
                        <Col sm={12} className="d-flex  align-items-center justify-content-center">
                            <Label for="firstName" sm={3} className="d-flex dark-primary-text">
                                Coupon Code
                            </Label>
                            <Input
                                type="text"
                                className="input-md"
                                sm={9}
                            value={coupan}
                            onChange={(e) => setCoupan(e.target.value)}
                            />
                            <Label sm={1} className="d-flex ">
                                <i className="zmdi zmdi-copy "></i>
                            </Label>
                        </Col>

                    </FormGroup>
                    <FormGroup row className="align-items-center ">
                        <Col sm={12} className="d-flex  align-items-center ">
                            <Label for="firstName" sm={3} className="d-flex align-items-center  dark-primary-text">
                            Discount
                            </Label>
                            <div className=" d-flex align-items-center justify-content-center " style={{marginTop:"20px"}}>


                        <FormGroup tag="fieldset" className="d-flex mt-2" >
                        
                            <FormGroup check className="d-flex  ">
                                <Input type="radio" name="radio1" style={{ width: "20px", height: "20px" , marginTop:"6px"}} value={perRadio} onChange={(e) => (setPerRadio(e.target.checked),setAmtRadio(false))} />
                                <Label check className="mx-20  d-flex">
                                <Input type="number" name="" style={{ width: "97px", height: "34px",border:"1px solid black"  }} value={percentage} disabled={!perRadio}  onChange={(e) => setPercentage(e.target.value)} />   
                              <span className='mx-2 align-items-center justify-content-center' style={{fontSize:'23px'}}>%</span>  </Label>
                            </FormGroup>
                         <p className="mx-25 mt-1 dark-primary-text">
                             OR
                         </p>
                            <FormGroup check className="d-flex   ">
                                <Input type="radio" name="radio1" style={{ width: "20px", height: "20px", marginTop:"6px"}} value={amtRadio}  onChange={(e) => (setAmtRadio(e.target.checked),setPerRadio(false))}  />
                                <Label check className="mx-20 d-flex">
                                <Input type="number" name="" style={{ width: "97px", height: "34px",border:"1px solid black" }} value={amount} onChange={(e) => setAmount(e.target.value)} disabled={!amtRadio}/>   
                               <span className="mx-2 align-items-center justify-content-center"  style={{fontSize:'23px'}}> ₹ </span>  
                                </Label>
                            </FormGroup>
                        </FormGroup>
                    </div>
                          
                        </Col>

                    </FormGroup>
                   <div className="d-flex align-items-end justify-content-end ">
                               <Button variant="contained"  size="medium" color="primary" className="projectCardButton mx-2" onClick={CreateCoupanApi} >Save</Button>
                                <Button variant="contained"  size="medium" color="danger" className="projectCardButton mx-2" onClick={() => (close(false), setOpen(false))}>Cancel</Button>
                   </div>
                </section>
            </DialogContent>
        </Dialog>
    )
}

export default CreateCoupan
