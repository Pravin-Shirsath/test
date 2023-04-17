

import React, { useEffect, useState, useRef } from 'react'
import { Helmet } from 'react-helmet'

import FormControlLabel from '@material-ui/core/FormControlLabel'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import Switch from 'react-toggle-switch';

import {
  
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Form,
  FormGroup,
  Label,
} from 'reactstrap'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import { NotificationManager } from 'react-notifications'
import Pagination from "react-js-pagination";

import { Link, useHistory } from 'react-router-dom';

// delete confirmation dialog
import DeleteConfirmationDialog from 'Components/DeleteConfirmationDialog/DeleteConfirmationDialog'
// add new user form
//  import AddNewUserForm from './AddNewUserForm'
// update user form
//  import UpdateUserForm from './UpdateUserForm'
// page title bar
import PageTitleBar from './../../../../Components/PageTitleBar/PageTitleBar'
// intl messages
import IntlMessages from '../../../../Util/IntlMessages'
// rct card box
import RctCollapsibleCard from './../../../../Components/RctCollapsibleCard/RctCollapsibleCard'
// rct section loader
import RctSectionLoader from '../../../../Components/RctSectionLoader/RctSectionLoader'
import '../../../.././Assets/css/user.css'
import {
  CustomerProjects,
  DeleteProject, GetAlLProjectList, GetSearchProjectList, SearchCustomerProjects,
 
  
} from '../../../.././Api/'
import { getFormatDate2 } from 'Constants/DateFormator'



const Table = () => {

  const deleteConfirmationDialog = useRef()
  const [project, setProject] = useState([])
  //  const [filteredUsers, setFilteredProject] = useState() // use when the data is coming fom api
  const [filterProject, setFilteredProject] = useState([])
  const [searchText, setSearchText] = useState('');
  const [activePage, setActivePage] = useState(1)
  const [totalPageCount, setTotalPageCount] = useState('');
  const [selected, setSelectedItem] = useState({})
  const type = JSON.parse(localStorage.getItem('user_type'));
  const [openEditProject, setOpenEditProject] = useState(false)



  //  if(type === "admin"){

  //    history.push("app/dashboard/Admin/Dashboard")
  //  }

    

  const ProjectList = () => {
    const accessToken = JSON.parse(localStorage.getItem('token'))
    const CustomerID = JSON.parse(localStorage.getItem('CustomerId'))
    if (accessToken !== null) {
      CustomerProjects(accessToken, activePage,CustomerID)
        .then((res) => {
          if (res?.status === 200) {
            setProject(res?.data?.results);
            setFilteredProject(res?.data?.results);
            setTotalPageCount(parseInt(res?.data?.count));
            console.log('Response from PROJECTlist :', res)
          } else {
            // console.log('Response from customerlist:', res)
          }
        })
        .catch((err) => {
          // console.log("status of invalid token", err?.response?.data, err?.response?.status)
          if (err?.response?.status == 401) {
            // conditional rendring
            // localStorage.clear();
            // history.push("/login");
            // window.location.reload();
          } else {
            // console.log('Response from customerlist:', err)
          }
        })
    }
  }




  const handlePageChange = (pageNumber) => {
    // console.log("pagination", pageNumber)
    if (activePage !== pageNumber) {
      const accessToken = JSON.parse(localStorage.getItem('token'))
      if (accessToken !== null) {
        GetAlLProjectList(accessToken, pageNumber)
          .then((res) => {
            if (res?.status === 200) {
              setProject(res?.data?.results);
              setFilteredProject(res?.data?.results);
              setTotalPageCount(parseInt(res?.data?.count));
              console.log('Response from handle change :', res)
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


  const getSearchedProjectData = () => {
    const accessToken = JSON.parse(localStorage.getItem('token'));
    const CustomerID = JSON.parse(localStorage.getItem('CustomerId'))
    if (accessToken !== null) {
      SearchCustomerProjects(accessToken, searchText,CustomerID)
        .then((res) => {
          if (res?.status === 200 && res?.data?.results.length > 0) {
            setFilteredProject(res?.data?.results);
            setSearchText('')
            console.log('Response from search  :', res)
          } else {
            // console.log('Response from customerlist:', res)
            setFilteredProject(project);
            setSearchText('');
            NotificationManager.error("No Project found!")
          }
        })
        .catch((err) => {
          // console.log('Response from customerlist:', err)
        })
    }
  }

  //  alert("hello")
  useEffect(() => {

    ProjectList()
    console.log("type", type);
  }, [])


  const DeletModalOpen = (item) => {
    setSelectedItem(item)
    deleteConfirmationDialog.current.open()
  }
  const Delete_project = () => {


    const accessToken = JSON.parse(localStorage.getItem('token'))
    if (accessToken !== null) {
      DeleteProject(accessToken, selected?.id)
        .then((res) => {
          if (res?.status === 200) {
            deleteConfirmationDialog.current.close()
            ProjectList()
            NotificationManager.success("Project deleted !")
            console.log('Response from search  :', res)
          } else {
            NotificationManager.error("Project deleting process unsucess!")
          }
        })
        .catch((err) => {
          NotificationManager.error("Project deleting process unsucess!")
        })
    }
  }

  

  return (
    <div>
        <div className="table-responsive">
           <div className="d-flex py-20 px-10 border-bottom" style={{justifyContent:'space-between'}}>
           <div className='search-row'>
               <input type="text" placeholder='Search' className='search-input py-2' style={{border:"none", borderBottom:"1px solid black"}} value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
               <Button variant="contained" color="primary" className="text-white mx-5" onClick={getSearchedProjectData} >Search</Button>
                 </div> 
         
                 {/* <Button variant="contained" color="primary" className="text-white mx-5"  style={{ cursor: "pointer"}}   onClick={(e) => opnAddNewUserModal(e)}> <i className="zmdi zmdi-plus mx-2"></i>Users</Button> */}
 
                
               
           
           </div>
           <table className="table table-middle table-hover mb-0">
             <thead>
               <tr>
                 <th></th>
                 <th>Project Id</th>
                 <th>Project Name </th>
                 <th>Size</th>
                 <th>Created Date</th>
                 <th>Status</th>
               </tr>
             </thead>
 
             {/****** mine filtered Table body, without ternary conditional value  *****/}
             <tbody>
             {filterProject &&
              filterProject.map((Project , i,data) => {
                let created = getFormatDate2(Project.date_created)
                 return(

                   <tr key={i}>
                     <td></td>
                     <td>{Project?.id}</td>
                     <td>
                       <div className="media">
                         <div className="media-body">
                           <h5 className="mb-5 fw-bold">
                           {Project?.project_name}
                           </h5>
                         </div>
                       </div>
                     </td>
                     <td>{Project?.size != null ? Project?.size :"-"}</td>
                     <td>
                    { created}
                     </td>
                     <td>
                    {Project?.status != null ? Project?.status :"-"}
                     </td>
                    
                   </tr>
                 )})}
             </tbody>
 
           </table> 
           {
              project?.length > 0 &&
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
    </div>
  )
}

export default Table
