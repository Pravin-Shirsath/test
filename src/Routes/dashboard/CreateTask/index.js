

/**
 * User Management Page
 */
import React, { useEffect, useState, useRef } from 'react'
import { Helmet } from 'react-helmet'
import Button from '@material-ui/core/Button'

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Form,
  FormGroup,
  Label,
  Col
} from 'reactstrap'
import Pagination from "react-js-pagination";

import { useHistory } from 'react-router-dom';
import { NotificationManager } from 'react-notifications'
// delete confirmation dialog
import DeleteConfirmationDialog from 'Components/DeleteConfirmationDialog/DeleteConfirmationDialog'
// update user form
//  import UpdateUserForm from './UpdateUserForm'
// page title bar
import PageTitleBar from '../../../Components/PageTitleBar/PageTitleBar'
// intl messages
import IntlMessages from '../../../Util/IntlMessages'
// rct card box
import RctCollapsibleCard from '../../../Components/RctCollapsibleCard/RctCollapsibleCard'
// rct section loader
import RctSectionLoader from '../../../Components/RctSectionLoader/RctSectionLoader'
import '../../../Assets/css/user.css'
import {
  DeleteDataset,
  getViewProjectDatasets,
  ViewFiles
} from '../../../Api/'

import FolderIcon from '@mui/icons-material/Folder';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ImageIcon from '@mui/icons-material/Image';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';
import CheckIcon from '@mui/icons-material/Check';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CloseIcon from '@mui/icons-material/Close';
import EditDataset from '../ReuseComponent/EditDataset';
import CustomBreadcrumbs from "../ReuseComponent/CustomBreadcrumbs";
import TextField from '@mui/material/TextField';

import MenuItem from '@mui/material/MenuItem';
export default function ViewDataset(props) {
  const history = useHistory();
  const {location}=props
  //  const [users, setUsers] = useState() // use when data is coming from api
//   const [users, setUsers] = useState([])
  //  const [filteredUsers, setFilteredUsers] = useState() // use when the data is coming fom api
//   const [filteredUsers, setFilteredUsers] = useState([])
  const [searchText, setSearchText] = useState('');
  

  const [username, setUsername] = useState("")
//   const [email, setEmail] = useState("")
 
//   const [selectedUser, setSelectedUser] = useState(null)
  const [loading, setLoading] = useState(false)
//   const [addNewUserModal, setAddNewUserModal] = useState(false)
//   const [updateNewUserModal, setupdateNewUserModal] = useState(false)
//   const [deleteUserModal, setdeleteUserModal] = useState(false)

  const deleteConfirmationDialog = useRef()
  const [selected, setSelectedItem] = useState({})

//   const [editUser, setEditUser] = useState(null)
//   const [selectedUsers, setSelectedUsers] = useState(0)
//   const [viewDetails, setViewDetails] = useState()
const [openEditDataset,setOpenEditDataset] = useState(false)

  const [datasets, setDatasets] = useState([]);
  const [activePage, setActivePage] = useState(1)
  const [totalPageCount, setTotalPageCount] = useState('');
  const [taskFile, setTaskFile] = useState([]);
  const [filteredTaskFiles, setFilteredTaskFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [modalOpen,setModalOpen]=useState(false);
  useEffect(() => {
    const isLoggedInBool = localStorage.getItem("isLoggedIn")
    // conditional rendring
    // if(isLoggedInBool !== "true"){
    //   history.push("/login")
    //     localStorage.clear();
    // } else {
    // getCustomersListData();
    getTaskFile()
    // }
  }, [])

//   const getViewProjectData = () => {
//     const authToken = JSON?.parse(localStorage.getItem("token"));
//     const projectId = localStorage?.getItem("projId")

//     if(authToken !== null){
//       getViewProjectDatasets(authToken, projectId, activePage)
//       .then(res => {
//         if(res?.status == 200){
//           console.log(res?.data?.results, "project's all lists")
//           setDatasets(res?.data?.results)
//           setFilteredDatasets(res?.data?.results);

//           console.log(res?.data?.count, "total counts of datasets of projects")
//           setTotalPageCount(parseInt(res?.data?.count));
//         } else {
//           console.log('Response from View project Datasets lists api:', res)
//         }
//       }).catch((error)=>{
//         console.log("error=",error)
//       })
//     }
//   }

const getTaskFile = () => {
          let files = location?.state.files
  
                setTaskFile(files?.data || [])
                setFilteredTaskFiles(files?.data || [])
                setTotalPageCount(parseInt(files?.count || 1));
        
}

  const handlePageChange = (pageNumber) => {
    console.log("pagination", pageNumber)
    
    
    if (activePage !== pageNumber) {
           
          // file filter
           
              // setTaskFile(res?.data?.results);
              // setFilteredTaskFiles(res?.data?.results);
              // setTotalPageCount(res?.data?.count);
            
         
      setActivePage(pageNumber)
    }
  }

  const handleFileSelect = (file) => {
    console.log(file, "selecteddd filee");

    const clone =[...taskFile] 
     const filterarray = taskFile.filter((item)=>{
       return item.id !== file.id
     })

    setFilteredTaskFiles(filterarray)
    setTaskFile(filterarray)
   




    
  }
   





  const NewTaskNavigate = ()=>{
    
    setModalOpen(true)
    //  if(selectedFiles.length > 0){
    //   const  breadcrumbData =location?.state?.breadcrumbData || []
    //          breadcrumbData.push( { name: 'View Dataset', url: '/app/dashboard/viewDataset' });
    //          history.push("/app/dashboard/createTask",{breadcrumbData:breadcrumbData});

    //          console.log()
    //  }else{
    //   NotificationManager.error("you don't have selected file  ");

    //  }



  }

  const currencies = [
    {
      value: 'USD',
      label: '',
    },
    {
      value: 'EUR',
      label: 'select',
    },
    {
      value: 'BTC',
      label: 'select',
    },
    {
      value: 'JPY',
      label: 'ffg',
    },
  ];



 const  Submit =()=>{

 }
  return (
    <div className="user-management">
      <Helmet>
        <title>Automaton | Customers List</title>
        <meta name="description" content="Automaton Widgets" />
      </Helmet>
      {/* <PageTitleBar
        title={<IntlMessages id="sidebar.viewDataset" />}
        match={props.match}
      /> */}
     <CustomBreadcrumbs    currentPage={"View Dataset"} data={location?.state?.breadcrumbData}  />

                <DeleteConfirmationDialog title="Are You Sure Want To Delete?"
             message="This will delete your Dataset permanently."
            //  onConfirm={() => Delete_Datset()}
             ref={deleteConfirmationDialog} />
      <RctCollapsibleCard fullBlock>
     
        <div className="table-responsive">
            <div className="d-flex py-20 px-10 border-bottom" style={{ justifyContent: 'space-between' }}>
            <div className='search-row'>
                <input type="text" placeholder='Search' className='search-input py-2' style={{ border: "none", borderBottom: "1px solid black" }} value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                <Button variant="contained" color="primary" className="text-white mx-5" style={{ cursor: "pointer" }} 
                // onClick={getSearchedCustomerData}
                >Search</Button>
            </div>

            
            </div>

            <div className='viewDatasetFilesContainer'>
                {
                    filteredTaskFiles && filteredTaskFiles.map((file,ind)=> {
                      console.log(file)
                        return(
                                // <div className="mainBox" key={ind} onClick={()=>handleFileSelect(file)}>
                                <div className="mainBox" key={ind}>
                                  <div className="imageContainer">
                                    {/* {
                                      file.selectedFile ? <CheckBoxIcon className="folderIcon" /> : (file.file_type == "pdf" ? <PictureAsPdfIcon className="folderIcon" /> : (file.file_type == "jpg" || file.file_type == "jpeg" || file.file_type == "png" ? <ImageIcon className="folderIcon" /> : (file.file_type == "xlsx" ? <DescriptionIcon className="folderIcon" /> : <FolderIcon className="folderIcon" />)))
                                    } */}

                                    {
                                      file.file_type == "pdf" ? <a href={file?.file} target="_blank"><PictureAsPdfIcon className="folderIcon" /></a> : (file.file_type == "jpg" || file.file_type == "jpeg" || file.file_type == "png" ? <a href={file?.file} target="_blank"><ImageIcon className="folderIcon" /></a> : (file.file_type == "xlsx" ? <a href={file?.file} target="_blank"><DescriptionIcon className="folderIcon" /></a> : <a href={file?.file} target="_blank"><InsertDriveFileIcon className="folderIcon" /></a>))
                                    }

                                  </div>
                                  <div className="nameContainer">
                                    <p>{file.file_name}</p>
                                  </div>

                                 <div className="checkDiv" onClick={()=>handleFileSelect(file)}>{
                                  <CloseIcon/>
                                  }</div>
                                  
                                </div>
                        )
                    })
                }
            </div>
           
            {filteredTaskFiles.length == 0 && <center style={{ color: "black" }}>Data not available </center>}
          {
            taskFile?.length > 0 &&
            <div className='paginationDiv'> 
              <Pagination
                activePage={activePage}
                itemsCountPerPage={6}
                pageRangeDisplayed={5}
                onChange={(e) => handlePageChange(e)}
                itemClass="page-item"
                linkClass="page-link"
                hideFirstLastPages={true}
                totalItemsCount={totalPageCount}
              />
            </div>
          }
        </div>
       <div className="d-flex align-items-center justify-content-center"> <Button variant="contained" color="primary" className="text-white mx-5" style={{ cursor: "pointer" }} 
             onClick={NewTaskNavigate}>Proceed</Button></div>
        {loading && <RctSectionLoader />}
      </RctCollapsibleCard>

       

        <Modal
        isOpen={modalOpen}
        size="lg"
        centered={true}
       
       >
       <div   className="p-25"> 
    
 <center className=" Comman-Heading">  STARTING THE TASK ACCURACY </center>

  <Form className="mt-20" >
  <FormGroup row>
    <Label
      for="exampleEmail"
      sm={3}
    >
     SELECT OUT PUT
    </Label>
    <Col sm={9}>
    <TextField
          id="outlined-select-currency"
          select
          label="Select"
          defaultValue="EUR"
          // helperText="Please select your currency"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
    </Col>
  </FormGroup>
  <FormGroup row>
    <Label
      for="examplePassword"
      sm={3}
    >
     ORTHOMOSIC
    </Label>
    <Col sm={9}>
    <TextField
          id="outlined-select-currency"
          select
          label="Select"
          defaultValue="EUR"
          // helperText="Please select your currency"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
    </Col>
  </FormGroup>
  <FormGroup row>
    <Label
      for="exampleSelect"
      sm={3}
    >
      ELEVATION MODAL
    </Label>
    <Col sm={9}>
    <TextField
          id="outlined-select-currency"
          select
          label="Select"
          defaultValue="EUR"
          // helperText="Please select your currency"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
    </Col>
  </FormGroup>
  <FormGroup row>
    <Label
      for="exampleSelect"
      sm={3}
    >
      3D MODAL
    </Label>
    <Col sm={9}>
    <TextField
          id="outlined-select-currency"
          select
          label="Select"
          defaultValue="EUR"
          // helperText="Please select your currency"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
    </Col>
  </FormGroup>

</Form>
<h4>Task Will Be Added To Execution Queue</h4>
<h4>Do You Want To Process These Image And Create The Task</h4>

<div className="d-flex align-items-end justify-content-end"> 
<Button 
variant="contained" 
color="primary"
 className="text-white mx-5"
  style={{ cursor: "pointer" }} 
 onClick={Submit}>
 Yes
 </Button>
 <Button 
variant="contained" 
color="primary"
 className="text-white mx-5"
  style={{ cursor: "pointer" }} 
 onClick={()=>setModalOpen(false)}>
 No
 </Button>
 </div>
       </div>
      </Modal>






      {/* <EditDataset selected={selected} Modalopen={openEditDataset} close={()=>setOpenEditDataset(false)} reloadlist={getTaskFile}/> */}
    </div>
  )
}
