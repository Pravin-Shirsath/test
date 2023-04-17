
// import { useState, useEffect } from 'react';
// import { Uppy } from '@uppy/core';
// import { DragDrop, StatusBar } from '@uppy/react';
// import Transloadit from '@uppy/transloadit';
// import Dashboard from '@uppy/dashboard';
// import XHR from '@uppy/xhr-upload';
// import '@uppy/core/dist/style.min.css';
// import '@uppy/drag-drop/dist/style.min.css';
// import '@uppy/status-bar/dist/style.min.css';



  
    
//     function createUppy(houseId, roomId) {
//         // Adding to global `meta` will add it to every file.
//         // Every Uppy instance needs a unique ID.
//         return  new Uppy()
//         .use(Dashboard, { inline: true, target: 'body' })
//         .use(XHR, { endpoint: 'https://your-domain.com/upload' });
     
//     }
    
//  export default function UppyModal(props) {
//         const { houseId, roomId } = props;
//         // important: passing a initializer function to prevent the state from recreating.
//         const [uppy] = useState(() => createUppy(houseId, roomId));
    
//         useEffect(() => {
//             if (houseId && roomId) {
//                 uppy.setOptions({ meta: { houseId, roomId } });
//             }
//         }, [uppy, houseId, roomId]);
    
//         return (
//             <>
//                 <DragDrop uppy={uppy} />
//                 <StatusBar uppy={uppy} />
//             </>
//         );
//     }







import React, { useEffect ,useState} from 'react';
import Uppy from '@uppy/core';
import Webcam from '@uppy/webcam';
import { Dashboard } from '@uppy/react';
import XHR from '@uppy/xhr-upload';
// Don't forget the CSS: core and the UI components + plugins you are using.
import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import '@uppy/webcam/dist/style.min.css';
import { BASE_URL } from 'Api/APIConst';
import { NotificationManager } from 'react-notifications';
import { DashboardModal } from '@uppy/react';
import CloseIcon from '@mui/icons-material/Close';
import eventBus from '../../Constants/eventBus';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    InputGroup,
    InputGroupAddon,
    FormGroup,
    Label
 } from 'reactstrap';
import { useHistory } from 'react-router';
// const accessToken = JSON.parse(localStorage.getItem('token'))



// Don’t forget to keep the Uppy instance outside of your component.

export default function UppyModal(props){
    const { houseId, roomId } = props;
    const [currentUppay,setCurrentUppay]= useState(JSON.parse(localStorage.getItem('datasetId')));
    const [uppyInstances, setUppyInstances] = useState({});
    const [open, setOpen] = useState(false)
    const [breadcrumbData,setBreadcrumbData]=useState([])
    const history = useHistory();
 // Dynamically generate an ID for a new Uppy instance
 const generateUppyId = () => {
    const DatasetId = JSON.parse(localStorage.getItem('datasetId'))
    return `uppy-${DatasetId}`;
  };




  

  useEffect(()=>{
  
    eventBus.on("UppyUpload", (res) => {
        // console.log('couponApply res=',res)
        console.log("hello ww")
        if (res.message) {
           
           const Latest = JSON.parse(localStorage.getItem('datasetId'));
           setCurrentUppay(Latest)
           const   BreadCrumb = res?.message?.BreadCrumb
           console.log(BreadCrumb,"BreadCrumb upp")
           setBreadcrumbData(BreadCrumb || [])
           addUppyInstance()
        
  
        }
      })
  
      return () => eventBus.remove("UppyUpload");

  },[])
  
  // Create a new Uppy instance and add it to the state
  const addUppyInstance = () => {
  const accessToken = JSON.parse(localStorage.getItem('token'))
  const DatasetId = JSON.parse(localStorage.getItem('datasetId'))
    // NotificationManager.success("hello")
    console.log("accessToken",DatasetId,accessToken)
    const uppyId = generateUppyId();
   
   
     if (uppyInstances.hasOwnProperty( `uppy-${DatasetId}`) ) {
        setOpen(true)
          }else{
                
    const uppyInstance = new Uppy({
        id: 'uppy',
        autoProceed: false,
        pauseResume: true,
        exposedHeaders: ["Access-Control-Allow-Headers"],
        hidePauseResumeButton:false
      });
    
      uppyInstance.use(XHR, {
        endpoint: `${BASE_URL}/api/automaton/file-uploads/uppy/xhr/upload/${DatasetId}/`,
        method: 'POST',
        resume: true,
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
      uppyInstance.on('file-added', (file) => {
        console.log('Added file', file);
      });
    
      uppyInstance.on('upload', (data) => {
        console.log('Started uploading');
    
      });
    
      uppyInstance.on('upload-success', (file, response) => {
        console.log('Upload successful');
      });
    
      uppyInstance.on('upload-error', (file, error, response) => {
        // Check if the error is an instance of Error or a string
        const errorMessage = error instanceof Error ? error.message : error;
        // alert(`Error uploading ${file.name}: ${response.body.message}`);
        // console.log(response)
        // console.log(error.getResponseError)
        // // Display the error message to the user
        // alert(`Error uploading ${file.name}: ${errorMessage}`);
      });
    
      setUppyInstances((prevState) => ({
        ...prevState,
        [uppyId]: uppyInstance,
      }));
            }

            setOpen(true)
   
  };


  console.log("uppyInstances==",uppyInstances)
// Cancel upload of a specific file
const cancelUpload = (uppyId, fileId) => {
    uppyInstances[uppyId].cancel(fileId);
  };
 const  ClosedModal = () => {
    setOpen(false)
  }

  const doneButtonHandler =(uppyId, fileId)=>{
  
const currentpath = { name: 'Create Dataset', url: '/app/dashboard/createDataset' }
const  breadcrumpath = [...breadcrumbData,currentpath]
   uppyInstances[uppyId].cancelAll();
//    uppyInstances[uppyId].resetProgress();
//    uppyInstances[uppyId].requestCloseModal();
    setOpen(false)
    history.push("/app/dashboard/viewDataset",{breadcrumbData:breadcrumpath})
  }

return  <> 


{
  Object.keys(uppyInstances).map((uppyId) => {
     if(uppyInstances.hasOwnProperty( `uppy-${currentUppay}`)){
        
        return (
  <div key={uppyId}>


       <Modal
        isOpen={open}
         size="lg"
        style={{maxWidth:'750px'}}
       aria-labelledby="contained-modal-title-vcenter"
         centered 
         onClosed={()=>setOpen(false)}
         CLO
          >
         <CloseIcon  onClick={ClosedModal}  style={{position:"absolute",top:-25,right:-25 ,color:"#ffff"}}/>
         <ModalBody>
         
         <Dashboard 
           uppy={ uppyInstances[uppyId]} 
           doneButtonHandler={(file)=>doneButtonHandler(uppyId)}
           closeModalOnClickOutside={true}
           isModalOpen={open}
           style={{
         margin:'0px'
  }}
           proudlyDisplayPoweredByUppy={false}
           showPauseResume={true}
           onCancel={(file) => {
              console.log(`Upload of ${file.name} cancelled`);
              cancelUpload(uppyId, file.id);
            }}

             />
             </ModalBody>
         </Modal>

  </div>
)
     }else{
        return <></>
     }

})
}
    </>
}