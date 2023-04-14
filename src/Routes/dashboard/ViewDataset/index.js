import "./viewdataset.css"

/**
 * User Management Page
 */
import React, { useEffect, useState, useRef } from 'react'
import { Helmet } from 'react-helmet'
import Button from '@material-ui/core/Button'

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


import EditDataset from '../ReuseComponent/EditDataset';
import CustomBreadcrumbs from "../ReuseComponent/CustomBreadcrumbs";


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
  const [datasetFiles, setDatasetFiles] = useState([]);
  const [filteredDatasetFiles, setFilteredDatasetFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() => {
    const isLoggedInBool = localStorage.getItem("isLoggedIn")
    // conditional rendring
    // if(isLoggedInBool !== "true"){
    //   history.push("/login")
    //     localStorage.clear();
    // } else {
    // getCustomersListData();
    getDatasetFiles()
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

const getDatasetFiles = () => {
    const authToken = JSON.parse(localStorage.getItem("token"));
    const datasetId = localStorage?.getItem("datasetId")
    // const datasetId = 146

    if(authToken !== null){
        ViewFiles(authToken, datasetId, 1)
        .then(res=> {
            console.log(res, "resss in viewDataset file")
            if(res?.status == 200){
                console.log(res?.data?.results, "dataaa of filesss in view datasetfile")
                const results = res?.data?.results;
                const updatedResults = results.map(result=> {
                    return {...result, selectedFile: false}
                })

                setDatasetFiles(updatedResults)
                setFilteredDatasetFiles(updatedResults)
                setTotalPageCount(parseInt(res?.data?.count));
            }else {
                console.log('Response from View project Datasets lists api in view project:', res)
            }
        })
        .catch((error)=>{
            console.log("error in viewdataset:",error)
            const status = error?.response?.status
            if(status == 401){
              NotificationManager.error("Something went wrong !");
              localStorage.clear();
              history.push("/login")
            } else if(status == 500){
              NotificationManager.error("Temporary connectivity issues.");
            }
        })
    } else {
      localStorage.clear();
      history.push("/login")
    }
}

  const handlePageChange = (pageNumber) => {
    console.log("pagination", pageNumber)
    if (activePage !== pageNumber) {
      const authToken = JSON.parse(localStorage.getItem('token'))
      const datasetId = localStorage?.getItem("datasetId")

      if (authToken !== null) {
          ViewFiles(authToken, datasetId, pageNumber)
          .then((res) => {
            if (res?.status === 200) {
              setDatasetFiles(res?.data?.results);
              setFilteredDatasetFiles(res?.data?.results);
              setTotalPageCount(res?.data?.count);
              console.log('Response from customerlist :', res)
            } else {
              // console.log('Response from customerlist:', res)
            }
          })
          .catch((err) => {
            // console.log('Response from customerlist:', err)
          })
      }
      setActivePage(pageNumber)
    }
  }

  const handleFileSelect = (file) => {
    console.log(file, "selecteddd filee");

    const ifAlreadyExists = selectedFiles.find(obj=> {
      return obj.file_name == file.file_name
    });

    if(!ifAlreadyExists){
      const updatedFile = {...file, selectedFile: true}
      const copySelectedFiles = [...selectedFiles];
      copySelectedFiles.push(updatedFile);
      setSelectedFiles(copySelectedFiles);

      const copyFilteredDatasetFiles = [...filteredDatasetFiles]
      const indexOfSelectedFile = copyFilteredDatasetFiles.indexOf(file);
      copyFilteredDatasetFiles[indexOfSelectedFile] = updatedFile
      setFilteredDatasetFiles(copyFilteredDatasetFiles)
    } else {
      const updatedFile = {...file, selectedFile: false}
      const copySelectedFiles = [...selectedFiles];
      const indexOfSelectedFileInSelected = selectedFiles.findIndex(item=> {
        return item.id == file.id
      });
      copySelectedFiles.splice(indexOfSelectedFileInSelected, 1)
      setSelectedFiles(copySelectedFiles)

      const copyFilteredDatasetFiles = [...filteredDatasetFiles];
      const indexOfSelectedFile = copyFilteredDatasetFiles.indexOf(file);
      copyFilteredDatasetFiles[indexOfSelectedFile] = updatedFile;
      setFilteredDatasetFiles(copyFilteredDatasetFiles)
    }
  }
   
  

  console.log(filteredDatasetFiles, "filteredd datasets")
  console.log(datasetFiles, "daaaaset Filesss")
  console.log(selectedFiles, "Selected filessss")
  console.log(location, "location in view dataset ")
  console.log(props, "proppsss in view dataset")
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

            <Button variant="contained" color="primary" className="text-white mx-5" style={{ cursor: "pointer" }} 
            // onClick={()=> history.push("/app/dashboard/createDataset")}
            >New Task</Button>
            </div>

            <div className='viewDatasetFilesContainer'>
                {
                    filteredDatasetFiles && filteredDatasetFiles.map((file,ind)=> {
                      console.log(file)
                        return(
                                // <div className="mainBox" key={ind} onClick={()=>handleFileSelect(file)}>
                                <div className="mainBox" key={ind}>
                                  <div className="imageContainer">
                                    {/* {
                                      file.selectedFile ? <CheckBoxIcon className="folderIcon" /> : (file.file_type == "pdf" ? <PictureAsPdfIcon className="folderIcon" /> : (file.file_type == "jpg" || file.file_type == "jpeg" || file.file_type == "png" ? <ImageIcon className="folderIcon" /> : (file.file_type == "xlsx" ? <DescriptionIcon className="folderIcon" /> : <FolderIcon className="folderIcon" />)))
                                    } */}

                                    {
                                      file.file_type == "pdf" ? <a href={file?.file} target="_blank"><PictureAsPdfIcon className="folderIcon" /></a> : (file.file_type == "jpg" || file.file_type == "jpeg" || file.file_type == "png" ? <a href={file?.file} target="_blank"><ImageIcon className="folderIcon" /></a> : (file.file_type == "xlsx" ? <a href={file?.file} target="_blank"><DescriptionIcon className="folderIcon" /></a> : <a href={file?.file} target="_blank"><FolderIcon className="folderIcon" /></a>))
                                    }

                                  </div>
                                  <div className="nameContainer">
                                    <p>{file.file_name}</p>
                                  </div>

                                  <div className="checkDiv" onClick={()=>handleFileSelect(file)}>{
                                    file.selectedFile ? <CheckIcon fontSize="medium" style={{fontWeight: "600"}} /> : ""
                                  }</div>
                                  
                                </div>
                        )
                    })
                }
            </div>

            {filteredDatasetFiles.length == 0 && <center style={{ color: "black" }}>Data not available </center>}
          {
            datasetFiles?.length > 0 &&
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
        {loading && <RctSectionLoader />}
      </RctCollapsibleCard>

      <EditDataset selected={selected} Modalopen={openEditDataset} close={()=>setOpenEditDataset(false)} reloadlist={getDatasetFiles}/>
    </div>
  )
}
