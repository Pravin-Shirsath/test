import "./viewdataset.css"

/**
 * User Management Page
 */
import React, { useEffect, useState, useRef } from 'react'
import { Helmet } from 'react-helmet'
import Button from '@material-ui/core/Button'

import Pagination from "react-js-pagination";

import { useHistory } from 'react-router-dom';

import { ErrorHandling } from "Constants/ErrorHandling";

import { NotificationManager } from 'react-notifications'
// delete confirmation dialog
import DeleteConfirmationDialog from 'Components/DeleteConfirmationDialog/DeleteConfirmationDialog'

// rct card box
import RctCollapsibleCard from '../../../Components/RctCollapsibleCard/RctCollapsibleCard'
// rct section loader
import RctSectionLoader from '../../../Components/RctSectionLoader/RctSectionLoader'
import '../../../Assets/css/user.css'
import {
  CreateTask,
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
import VideoFileIcon from '@mui/icons-material/VideoFile';
import EditDataset from '../ReuseComponent/EditDataset';
import CustomBreadcrumbs from "../ReuseComponent/CustomBreadcrumbs";
import AppConfig from "Constants/AppConfig";



export default function ViewDataset(props) {
  const history = useHistory();
  const {location}=props
 
  const [searchText, setSearchText] = useState('');
  
  const [loading, setLoading] = useState(false)


  const deleteConfirmationDialog = useRef()
  const [selected, setSelectedItem] = useState({})

const [openEditDataset,setOpenEditDataset] = useState(false)

  const [activePage, setActivePage] = useState(1)
  const [totalPageCount, setTotalPageCount] = useState('');
  const [datasetFiles, setDatasetFiles] = useState([]);
  const [filteredDatasetFiles, setFilteredDatasetFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() => {
   
    
    getDatasetFiles()
    // }
  }, [])



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
                });


                setDatasetFiles(updatedResults)
                setFilteredDatasetFiles(updatedResults)
                setTotalPageCount(parseInt(res?.data?.count));

            }else {
                console.log('Response from View project Datasets lists api in view project:', res)
            }
        })
        .catch((error)=>{
        
            ErrorHandling(error)
        })
    }
}

  const handlePageChange = (pageNumber) => {
   
    
    if (activePage !== pageNumber) {
      const authToken = JSON.parse(localStorage.getItem('token'))
      const datasetId = localStorage?.getItem("datasetId")
      if (authToken !== null) {
          ViewFiles(authToken, datasetId, pageNumber)
          .then((res) => {
            if (res?.status === 200) {
              // console.log(res?.data?.results, "dataaa of filesss in view datasetfile")
              const results = res?.data?.results;

              const updatedResults = results.map(result=> {
              const find =   selectedFiles.find((item=>item.id == result.id))
                 if(find){
                 return {...result, selectedFile: true}
                 }
                return {...result, selectedFile: false}
              });
              setDatasetFiles(updatedResults)
              setFilteredDatasetFiles(updatedResults)
              setTotalPageCount(parseInt(res?.data?.count));
            }
          })
          .catch((err) => {
           
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
  
  const NewTaskNavigate = ()=>{
      
     if(selectedFiles.length > 0){
              const  breadcrumbData =location?.state?.breadcrumbData || []
                     breadcrumbData.push( { name: 'View Dataset', url: '/app/dashboard/viewDataset' });
            
              const authToken = JSON.parse(localStorage.getItem("token"));
              const datasetId = localStorage.getItem("datasetId")
          
          
              if(authToken !== null){
                CreateTask(authToken, datasetId)
                  .then(res=> {
                      console.log(res, "CREATED TASK")
                      if(res?.status == 200){
                        if(res.data?.task_id){
                          NotificationManager.success("Task Created Successfully")
                          localStorage.setItem("TaskId",JSON.stringify(res?.data?.task_id))
                          localStorage.setItem("TaskName",JSON.stringify(res?.data?.task_name))
                          history.push("/app/dashboard/createTask",{breadcrumbData:breadcrumbData,files:{"count":1,data:selectedFiles}});
                        }
                      }
                  })
                  .catch((error)=>{
                     ErrorHandling(error)
                  })
              }
         
     }else{
      NotificationManager.error("Please  selected file !");

     }



  }

  const AllTask=()=>{
    const  breadcrumbData =location?.state?.breadcrumbData || []
             breadcrumbData.push( { name: 'View Dataset', url: '/app/dashboard/viewDataset' });
             history.push("/app/dashboard/listOfTask",{breadcrumbData:breadcrumbData,files:{"count":1,data:selectedFiles}});

  }

  return (
    <div className="user-management">
      <Helmet>
        <title>{AppConfig.brandName} | Customers List</title>
        <meta name="description" content={`${AppConfig.brandName} Widgets`} />
      </Helmet>
     
     <CustomBreadcrumbs    currentPage={"View Dataset"} data={location?.state?.breadcrumbData}  />

                <DeleteConfirmationDialog title="Are You Sure Want To Delete?"
             message="This will delete your Dataset permanently."
            //  onConfirm={() => Delete_Datset()}
             ref={deleteConfirmationDialog} />
      <RctCollapsibleCard>
     
        <div className="table-responsive">
            <div className="d-flex py-20 px-10 border-bottom" style={{ justifyContent: 'space-between' }}>
            <div className='search-row'>
                <input type="text" placeholder='Search' className='search-input py-2' style={{ border: "none", borderBottom: "1px solid black" }} value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                <Button variant="contained" color="primary" className="text-white mx-5" style={{ cursor: "pointer" }} 
                // onClick={getSearchedCustomerData}
                >Search</Button>
            </div>

            <Button variant="contained" color="primary" className="text-white mx-5" style={{ cursor: "pointer" }} 
             onClick={AllTask}
            >All Task</Button>
            </div>

            <div className='viewDatasetFilesContainer'>
                {
                    filteredDatasetFiles &&filteredDatasetFiles?.length > 0&& filteredDatasetFiles.map((file,ind)=> {
                      {/* console.log(file) */}
                        return(
                                // <div className="mainBox" key={ind} onClick={()=>handleFileSelect(file)}>
                                <div className="mainBox" key={ind}>
                                  <div className="imageContainer">
                                    {/* {
                                      file.selectedFile ? <CheckBoxIcon className="folderIcon" /> : (file.file_type == "pdf" ? <PictureAsPdfIcon className="folderIcon" /> : (file.file_type == "jpg" || file.file_type == "jpeg" || file.file_type == "png" ? <ImageIcon className="folderIcon" /> : (file.file_type == "xlsx" ? <DescriptionIcon className="folderIcon" /> : <FolderIcon className="folderIcon" />)))
                                    } */}

                                    {
                                      file.file_type == "pdf" ? <a href={file?.file} target="_blank"><PictureAsPdfIcon className="folderIcon" /></a> 
                                      : (file.file_type == "jpg" || file.file_type == "jpeg" || file.file_type == "png" ? <a href={file?.file} target="_blank"><ImageIcon className="folderIcon" /></a> 
                                      : (file.file_type == "xlsx" ? <a href={file?.file} target="_blank"><DescriptionIcon className="folderIcon" /></a> 
                                      : <a href={file?.file} target="_blank"><InsertDriveFileIcon className="folderIcon" /></a>))
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

            {filteredDatasetFiles?.length == 0 && <center style={{ color: "black" }}>Data not available </center>}
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
        <div className="d-flex align-items-center justify-content-center"> 
       <Button 
       variant="contained"
        color="primary" 
        className="text-white mx-5 mb-30"
         style={{ cursor: "pointer" }} 
         onClick={NewTaskNavigate}
        >
        New Task
        </Button></div>
      </RctCollapsibleCard>

      <EditDataset selected={selected} Modalopen={openEditDataset} close={()=>setOpenEditDataset(false)} reloadlist={getDatasetFiles}/>
    </div>
  )
}
