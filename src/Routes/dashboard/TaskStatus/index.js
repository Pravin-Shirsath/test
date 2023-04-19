import "./taskStatus.css"

/**
 * User Management Page
 */
import React, { useEffect, useState, useRef } from 'react'
import { Helmet } from 'react-helmet'
import Button from '@material-ui/core/Button'
import FolderIcon from '@mui/icons-material/Folder';
 
import Pagination from "react-js-pagination";
import {
    ViewFiles
  } from '../../../Api/'

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

import EditDataset from '../ReuseComponent/EditDataset';
import CustomBreadcrumbs from "../ReuseComponent/CustomBreadcrumbs";


export default function TaskStatus(props) {
  const history = useHistory();
  const {location}=props

  const [searchText, setSearchText] = useState('');
  
  const [username, setUsername] = useState("")

  const [loading, setLoading] = useState(false)

  const deleteConfirmationDialog = useRef()
  const [selected, setSelectedItem] = useState({})

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

  const allFiles = [1,2,3,4,5]

  const handlePageChange = (pageNumber) => {
    // console.log("pagination", pageNumber)
    // if (activePage !== pageNumber) {
    //   const authToken = JSON.parse(localStorage.getItem('token'))
    //   const datasetId = localStorage?.getItem("datasetId")

    //   if (authToken !== null) {
    //       ViewFiles(authToken, datasetId, pageNumber)
    //       .then((res) => {
    //         if (res?.status === 200) {
    //           setDatasetFiles(res?.data?.results);
    //           setFilteredDatasetFiles(res?.data?.results);
    //           setTotalPageCount(res?.data?.count);
    //           console.log('Response from customerlist :', res)
    //         } else {
    //           // console.log('Response from customerlist:', res)
    //         }
    //       })
    //       .catch((err) => {
    //         // console.log('Response from customerlist:', err)
    //       })
    //   }
    //   setActivePage(pageNumber)
    // }
  }

  return (
    <div className="user-management">
      <Helmet>
        <title>Automaton | Customers List</title>
        <meta name="description" content="Automaton Widgets" />
      </Helmet>
      {/* <PageTitleBar
        title={<IntlMessages id="sidebar.taskStatus" />}
        match={props.match}
      /> */}
     <CustomBreadcrumbs    currentPage={"Task Status"} data={location?.state?.breadcrumbData}  />

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
            </div>

            <div className='taskStatusContainer'>
                {/* TOP */}
                <div className="top">
                    {/* <div className="headingContainer">
                        <h1>Task-1</h1>
                    </div> */}

                    <div className="headingContainer dark-primary">
                        <h1 className="globalFontFamily">Task-1</h1>
                    </div>

                    <div className="detailContainer">
                        {/* left */}
                        <div className="left globalFontFamily">
                            <p><strong>Images:</strong> 5</p>
                            <p><strong>Process Status:</strong> Pending</p>
                            <p><strong>Date:</strong> 27/03/2023</p>
                            <p><strong>Time:</strong> 03:15 AM</p>
                        </div>

                        {/* right */}
                        <div className="right globalFontFamily">
                        <p><strong>Output:</strong> Orthomosaic(low)</p>
                        <p>Elevation(Low) 3D Modal(High)</p>
                        </div>
                    </div>
                </div>

                {/* BOTTOM */}
                <div className="bottom">
                    {
                        allFiles.map(()=> {
                            return(
                                <div className="box">
                                    <FolderIcon className="folderIcon" />
                                </div>
                            )
                        })
                    }
                </div>
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
