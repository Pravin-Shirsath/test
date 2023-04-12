/**
 * User Management Page
 */
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
   addNewCustomer,
   getCustomerList,
   deleteCustomerDetails,
   updateCustomerDetails,
   getSearchedCustomer,
   CustomerDisable,
   CustomerEnable,
   
 } from '../../../.././Api/'
 
 export default function CustomerManagement(props) {
   const history = useHistory();
   const [users, setUsers] = useState([])
   const [filteredUsers, setFilteredUsers] = useState([])
   const [searchText, setSearchText] = useState('');
   const [activePage , setActivePage] = useState(1)
   const [totalPageCount, setTotalPageCount] = useState('');
  
   const [loading, setLoading] = useState(false)
  
   const [deleteUserModal, setdeleteUserModal] = useState(false)
  
   
 
 
 
   useEffect(() => {
     const isLoggedInBool = localStorage.getItem("isLoggedIn")
     // conditional rendring
     // if(isLoggedInBool !== "true"){
     //   history.push("/login")
     //     localStorage.clear();
     // } else {
       getCustomersListData();
     // }
   }, [])
 
   const getCustomersListData = () => {
     const accessToken = JSON.parse(localStorage.getItem('token'))
     if (accessToken !== null) {
       getCustomerList(accessToken, activePage)
         .then((res) => {
           if (res?.status === 200) {
             setUsers(res?.data?.results);
             setFilteredUsers(res?.data?.results);
             setTotalPageCount(parseInt(res?.data?.count));
             // console.log('Response from customerlist :', res)
           } else {
             // console.log('Response from customerlist:', res)
           }
         })
         .catch((err) => {
           // console.log("status of invalid token", err?.response?.data, err?.response?.status)
           if(err?.response?.status == 401){
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
 
 
 
   const getSearchedCustomerData = () => {
     const accessToken = JSON.parse(localStorage.getItem('token'))
     if (accessToken !== null) {
       getSearchedCustomer(accessToken, searchText)
         .then((res) => {
           if (res?.status === 200 && res?.data?.results.length>0) {
             setFilteredUsers(res?.data?.results);
             setSearchText('')
             // console.log('Response from customerlist :', res)
           } else {
             // console.log('Response from customerlist:', res)
             setFilteredUsers(users);
             setSearchText('');
             NotificationManager.error("No user found!")
           }
         })
         .catch((err) => {
           // console.log('Response from customerlist:', err)
         })
     }
   }
 
  
   // API Call For delete User
   const handleToggleUser = (user,e) => {
   
 
     const accessToken = JSON.parse(localStorage.getItem('token'))
     if (accessToken !== null) {
      
        if(user?.is_active){
         
          CustomerDisable(accessToken,user.id)
          .then((res) => {
            if (res?.status === 200) {
              setdeleteUserModal(false)
              setLoading(true)
               console.log('Response', res)
              setTimeout(() => {
                setLoading(false)
                getCustomersListData()
                NotificationManager.success('User disable successfully  !! ')
              }, 2000)
            } else if (res?.status === 400) {
              setdeleteUserModal(false)
              NotificationManager.error('Error while disable user')
            } else {
              setdeleteUserModal(false)
              NotificationManager.error('Error while disable user')
            }
          })
          .catch((err) => {
            setdeleteUserModal(false)
            NotificationManager.error('Error while disable user')
          })
        }else{
         
          CustomerEnable(accessToken,user.id)
          .then((res) => {
            if (res?.status === 200) {
              setdeleteUserModal(false)
              setLoading(true)
               console.log('Response', res)
              setTimeout(() => {
                setLoading(false)
                getCustomersListData()
                NotificationManager.success('User enable successfully  !! ')
              }, 2000)
            } else if (res?.status === 400) {
              setdeleteUserModal(false)
              NotificationManager.error('Error while enable user')
            } else {
              setdeleteUserModal(false)
              NotificationManager.error('Error while enable user')
            }
          })
          .catch((err) => {
            setdeleteUserModal(false)
            NotificationManager.error('Error while enable user')
          })
        }

    
     }
   }
 
 
 
   
 
  
 
   const handlePageChange = (pageNumber) => {
     // console.log("pagination", pageNumber)
        if (activePage !== pageNumber) {
         const accessToken = JSON.parse(localStorage.getItem('token'))
         if (accessToken !== null) {
           getCustomerList(accessToken, pageNumber)
             .then((res) => {
               if (res?.status === 200) {
                 setUsers(res?.data?.results);
                 setFilteredUsers(res?.data?.results);
                 setTotalPageCount(res?.data?.count);
                 // console.log('Response from customerlist :', res)
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
  
   // console.log(addNewUserDetail, "addNewUserDetail data")
   // console.log(users, "usersss")
   // console.log(filteredUsers, "filtered user")
   return (
     <div className="user-management">
       <Helmet>
         <title>Automaton | Customers List</title>
         <meta name="description" content="Automaton Widgets" />
       </Helmet>
       <PageTitleBar
         title={<IntlMessages id="custmermangement" />}
         match={props.match}
       />
       <RctCollapsibleCard fullBlock>
         <div className="table-responsive">
           <div className="d-flex py-20 px-10 border-bottom" style={{justifyContent:'space-between'}}>
           <div className='search-row'>
               <input type="text" placeholder='Search' className='search-input py-2' style={{border:"none", borderBottom:"1px solid black"}} value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
               <Button variant="contained" color="primary" className="text-white mx-5"  style={{ cursor: "pointer"}}  onClick={getSearchedCustomerData}>Search</Button>
                 </div> 
         
                 {/* <Button variant="contained" color="primary" className="text-white mx-5"  style={{ cursor: "pointer"}}   onClick={(e) => opnAddNewUserModal(e)}> <i className="zmdi zmdi-plus mx-2"></i>Users</Button> */}
 
                
               
           
           </div>
           <table className="table table-middle table-hover mb-0">
             <thead>
               <tr>
                 <th></th>
                 <th>No</th>
                 <th>User</th>
                 <th>Email</th>
                 <th>Phone</th>
                 <th>Action</th>
               </tr>
             </thead>
 
             {/****** mine filtered Table body, without ternary conditional value  *****/}
             <tbody>
             {filteredUsers &&
                 filteredUsers.map((user, i,data) => {
                   let active = user?.is_active  
                 return(

                   <tr key={i}>
                     <td></td>
                     <td>{user?.id}</td>
                     <td>
                       <div className="media">
                         <div className="media-body">
                           <h5 className="mb-5 fw-bold">{user?.user}</h5>
                         </div>
                       </div>
                     </td>
                     <td>{user?.email ? user?.email : '-'}</td>
                     <td>
                       {user?.mobile_number ? user?.mobile_number : '-'}
                     </td>
 
                     <td className="list-action" style={{display:"flex", gap:"3px"}}>
                   
                       <Switch
                         onClick={()=>handleToggleUser(user)}
                        on={active}
                        className={user?.is_active==true?"bg-primary":"bg-danger"}
                     />
                      
                     </td>
                   </tr>
                 )})}
             </tbody>
 
           </table> 
            {
               users?.length > 0 &&
               <div className='paginationDiv'>
                 <Pagination
                             activePage={activePage}
                             itemsCountPerPage={10}
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
       
       </RctCollapsibleCard>
 
      
 
    
 
    
 
      
     </div>
   )
 }
 