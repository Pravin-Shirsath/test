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
  getViewProjectDatasets
} from '../../../Api/'


export default function ViewProject(props) {
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


  const [datasets, setDatasets] = useState([]);
  const [filteredDatasets,setFilteredDatasets] = useState([])

  useEffect(() => {
    const isLoggedInBool = localStorage.getItem("isLoggedIn")
    // conditional rendring
    // if(isLoggedInBool !== "true"){
    //   history.push("/login")
    //     localStorage.clear();
    // } else {
    // getCustomersListData();
    getViewProjectData();
    // }
  }, [])

  const getViewProjectData = () => {
    const authToken = JSON?.parse(localStorage.getItem("token"));
    const projectId = localStorage?.getItem("projId")

    if(authToken !== null){
      getViewProjectDatasets(authToken, projectId)
      .then(res => {
        if(res?.status == 200){
          // console.log(res?.data?.results)
          setDatasets(res?.data?.results)
          setFilteredDatasets(res?.data?.results);
        } else {
          console.log('Response from View project Datasets lists api:', res)
        }
      })
    }
  }


  const handlePageChange = (pageNumber) => {
    // console.log("pagination", pageNumber)
    // if (activePage !== pageNumber) {
    //   const accessToken = JSON.parse(localStorage.getItem('token'))
    //   if (accessToken !== null) {
    //     getCompanyUserList(accessToken, pageNumber)
    //       .then((res) => {
    //         if (res?.status === 200) {
    //           setUsers(res?.data?.results);
    //           setFilteredUsers(res?.data?.results);
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

  const handleView = () => {
    history.push("/app/dashboard/createTask")
  }

  console.log(filteredDatasets, "filteredd datasets")
  return (
    <div className="user-management">
      <Helmet>
        <title>Automaton | Customers List</title>
        <meta name="description" content="Automaton Widgets" />
      </Helmet>
      <PageTitleBar
        title={<IntlMessages id="sidebar.viewProject" />}
        match={props.match}
      />
      <RctCollapsibleCard fullBlock>
     
        <div className="table-responsive">
          <div className="d-flex py-20 px-10 border-bottom" style={{ justifyContent: 'space-between' }}>
            <div className='search-row'>
              <input type="text" placeholder='Search' className='search-input py-2' style={{ border: "none", borderBottom: "1px solid black" }} value={searchText} onChange={(e) => setSearchText(e.target.value)} />
              <Button variant="contained" color="primary" className="text-white mx-5" style={{ cursor: "pointer" }} 
              // onClick={getSearchedCustomerData}
              >Search</Button>
            </div>

            <Button variant="contained" color="primary" className="text-white mx-5" style={{ cursor: "pointer" }} onClick={()=> history.push("/app/dashboard/createDataset")}>Create Dataset</Button>




          </div>
          <table className="table table-middle table-hover mb-0">
            <thead>
              <tr>
                <th></th>
                <th>Project ID</th>
                <th>Dataset Name</th>
                <th>Date Created</th>
                <th>Actions</th>
              </tr>
            </thead>

            {/****** mine filtered Table body, without ternary conditional value  *****/}
            <tbody>
              {filteredDatasets &&
                filteredDatasets.map((dataset, i, data) => {
                  // let active = user?.is_active
                  return (

                    <tr key={i}>
                      <td></td>
                      <td>{dataset?.project_id}</td>
                      <td>
                        <div className="media">
                          <div className="media-body">
                            <h5 className="mb-5 fw-bold">{dataset?.dataset_name}</h5>
                          </div>
                        </div>
                      </td>
                      <td>{dataset?.date_created ? dataset?.date_created : '-'}</td>
                      <td className="list-action">
                      <button
                        type="button"
                        className="rct-link-btn"
                        onClick={() => handleView()}
                      >
                        <i className="ti-eye"></i>
                      </button>
                      <button
                        type="button"
                        className="rct-link-btn"

                      >
                        <i className="ti-pencil"></i>
                      </button>
                      <button
                        type="button"
                        className="rct-link-btn"
                      >
                        <i className="ti-close"></i>
                      </button>
                    </td>
                    </tr>
                  )
                })

              }

            </tbody>

          </table>
          {filteredDatasets.length == 0 && <center style={{ color: "black" }}>  Data not available </center>}
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
        // toggle={() => onAddUpdateUserModalClose()}
        className="addCustomerModal "

      >
        <ModalHeader 
        // toggle={() => onAddUpdateUserModalClose()}
        >
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

          <Button variant="contained" color="primary"
          // onClick={() => addNewUser()} 
          className="py-2 mx-10" style={{ color: "#fff", }} >
            Send
          </Button>
          <Button variant="contained"
          // onClick={() => onAddUpdateUserModalClose()} 
          className="py-2 px-3 bg-danger text-white mx-10" style={{ cursor: "pointer" }}>
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
