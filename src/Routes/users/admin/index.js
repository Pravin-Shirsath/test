/**
 * User Management Page
 */
import React, { useEffect, useState, useRef } from 'react'
import '../../../Assets/css/main.css';
import { Helmet } from 'react-helmet'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Badge,
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
import AddNewAdminForm from './AddNewAdminForm'
// update user form
import UpdateAdminForm from './UpdateAdminForm'
// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar'
// intl messages
import IntlMessages from 'Util/IntlMessages'
// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard'
// rct section loader
import RctSectionLoader from 'Components/RctSectionLoader/RctSectionLoader'
import '../../../Assets/css/user.css'
import { addNewAdmin, getAdminList, deleteAdminDetails, updateAdminDetails, getSearchedAdmin, viewAdminDetails } from '../../../Api'
import { first } from '@amcharts/amcharts4/.internal/core/utils/Array'
import { VpnLockSharp } from '@material-ui/icons'

export default function UserProfile(props) {
  const history = useHistory();
  const deleteConfirmationDialog = useRef()
  const [users, setUsers] = useState(null)
  const [filteredUsers, setFilteredUsers] = useState()
  
  const [selectedUser, setSelectedUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [addNewUserModal, setAddNewUserModal] = useState(false)
  const [updateNewUserModal, setupdateNewUserModal] = useState(false)
  const [searchText, setSearchText] = useState('');
  const [activePage , setActivePage] = useState(1)
  const [totalPageCount, setTotalPageCount] = useState('');
  const [deleteUserModal, setdeleteUserModal] = useState(false)

  const [addNewUserDetail, setAddNewUserDetail] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    mobile_number: '',
  })

  const [updateUserDetail, setUpdateUserDetail] = useState({
    firstname: '',
    lastname: '',
    mobilenumber: '',
  })

  const [openViewUserDialog, setOpenViewUserDialog] = useState(false)
  const [editUser, setEditUser] = useState(null)
  const [selectedUsers, setSelectedUsers] = useState(0);
  const [viewDetails, setViewDetails] = useState();

  useEffect(() => {
    const isLoggedInBool = localStorage.getItem("isLoggedIn")
  // conditional rendring
    // if(isLoggedInBool !== "true"){
    //   history.push("/signin")
    //   localStorage.clear();
    // } else {
      getAdminsListData();
    // }
  }, [])

  const getAdminsListData = () => {
    const accessToken = JSON.parse(localStorage.getItem('token'))
    if (accessToken !== null) {
      getAdminList(accessToken, activePage)
        .then((res) => {
          if (res?.status === 200) {
            setUsers(res?.data?.results);
            setFilteredUsers(res?.data?.results);
            setTotalPageCount(parseInt(res?.data?.count));
            // console.log('Response from adminlist :', res)
          } else {
            // console.log('Response from adminlist:', res)
          }
        })
        .catch((err) => {
          // console.log("status of invalid token", err?.response?.data, err?.response?.status)
          if(err?.response?.status == 401){
          //  conditional rendring
            // localStorage.clear();
            // history.push("/signin")


            // window.location.reload()
          } else {
            // console.log('Response from adminlist:', err)
          }
        })
    }
  }

  // function for handling search
  const getSearchedCustomerData = () => {
    const accessToken = JSON.parse(localStorage.getItem('token'))
    if (accessToken !== null) {
      getSearchedAdmin(accessToken, searchText)
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
  

  // Handle pagination
  const handlePageChange = (pageNumber) => {
    // console.log("pagination", pageNumber)
        if (activePage !== pageNumber) {
        const accessToken = JSON.parse(localStorage.getItem('token'))
        if (accessToken !== null) {
          getAdminList(accessToken, pageNumber)
            .then((res) => {
              if (res?.status === 200) {
                setUsers(res?.data?.results);
                setFilteredUsers(res?.data?.results);
                setTotalPageCount(res?.data?.count);
                // console.log('Response from adminlist :', res)
              } else {
                // console.log('Response from adminlist:', res)
              }
            })
            .catch((err) => {
              // console.log('Response from adminlist:', err)
            })
        }
      
      setActivePage(pageNumber)
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

  /**
  * On Delete
  */
  const onDelete = (data) => {
    setdeleteUserModal(true)
    setSelectedUser(data)
  }

  /**
   * Delete User Permanently
   */
  const deleteUserPermanently = () => {
    let allUsers = users
    let indexOfDeleteUser = allUsers.indexOf(selectedUser)
    allUsers.splice(indexOfDeleteUser, 1)
    deleteConfirmationDialog.current.close()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setUsers(allUsers)
      setSelectedUser(null)
      NotificationManager.success('User Deleted!')
    }, 2000)
  }

  // API Call For delete User
  const handleDeleteUser = () => {
    const { id } = selectedUser

    const accessToken = JSON.parse(localStorage.getItem('token'))
    if (accessToken !== null) {
      deleteAdminDetails(accessToken, id)
        .then((res) => {
          if (res?.status === 200) {
            setdeleteUserModal(false)
            setLoading(true)
            // console.log('Response', res)
            setTimeout(() => {
              setLoading(false);
              getAdminsListData();
              NotificationManager.success('User successfully deleted !! ')
            }, 2000)
          } else if (res?.status === 400) {
            setdeleteUserModal(false)
            NotificationManager.error('Error while deleting customer')
          } else {
            setdeleteUserModal(false)
            NotificationManager.error('Error while deleting customer')
          }
        })
        .catch((err) => {
          setdeleteUserModal(false)
          NotificationManager.error('Error while deleting customer')
        })
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
    // console.log(user, "user in opnUpdateUserModal")
    setupdateNewUserModal(true)
    setAddNewUserDetail(user)
    // setUpdateUserDetail(user)
    setSelectedUser(user)
    // console.log("update user", selectedUser)
  }


  /**
   * On Reload
   */
  const onReload = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }

  /**
   * On Select User
   */
  const onSelectUser = (user) => {
    user.checked = !user.checked
    let selectedUsers = 0
    let allUsers = users.map((userData) => {
      if (userData.checked) {
        selectedUsers++
      }
      if (userData.id === user.id) {
        if (userData.checked) {
          selectedUsers++
        }
        return user
      } else {
        return userData
      }
    })
    setUsers(allUsers)
    setSelectedUser(selectedUsers)
  }

  /**
   * On Change Add New User Details (working)
   */
  const onChangeAddNewUserDetails = (key, value) => {
    setAddNewUserDetail({
      ...addNewUserDetail,
      [key]: value,
    })
  }

  /**
   * Add New Admin
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
                addNewAdmin(accessToken, username.toLowerCase(), email.toLowerCase(), first_name, last_name, mobile_number)
                  .then((res) => {
                    if (res?.status === 200) {
                      setAddNewUserModal(false)
                      setLoading(true)

                      setTimeout(() => {
                        setLoading(false)
                        getAdminsListData()
                        NotificationManager.success(res?.data?.message)
                      }, 2000)
                      
                      setAddNewUserDetail({
                        username: '',
                        email: '',
                        first_name: '',
                        last_name: '',
                        mobile_number: '',
                      })

                      // console.log('Response from addcustomer:', res)
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

  // Update user functionality
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
              updateAdminDetails(accessToken,first_name, last_name, mobile_number, id)
                .then((res) => {
                  if (res?.status === 200) {              
                    setupdateNewUserModal(false)
                    setLoading(true)
                    setTimeout(() => {
                      setLoading(false)
                      getAdminsListData();
                      NotificationManager.success('Updated user successfully!');
                    }, 2000)
                    setAddNewUserDetail({
                      username: '',
                      email: '',
                      first_name: '',
                      last_name: '',
                      mobile_number: '',
                    })
                    // console.log('Response from updatecustomer:', res)
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



  // View User Details
  const viewUserDetail = (data) => {
    // console.log('User information:', data)
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
    setEditUser(null)
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
    setEditUser({
      ...editUser,
      [key]: value,
    })
  }
 
  // console.log(addNewUserDetail, "add new user detail in form")
  // console.log(users, 'usersss')
  // console.log(updateUserDetail, "updaate userr detailll")
  return (
    <div className="user-management">
      <Helmet>
        {/* <title>Automaton | Users Management</title> */}
        <title>Automaton | Admins List</title>
        <meta name="description" content="Automaton Widgets" />
      </Helmet>
      <PageTitleBar
        title={<IntlMessages id="sidebar.adminManagement" />}
        match={props.match}
      />
      <RctCollapsibleCard fullBlock>
        <div className="table-responsive">
          <div className="d-flex py-20 px-10 border-bottom" style={{justifyContent:'space-between'}}>
              <div className='search-row'>
                  <input type="text" placeholder='Search' className='search-input py-2' style={{border:"none", borderBottom:"1px solid black"}} value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
                 

                  <button style={{backgroundColor: "#0b3d45", color:"#fff", borderRadius: "6px", cursor: "pointer"}} className='btn-block py-2 m-auto' onClick={getSearchedCustomerData}>Search</button>
              </div>  
              
                <button
                  onClick={(e) => opnAddNewUserModal(e)}
                  style={{backgroundColor: "#0b3d45", color:"#fff", borderRadius: "6px", cursor: "pointer"}} 
                  className='py-2 px-2'
                >
                  <i className="zmdi zmdi-plus"></i> Add New Admin
                </button>
             
          </div>
          <table className="table table-middle table-hover mb-0">
            <thead>
              <tr>
                <th></th>
                <th>Username</th>
                <th>Email Address</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Contact Number</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {filteredUsers &&
                filteredUsers.map((user, id) => (
                  <tr key={id}>
                    <td></td>
                    <td>
                      <div className="media">
                        <div className="media-body">
                          <h5 className="mb-5 fw-bold">{user?.username}</h5>
                        </div>
                      </div>
                    </td>
                    <td>{user?.email ? user?.email : '-'}</td>
                    <td>{user?.first_name}</td>
                    <td>{user?.last_name}</td>
                    <td style={{ padding: '0px 45px' }}>
                      {user?.mobile_number ? user?.mobile_number : '-'}
                    </td>

                    <td className="list-action">
                      <button
                        type="button"
                        className="rct-link-btn"
                        onClick={() => viewUserDetail(user)}
                      >
                        <i className="ti-eye"></i>
                      </button>
                      <button
                        type="button"
                        className="rct-link-btn"
                        onClick={() => opnUpdateUserModal(user)}
                      >
                        <i className="ti-pencil"></i>
                      </button>
                      <button
                        type="button"
                        className="rct-link-btn"
                        onClick={() => onDelete(user)}
                      >
                        <i className="ti-close"></i>
                      </button>
                    </td>
                  </tr>
                ))}
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
      <DeleteConfirmationDialog 
        ref={deleteConfirmationDialog}
        title="Are You Sure Want To Delete?"
        message="This will delete user permanently."
        onConfirm={() => deleteUserPermanently()}
      />

      {/* Modal for add new admin */}
      <Modal
        isOpen={addNewUserModal}
        toggle={() => onAddUpdateUserModalClose()}
        className="addCustomerModal"
      >
        <ModalHeader toggle={() => onAddUpdateUserModalClose()}>
          Add New Admin
        </ModalHeader>
        <ModalBody>
          {editUser === null ? (
            <AddNewAdminForm
              addNewUserDetails={addNewUserDetail}
              onChangeAddNewUserDetails={onChangeAddNewUserDetails}
            />
          ) : (
            <UpdateAdminForm
              user={editUser}
              onUpdateUserDetail={onUpdateUserDetails}
            />
          )}
        </ModalBody>
        <ModalFooter>
          {editUser === null ? (
            <Button
              variant="contained"
              style={{backgroundColor: "#0b3d45", color:"#fff", borderRadius: "6px"}} 
              // className="text-white addBtn"
              onClick={() => addNewUser()}
            >
              Add
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              className="text-white"
              onClick={() => updateUser()}
            >
              Update
            </Button>
          )}
          <Button
            variant="contained"
            className="text-white btn-secondary"
            onClick={() => onAddUpdateUserModalClose()}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      {/* Modal for update admin */}
      <Modal
        isOpen={updateNewUserModal}
        className="addCustomerModal"
      >
        <ModalHeader toggle={() => setupdateNewUserModal(false)}>
          Update Admin
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
            // color="primary"
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

      
      {/* Modal for delete admin */}
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
            onClick={handleDeleteUser}
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

