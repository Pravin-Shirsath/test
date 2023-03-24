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
 import AddNewUserForm from './AddNewUserForm'
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
   addNewCustomer,
   getCustomerList,
   deleteCustomerDetails,
   updateCustomerDetails,
   getSearchedCustomer,
   CustomerDisable,
   CustomerEnable,
   
 } from '../../../Api/'
 
 export default function UserManagement(props) {
   const history = useHistory();
   const deleteConfirmationDialog = useRef()
  //  const [users, setUsers] = useState() // use when data is coming from api
  const [users, setUsers] = useState([])
  //  const [filteredUsers, setFilteredUsers] = useState() // use when the data is coming fom api
   const [filteredUsers, setFilteredUsers] = useState([])
   const [searchText, setSearchText] = useState('');
   const [activePage , setActivePage] = useState(1)
   const [totalPageCount, setTotalPageCount] = useState('');
   
   const [selectedUser, setSelectedUser] = useState(null)
   const [loading, setLoading] = useState(false)
   const [addNewUserModal, setAddNewUserModal] = useState(false)
   const [updateNewUserModal, setupdateNewUserModal] = useState(false)
   const [deleteUserModal, setdeleteUserModal] = useState(false)
  
 
   const [addNewUserDetail, setAddNewUserDetail] = useState({
     username: '',
     email: '',
     first_name: '',
     last_name: '',
     mobile_number: '',
   })
 
   const [updateUserDetail, setUpdateUserDetail] = useState({
     first_name: '',
     last_name: '',
     mobile_number: '',
   })
 

   
   const [openViewUserDialog, setOpenViewUserDialog] = useState(false)
   const [editUser, setEditUser] = useState(null)
   const [selectedUsers, setSelectedUsers] = useState(0)
   const [viewDetails, setViewDetails] = useState()
 
   useEffect(() => {
     const isLoggedInBool = localStorage.getItem("isLoggedIn")
     // conditional rendring
     // if(isLoggedInBool !== "true"){
     //   history.push("/signin")
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
             // history.push("/signin");
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
 
   /**
    * On Delete
    */
   const onDelete = (data) => {
     setdeleteUserModal(true)
     setSelectedUser(data)
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
 
   /**
    * Open Add New User Modal
    */
   const opnAddNewUserModal = (e) => {
     e.preventDefault()
     setAddNewUserModal(true)
   }
 
   const opnUpdateUserModal = (user) => {
     // e.preventDefault()
     // console.log("open update user modal function ran")
     setupdateNewUserModal(true)
     setAddNewUserDetail(user)
     setSelectedUser(user)
     // console.log("update user",user)
   }
 
   /**
    * On Change Add New User Details
    */
   const onChangeAddNewUserDetails = (key, value) => {
     setAddNewUserDetail({
       ...addNewUserDetail,
       [key]: value,
     })
   }
 
   /**
    * Add New User
    */
   const addNewUser = () => {
     const {username, email, first_name, last_name, mobile_number} = addNewUserDetail;
     let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
     let regexName = /^[a-zA-Z]{1,30}$/; // only alpha, no space, min-1, max-30
     let regexContact = /^\d{10}$/; // only number 0-9 length-10
 
     if (username !== '' && email !== '' && first_name !== '' && last_name !== '' && mobile_number !== '') {
       if(regexEmail.test(email.trim("")) === true){
         if(regexName.test(first_name.trim("")) === true){
           if(regexName.test(last_name.trim("")) === true){
             if(regexContact.test(mobile_number) === true){
               const accessToken = JSON.parse(localStorage.getItem('token'))
               if (accessToken !== null) {
                 addNewCustomer(accessToken, username.toLowerCase(), email.toLowerCase(), first_name, last_name, mobile_number,)
                   .then((res) => {
                     if (res?.status === 200) {
                       setAddNewUserModal(false)
                       setLoading(true)
 
                       setTimeout(() => {
                         setLoading(false)
                         getCustomersListData()
                         NotificationManager.success(res?.data?.message)
                       }, 2000)
 
                       setAddNewUserDetail({
                         username: '',
                         email: '',
                         first_name: '',
                         last_name: '',
                         mobile_number: '',
                       })
 
                       console.log('Response from addcustomer:', res)
                     }
                   })
                   .catch((err) => {
                     // console.log(err, "errorrr")
                     // console.log(err?.response, "errorrr resposne")
                     // console.log(err?.response?.data, "errorrr resposne")
 
                     if(err?.response?.status === 400){
                       let emailError = err?.response?.data?.email?.[0];
                       let userNameError = err?.response?.data?.username?.[0];
 
                       if(emailError && userNameError){
                         NotificationManager.error(emailError);
                         NotificationManager.error(userNameError);
                       } else if(emailError){
                         NotificationManager.error(emailError);
                       } else if(userNameError){
                         NotificationManager.error(userNameError);
                       }
                     } else if(err?.response?.status === 500){
                       NotificationManager.error("Internal server error !");
                     }
                   })
               }
             } else {
               NotificationManager.error('Mobile Number must be 10 digits!');
             }
           } else {
             NotificationManager.error('Last name must contain only alphabet and no spacings!');
           }
         } else {
           NotificationManager.error('First name must contain only alphabet and no spacings!');
         }   
       } else {
         NotificationManager.error('Invalid email address format!');
       }
     } else {
       NotificationManager.error('Please provide all customer details')
     }
   }
 
   /**
    * Update User
    */
   const updateUser = () => {
     // console.log('Edit user:', addNewUserDetail)
     const { first_name, last_name, mobile_number, id } = addNewUserDetail
     let regexName = /^[a-zA-Z]{1,30}$/; // only alpha, no space, min-1, max-30
     let regexContact = /^\d{10}$/; // only number 0-9 length-10
 
     if (first_name !== '' && last_name !== '' && mobile_number !== '') {
       if(regexName.test(first_name) === true){
         if(regexName.test(last_name) === true){
           if(regexContact.test(mobile_number) === true){
             const accessToken = JSON.parse(localStorage.getItem('token'))
             if (accessToken !== null) {
               updateCustomerDetails(accessToken,first_name, last_name, mobile_number, id)
                 .then((res) => {
                   if (res?.status === 200) {              
                     setupdateNewUserModal(false)
                     setLoading(true)
                     setTimeout(() => {
                       setLoading(false)
                       getCustomersListData();
                       NotificationManager.success('Updated user successfully!');
                     }, 2000)
                     setAddNewUserDetail({
                       username: '',
                       email: '',
                       first_name: '',
                       last_name: '',
                       mobile_number: '',
                     })
                     console.log('Response from updatecustomer:', res)
                   } else if (res?.status === 400) {
                     setAddNewUserModal(false)
                     NotificationManager.error(res?.data?.email, res?.data?.username)
                   } else {
                     setAddNewUserModal(false)
                     NotificationManager.error('Error while updating customer')
                   }
                 })
                 .catch((err) => {
                   NotificationManager.error('Error while updating customer')
                 })
             }
           } else {
             NotificationManager.error('Mobile Number must be 10 digits!');
           }
         } else {
           NotificationManager.error('Last name must contain only alphabet and no spacings!');
         }
       } else {
         NotificationManager.error('First name must contain only alphabet and no spacings!');
       }
     } else {
       NotificationManager.error('Please provide all customer details')
     }
   }
 
   const handleUpdateCancel = () => {
     setupdateNewUserModal(false)
     setAddNewUserDetail({
       username: '',
       email: '',
       first_name: '',
       last_name: '',
       mobile_number: '',
     })
   }
 
   // View User Details
   const viewUserDetail = (data) => {
     console.log('User information:', data)
     setOpenViewUserDialog(true)
     setSelectedUser(data)
   }
 
   /**
    * On Edit User
    */
   const onEditUser = (user) => {
     setupdateNewUserModal(true)
     setEditUser(user)
   }
 
   /**
    * On Add & Update User Modal Close
    */
   const onAddUpdateUserModalClose = () => {
     setAddNewUserModal(false)
     // setEditUser(null)
     setAddNewUserDetail({
       username: '',
       email: '',
       first_name: '',
       last_name: '',
       mobile_number: '',
     })
   }
 
   /**
    * On Update User Details
    */
   const onUpdateUserDetails = (key, value) => {
     setUpdateUserDetail({
       ...updateUserDetail,
       [key]: value,
     })
   }
 
 
   const handleSearchData = () => {
     // console.log("Search Text", searchText,filteredUsers)
     if (searchText) {
       const newData = users.filter(item => {
         const itemData = item.username ? item.username.toUpperCase() : ''.toUpperCase();
         const textData = searchText.toUpperCase();
         return itemData.indexOf(textData) > -1;
       });
       setFilteredUsers(newData);
       setSearchText('')
     } else {
       setFilteredUsers(users);
       // setsearch(text);
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
         title={<IntlMessages id="sidebar.usermangement" />}
         match={props.match}
       />
       <RctCollapsibleCard fullBlock>
         <div className="table-responsive">
           <div className="d-flex py-20 px-10 border-bottom" style={{justifyContent:'space-between'}}>
           <div className='search-row'>
               <input type="text" placeholder='Search' className='search-input py-2' style={{border:"none", borderBottom:"1px solid black"}} value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
               <Button variant="contained" color="primary" className="text-white mx-5"  style={{ cursor: "pointer"}}  onClick={getSearchedCustomerData}>Search</Button>
                 </div> 
         
                 <Button variant="contained" color="primary" className="text-white mx-5"  style={{ cursor: "pointer"}}   onClick={(e) => opnAddNewUserModal(e)}> <i className="zmdi zmdi-plus mx-2"></i>Users</Button>
 
                
               
           
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
                       {user?.phone ? user?.phone : '-'}
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
         {loading && <RctSectionLoader />}
       </RctCollapsibleCard>
 
       {/* Modal for Add New Customer */}
       <Modal
         isOpen={addNewUserModal}
         toggle={() => onAddUpdateUserModalClose()}
         className="addCustomerModal "
         
       >
         <ModalHeader toggle={() => onAddUpdateUserModalClose()}>
           <strong>Welcome</strong>
         </ModalHeader>
         <ModalBody>
           <AddNewUserForm
             addNewUserDetails={addNewUserDetail}
             onChangeAddNewUserDetails={onChangeAddNewUserDetails}
           />
         </ModalBody>
         <ModalFooter style={{display:"flex", justifyContent:"space-between", padding:"20px 50px"}}>
 
           <Button variant="contained" color="primary" onClick={() => addNewUser()} className="py-2" style={{ color:"#fff",}} >
               Send
           </Button>
           <Button variant="contained"  onClick={() => onAddUpdateUserModalClose()} className="py-2 px-3 bg-danger text-white" style={{ cursor:"pointer"}}>
               Cancel
           </Button>
         </ModalFooter>
       </Modal>
 
       {/* Modal for update customer */}
       <Modal
         isOpen={updateNewUserModal}
         className="addCustomerModal"
       >
         <ModalHeader toggle={() => setupdateNewUserModal(false)}>
           Update Customer
         </ModalHeader>
         <ModalBody>
          
           <Form>
             <FormGroup>
               <Label for="firstName">First Name</Label>
               <Input
                 type="text"
                 name="firstName"
                 id="firstName"
                 placeholder="Enter First Name"
                 value={addNewUserDetail.first_name}
                  onChange={(e) => onChangeAddNewUserDetails('first_name', e.target.value)}
               />
             </FormGroup>
             <FormGroup>
               <Label for="lastName">Last Name</Label>
               <Input
                 type="text"
                 name="lastName"
                 id="lastName"
                 placeholder="Enter Last Name"
                  value={addNewUserDetail.last_name}
                  onChange={(e) => onChangeAddNewUserDetails('last_name', e.target.value)}
               />
             </FormGroup>
             <FormGroup>
               <Label for="Contact">Contact Number</Label>
               <Input
                 type="number"
                 name="mobile"
                 id="mobile"
                 placeholder="Enter Contact Number"
                  value={addNewUserDetail.mobile_number}
                  onChange={(e) => onChangeAddNewUserDetails('mobile_number', e.target.value)}
               />
             </FormGroup>
           </Form>
         </ModalBody>
         <ModalFooter>
           <Button
             variant="contained"
             style={{backgroundColor: "#0b3d45", color:"#fff", borderRadius: "6px"}} 
             className="text-white"
             onClick={updateUser}
           >
             Update
           </Button>
 
           <Button
             variant="contained"
             className="text-white btn-secondary"
             onClick={handleUpdateCancel}
           >
             Cancel
           </Button>
         </ModalFooter>
       </Modal>
 
       <Modal
         isOpen={deleteUserModal}
         className="addCustomerModal"
       >
         <ModalBody>
           Are you sure want to delete {selectedUser?.username} ?
         </ModalBody>
         <ModalFooter>
           <Button
             variant="contained"
             // color="primary"
             style={{backgroundColor: "#0b3d45", color:"#fff", borderRadius: "6px"}} 
             className="text-white"
            //  onClick={handleDeleteUser}
           >
             Delete
           </Button>
 
           <Button
             variant="contained"
             className="text-white btn-secondary"
             onClick={() => setdeleteUserModal(false)}
           >
             Cancel
           </Button>
         </ModalFooter>
       </Modal>
 
       <Dialog
         onClose={() => setOpenViewUserDialog(false)}
         open={openViewUserDialog}
       >
         <DialogContent className="view_profile">
           {selectedUser !== null && (
             <div>
               <div className="clearfix">
                 <div className="media pull-left">
                   <div className="media-body">
                     <div>
                       <p>Username : </p>
                       <span className="fw-bold">{selectedUser.username}</span>
                     </div>
                     <div>
                       <p>First Name : </p>
                       <span className="fw-bold">{selectedUser.first_name}</span>
                     </div>
                     <div>
                       <p>Last Name : </p>
                       <span className="fw-bold">{selectedUser.last_name}</span>
                     </div>
 
                     <div>
                       <p>Email : </p>
                       <span className="fw-bold">{selectedUser.email}</span>
                     </div>
                     <div>
                       <p>Contact Number : </p>
                       <span className="fw-bold">
                         {selectedUser.mobile_number}
                       </span>
                     </div>
 
                     <div>
                       <p>User Type : </p>
                       <span className="badge badge-warning">
                         {selectedUser.user_type}
                       </span>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           )}
         </DialogContent>
       </Dialog>
     </div>
   )
 }
 