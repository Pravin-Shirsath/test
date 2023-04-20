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
  ViewTasks,
  getSearchProjectDatasets,
  getViewProjectDatasets
} from '../../../Api/'
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import EditDataset from '../ReuseComponent/EditDataset';
import { getFormatDate2 } from 'Constants/DateFormator';
import CustomBreadcrumbs from "../ReuseComponent/CustomBreadcrumbs";

import {
    ViewFiles,
    SearchTask
  } from '../../../Api/'
import { ErrorHandling } from 'Constants/ErrorHandling';

export default function ViewProject(props) {
  const history = useHistory();
 const {location}=props
 
  //  const [users, setUsers] = useState() // use when data is coming from api
  const [users, setUsers] = useState([])
  //  const [filteredUsers, setFilteredUsers] = useState() // use when the data is coming fom api
  const [filteredUsers, setFilteredUsers] = useState([])
  const [searchText, setSearchText] = useState('');
  

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
 
  const [selectedUser, setSelectedUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [addNewUserModal, setAddNewUserModal] = useState(false)
  const [updateNewUserModal, setupdateNewUserModal] = useState(false)
  const [deleteUserModal, setdeleteUserModal] = useState(false)

  const deleteConfirmationDialog = useRef()
  const [selected, setSelectedItem] = useState({})

  const [editUser, setEditUser] = useState(null)
  const [selectedUsers, setSelectedUsers] = useState(0)
  const [viewDetails, setViewDetails] = useState()
const [openEditDataset,setOpenEditDataset] = useState(false)

  const [datasets, setDatasets] = useState([]);
  const [filteredDatasets,setFilteredDatasets] = useState([])
  // const [activePage, setActivePage] = useState(1)
  // const [totalPageCount, setTotalPageCount] = useState(0);
  const [datasetFiles, setDatasetFiles] = useState([]);
  const [filteredDatasetFiles, setFilteredDatasetFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);


  // states used in viewTasks i.e; this page
  const [tasksList, setTasksList] = useState([]);
  const [filteredTasksList, setFilteredTasksList] = useState([])
  const [totalPageCount, setTotalPageCount] = useState(0)
  const [activePage, setActivePage] = useState(1)


  useEffect(() => {
    const isLoggedInBool = localStorage.getItem("isLoggedIn")
    // conditional rendring
    // if(isLoggedInBool !== "true"){
    //   history.push("/login")
    //     localStorage.clear();
    // } else {
    // getCustomersListData();

    getTasksList()
    // }
  }, [])

  const getTasksList = () => {
    const authToken = JSON.parse(localStorage?.getItem("token"));
    const datasetId = localStorage?.getItem("datasetId");

    console.log(authToken, datasetId, "auth token and datasetId on getTasksList api call")

    if(authToken!==null){
      ViewTasks(authToken, datasetId, 1)
      .then(res=> {
        console.log(res, "ressss in listOfTask file ke then block")
        if(res?.status == 200){
          setTasksList(res?.data?.results)
          setFilteredTasksList(res?.data?.results)
          setTotalPageCount(parseInt(res?.data?.count))
        } else {
          console.log('Response from View Tasks list api in ListOfTask', res)
        }
      })
      .catch(err => {
        ErrorHandling(err)
      })
    }
  }

  const EditModal = (item) => {
    // setSelectedItem(item)
  
    // setOpenEditDataset(true)
  }

  const DeletModalOpen = (item) => {
    // setSelectedItem(item)
    // deleteConfirmationDialog.current.open()
  }

  const Delete_Datset = () => {
    // const accessToken = JSON.parse(localStorage.getItem('token'))
    // if (accessToken !== null) {
     
    //   DeleteDataset(accessToken, selected?.id,selected?.project_id)
    //     .then((res) => {
    //       if (res?.status === 200) {
    //         deleteConfirmationDialog.current.close()

    //         NotificationManager.success("Datset deleted successfully!")
    //         console.log('Response from dataset  :', res)

    //       } else {


    //         NotificationManager.error("Delete_Datset deleting process unsucess!")
    //       }
    //     })
    //     .catch((err) => {
    //       console.log('Response from err dataset  :', err)
    //       NotificationManager.error("Delete_Datset deleting process unsucess!")
    //     })
    // }
  }

  const handlePageChange = (pageNumber) => {
    console.log("pagination", pageNumber)

    if (activePage !== pageNumber) {
      const authToken = JSON.parse(localStorage?.getItem("token"));
      const datasetId = localStorage?.getItem("datasetId");

      if (authToken !== null) {
        ViewTasks(authToken, datasetId, pageNumber)
          .then(res=> {
            console.log(res, "ressss in listOfTask file ke then block")
            if(res?.status == 200){
              setTasksList(res?.data?.results)
              setFilteredTasksList(res?.data?.results)
              setTotalPageCount(parseInt(res?.data?.count))
            } else {
              console.log('Response from View Tasks list api in ListOfTask', res)
            }
          })
          .catch(err => {
            ErrorHandling(err)
          })
      }
      setActivePage(pageNumber)
    }
  }


  // Dataset View
  const handleView = (dataset) => {
    // console.log(dataset?.id, "selected dataset ID")
    // localStorage.setItem("datasetId", dataset?.id);
    // if(location?.state?.breadcrumbData){
    //   let path = location?.state?.breadcrumbData[0]
    //   if(path?.name == "Dashboard"){
    //     const breadcrumbData = [
    //       { name: 'Dashboard', url: '/app/dashboard/saas' },
    //       { name: 'View Project', url: '/app/dashboard/viewProject' },
          
    //     ];
    //     history.push("/app/dashboard/viewDataset",{breadcrumbData:breadcrumbData})
    //   }else if(path?.name == "Project"){
    //     const breadcrumbData = [
    //       { name: 'Project', url: '/app/dashboard/project' },
    //       { name: 'View Project', url: '/app/dashboard/viewProject' },
          
    //     ];
    //     history.push("/app/dashboard/viewDataset",{breadcrumbData:breadcrumbData})
    //   }
    // }
  
  }

  // Dataset create
  const HandleCreate=()=>{
    // if(location?.state?.breadcrumbData){
    //   let path = location?.state?.breadcrumbData[0]
    //   if(path?.name == "Dashboard"){
    //     const breadcrumbData = [
    //       { name: 'Dashboard', url: '/app/dashboard/saas' },
    //       { name: 'View Project', url: '/app/dashboard/viewProject' },
          
    //     ];
    //     history.push("/app/dashboard/createDataset",{breadcrumbData:breadcrumbData})
    //   }else if(path?.name == "Project"){
    //     const breadcrumbData = [
    //       { name: 'Project', url: '/app/dashboard/project' },
    //       { name: 'View Project', url: '/app/dashboard/viewProject' },
          
    //     ];
    //     history.push("/app/dashboard/createDataset",{breadcrumbData:breadcrumbData})
    //   }
    // }
       
  }

  // const SearchTask = () => {
  //   const accessToken = JSON.parse(localStorage.getItem('token'));
  //   const projectId = localStorage?.getItem("projId")
  //   if (accessToken !== null) {
  //      getSearchProjectDatasets(accessToken,projectId, searchText)
  //       .then((res) => {
  //         if (res?.status === 200 && res?.data?.results.length>0) {
  //           setFilteredDatasets(res?.data?.results);
  //           setSearchText('')
  //           // console.log('Response from customerlist :', res)
  //         } else {
  //           // console.log('Response from customerlist:', res)
  //           setFilteredDatasets(datasets);
  //           setSearchText('');
  //           NotificationManager.error("No dataset found!")
  //         }
  //       })
  //       .catch((err) => {
  //         // console.log('Response from customerlist:', err)
  //       })
  //   }
  // }

  const searchTask = () => {
    const authToken = JSON.parse(localStorage?.getItem("token"));
    const datasetId = localStorage?.getItem("datasetId");

    if (authToken !== null) {
      SearchTask(authToken,datasetId, searchText)
        .then((res) => {
          if (res?.status === 200 && res?.data?.results.length>0) {
            setFilteredTasksList(res?.data?.results);
            setSearchText('')
            // console.log('Response from customerlist :', res)
          } else {
            // console.log('Response from customerlist:', res)
            setFilteredDatasets(tasksList);
            setSearchText('');
            NotificationManager.error("No task found!")
          }
        })
        .catch((err) => {
          // console.log('Response from customerlist:', err)
        })
    }
  }

const NavigateCompletTask=()=>{
  // history.push("/app/dashboard/downloadFile")
}

console.log(tasksList, "tassskkssss lissssttt aboove return")
console.log(searchText, "Seaccccchhhh text")
  return (
    <div className="user-management">
      <Helmet>
        <title>Automaton | Task List</title>
        <meta name="description" content="Automaton Widgets" />
      </Helmet>
      {/* <PageTitleBar
        title={<IntlMessages id="sidebar.viewProject" />}
        match={props.match}
      /> */}
 
      <CustomBreadcrumbs    currentPage={"Task List"} data={location?.state?.breadcrumbData} />


                {/* <DeleteConfirmationDialog title="Are You Sure Want To Delete?"
             message="This will delete your Dataset permanently."
             onConfirm={() => Delete_Datset()}
             ref={deleteConfirmationDialog} /> */}
      <RctCollapsibleCard>
     
        <div className="table-responsive">
          <div className="d-flex py-20 px-10 border-bottom" style={{ justifyContent: 'space-between' }}>
            <div className='search-row'>
              <input type="text" placeholder='Search' className='search-input py-2' style={{ border: "none", borderBottom: "1px solid black" }} value={searchText} onChange={(e) => setSearchText(e.target.value)} />
              <Button variant="contained" color="primary" className="text-white mx-5" style={{ cursor: "pointer" }} 
               onClick={searchTask}
              >Search</Button>
            </div>

            {/* <Button  
             onClick={NavigateCompletTask}
            variant="contained" color="primary" className="text-white mx-5" style={{ cursor: "pointer" }} >Completed Task</Button> */}

          </div>

          <div className='bg-danger p-2 d-flex justify-content-center align-items-center headingContainer dark-primary' style={{marginBottom:"50px"}}>
            <ul className='d-flex justify-content-center align-items-center globalFontFamily ' style={{listStyle: "none", gap: "30px", margin:"0px"}}>
                <li>0 Complete</li>
                <li>1 In Progress</li>
                <li>0 Failed</li>
                <li>3 Pending</li>
            </ul>
          </div>
          <table className="table table-middle table-hover mb-0">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Status</th>
                <th>Images</th>
                <th>Plan</th>
                <th>Date Created</th>
                <th>Action</th>
              </tr>
            </thead>

            {/****** mine filtered Table body, without ternary conditional value  *****/}
            <tbody>
              {/* {filteredDatasets &&
                filteredDatasets.map((dataset, i, data) => {
                  // let active = user?.is_active
                  let created_Date = getFormatDate2((dataset?.date_created))
                  return (

                    <tr key={i}>
                      <td></td>
                      <td>Task-1</td>
                      <td>Pending</td>
                      <td>1</td>
                      <td className="list-action d-flex ">Plaaannn</td>
                      <td>27 March 2023</td>
                    </tr>
                  )
                })
              } */}

                    {
                      filteredTasksList && filteredTasksList.map((task, ind, data)=> {
                        return(
                          <tr className='globalFontFamily'>
                            <td></td>
                            <td>{task?.task_name}</td>
                            <td>{task?.status}</td>
                            <td>{task?.task_file}</td>
                            <td className="list-action d-flex ">Plaaannn</td>
                            <td>{task?.date_created.slice(0, 10).split("-").reverse().join("-")}</td>
                            <td>View</td>
                          </tr>
                        )
                      })
                    }

            </tbody>

          </table>
          {filteredTasksList.length == 0 && <center style={{ color: "black" }}>Data not available </center>}
          {
            tasksList?.length > 0 &&
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

      {/* <EditDataset selected={selected} Modalopen={openEditDataset} close={()=>setOpenEditDataset(false)} reloadlist={getViewProjectData}/>       */}
    </div>
  )
}
