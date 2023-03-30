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
  Col
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
  getCompanyUserList,
  deleteCustomerDetails,
  updateCustomerDetails,
  getSearchedCustomer,
  getsearchCompanyUser,
  CustomerDisable,
  CustomerEnable,
  AddUserIn_Company,

} from '../../../Api/'


export default function UserManagement(props) {
  const history = useHistory();
  const deleteConfirmationDialog = useRef()
  //  const [users, setUsers] = useState() // use when data is coming from api
  const [users, setUsers] = useState([])
  //  const [filteredUsers, setFilteredUsers] = useState() // use when the data is coming fom api
  const [filteredUsers, setFilteredUsers] = useState([])
  const [searchText, setSearchText] = useState('');
  const [activePage, setActivePage] = useState(1)
  const [totalPageCount, setTotalPageCount] = useState('');

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
 
  const [selectedUser, setSelectedUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [addNewUserModal, setAddNewUserModal] = useState(false)
  const [updateNewUserModal, setupdateNewUserModal] = useState(false)
  const [deleteUserModal, setdeleteUserModal] = useState(false)



  const [editUser, setEditUser] = useState(null)
  const [selectedUsers, setSelectedUsers] = useState(0)
  const [viewDetails, setViewDetails] = useState()

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
      getCompanyUserList(accessToken, activePage)
        .then((res) => {
          if (res?.status === 200) {
            setUsers(res?.data?.results);
            setFilteredUsers(res?.data?.results);
            setTotalPageCount(parseInt(res?.data?.count));
            console.log('Response from customerlist :', res)
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



  const getSearchedCustomerData = () => {
    const accessToken = JSON.parse(localStorage.getItem('token'))
    if (accessToken !== null) {
      getsearchCompanyUser(accessToken, searchText)
        .then((res) => {
          console.log('Response from search company user :', res)

          if (res?.status === 200 && res?.data?.results.length > 0) {
            setFilteredUsers(res?.data?.results);
            setSearchText('')
            console.log('Response from search company user :', res)
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
  const handleToggleUser = (user, e) => {


    const accessToken = JSON.parse(localStorage.getItem('token'))
    if (accessToken !== null) {

      if (user?.is_active) {

        CustomerDisable(accessToken, user.id)
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
      } else {

        CustomerEnable(accessToken, user.id)
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


  /**
   * Add New User
   */
  const addNewUser = () => {
    //  const {username, email, first_name, last_name, mobile_number} = addNewUserDetail;
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const regexName = /^[a-zA-Z]{1,30}$/; // only alpha, no space, min-1, max-30
    let regexContact = /^\d{10}$/; // only number 0-9 length-10
     
    if(username != ""  && email != "" ){
   

     if( regexName.test(username.trim(""))){
      if( regexEmail.test(email.trim(""))){
        const accessToken = JSON.parse(localStorage.getItem('token'))
        if (accessToken !== null) {
          AddUserIn_Company(accessToken, email,username)
            .then((res) => {
             
              console.log('Response from create in company :', res)
    
              if (res?.status === 200 ) {
                NotificationManager.success(res?.data?.message)
                getCustomersListData()
              } else {
               
                NotificationManager.error("!")
              }
            })
            .catch((err) => {
              console.log("Add userIN company", err?.response);
                  const emailErr = err?.response?.data?.email
                  const usernameErr = err?.response?.data?.username

                  if (emailErr != undefined) {

                     NotificationManager.error(emailErr[0]);
                  }
                  if (usernameErr != undefined) {

                     NotificationManager.error(usernameErr[0]);
                  }
            })
        }
          


      }else{
       NotificationManager.error('Enter valid email address')
      }
    }else{
     NotificationManager.error('User name must contain only  alpha-numeric character and no spacings!')
    }

    }else{
      NotificationManager.error('username and email required')
    }
  }




  const onAddUpdateUserModalClose = () => {
    setAddNewUserModal(false)
    setUsername("")
     setEmail("")
  }



  const handlePageChange = (pageNumber) => {
    // console.log("pagination", pageNumber)
    if (activePage !== pageNumber) {
      const accessToken = JSON.parse(localStorage.getItem('token'))
      if (accessToken !== null) {
        getCompanyUserList(accessToken, pageNumber)
          .then((res) => {
            if (res?.status === 200) {
              setUsers(res?.data?.results);
              setFilteredUsers(res?.data?.results);
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
          <div className="d-flex py-20 px-10 border-bottom" style={{ justifyContent: 'space-between' }}>
            <div className='search-row'>
              <input type="text" placeholder='Search' className='search-input py-2' style={{ border: "none", borderBottom: "1px solid black" }} value={searchText} onChange={(e) => setSearchText(e.target.value)} />
              <Button variant="contained" color="primary" className="text-white mx-5" style={{ cursor: "pointer" }} onClick={getSearchedCustomerData}>Search</Button>
            </div>

            <Button variant="contained" color="primary" className="text-white mx-5" style={{ cursor: "pointer" }} onClick={(e) => opnAddNewUserModal(e)}> <i className="zmdi zmdi-plus mx-2"></i>Users</Button>




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
                filteredUsers.map((user, i, data) => {
                  let active = user?.is_active
                  return (

                    <tr key={i}>
                      <td></td>
                      <td>{user?.id}</td>
                      <td>
                        <div className="media">
                          <div className="media-body">
                            <h5 className="mb-5 fw-bold">{user?.username}</h5>
                          </div>
                        </div>
                      </td>
                      <td>{user?.email ? user?.email : '-'}</td>
                      <td>
                        {user?.phone ? user?.phone : '-'}
                      </td>

                      <td className="list-action" style={{ display: "flex", gap: "3px" }}>

                        <Switch
                          onClick={() => handleToggleUser(user)}
                          on={active}
                          className={user?.is_active == true ? "bg-primary" : "bg-danger"}
                        />

                      </td>
                    </tr>
                  )
                })

              }

            </tbody>

          </table>
          {filteredUsers.length == 0 && <center style={{ color: "black" }}>  Data not available </center>}
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
          <FormGroup row >


            <Col sm={12} className="d-flex  align-items-center justify-content-center">
              <Label for="firstName" sm={3} className="d-flex primary-dark">

                <span> Username <span className="text-danger madatory-field">*</span></span>
              </Label>
              <Input
                type="text"
                className="input-md"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sm={10}
              />
            </Col>


          </FormGroup>
          <FormGroup row >


            <Col sm={12} className="d-flex  align-items-center justify-content-center">
              <Label for="firstName" sm={3} className="d-flex primary-dark">

                <span> Email Id <span className="text-danger madatory-field">*</span></span>
              </Label>
              <Input
                type="text"
                className="input-md" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sm={10}
              />
            </Col>


          </FormGroup>
        </ModalBody>
        <div style={{ display: "flex", justifyContent: "end" }}>

          <Button variant="contained" color="primary" onClick={() => addNewUser()} className="py-2 mx-10" style={{ color: "#fff", }} >
            Send
          </Button>
          <Button variant="contained" onClick={() => onAddUpdateUserModalClose()} className="py-2 px-3 bg-danger text-white mx-10" style={{ cursor: "pointer" }}>
            Cancel
          </Button>
        </div>
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
            style={{ backgroundColor: "#0b3d45", color: "#fff", borderRadius: "6px" }}
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










    </div>
  )
}
