/**
 * User Management Page
 */
import React, { useEffect, useState, useRef } from 'react'
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

// imports for the model update popup modal window
import { TextField, DialogActions, DialogContentText, DialogTitle } from '@material-ui/core';

// import for loader spinner
import { RotatingLines } from 'react-loader-spinner'

import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import { NotificationManager } from 'react-notifications'
import Pagination from "react-js-pagination";

import { Link, useHistory } from 'react-router-dom';

// delete confirmation dialog
import DeleteConfirmationDialog from 'Components/DeleteConfirmationDialog/DeleteConfirmationDialog'
// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar'
// intl messages
import IntlMessages from 'Util/IntlMessages'
// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard'
// rct section loader
import RctSectionLoader from 'Components/RctSectionLoader/RctSectionLoader'
import '../../../Assets/css/user.css';
import '../../../Assets/css/main.css';

import { useCSVReader, jsonToCSV } from 'react-papaparse';

import { getModalList, deleteModal, updateDataModal, getSearchedModal, plotGraph } from '../../../Api'

import { first } from '@amcharts/amcharts4/.internal/core/utils/Array'
import { VpnLockSharp } from '@material-ui/icons'
import Papa from "papaparse";

export default function UserProfile(props) {
  const history = useHistory();
  const [selectedUser, setSelectedUser] = useState(null)
  const [loading, setLoading] = useState(false)

  const [searchText, setSearchText] = useState('');

  const [deleteUserModal, setdeleteUserModal] = useState(false)

  const [modalListData, setModalListData] = useState(null);
  const [filteredModel, setFilteredModel] = useState([])
  const [selectedModal, setSelectedModal] = useState(null);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState('');


  const [options, setOptions] = useState();
  const [timeVariable, setTimeVariable] = useState();
  const [dependentVariable, setDependentTimeVariable] = useState();
  const [promotionalDrivers, setPromotionalDrivers] = useState([]);
  const [nonPromotionalDrivers, setNonPromotionalDrivers] = useState([]);
  const [csvFile, setCSVFile] = useState();

  // state used for countdown timer modal
  const [openLoding, setOpenLoading] = useState(false);

  useEffect(() => {
    const isLoggedInBool = localStorage.getItem("isLoggedIn")
    // if (isLoggedInBool !== "true") {
    //   history.push("/signin")
    //   localStorage.clear();
    // } else {
      getModalListData();
    // }
  }, [])

  // Get modal list data
  const getModalListData = () => {
    const accessToken = JSON.parse(localStorage.getItem('token'))

    if (accessToken !== null) {
      getModalList(accessToken, activePage)
        .then((res) => {
          if (res?.status === 200) {
            setModalListData(res?.data?.results);
            setFilteredModel(res?.data?.results);
            setTotalPageCount(parseInt(res?.data?.count));
            // console.log('Response from modalList :', res)
          } else {
            // console.log('Response from modallist:', res)
          }
        })
        .catch((err) => {
          // console.log("status of invalid token", err?.response?.data, err?.response?.status)
          if (err?.response?.status == 401) {
          // conditional rendring

            // localStorage.clear();
            // history.push("/signin");


            // window.location.reload();
          } else {
            // console.log('Response from modallist:', err)
          }
        })
    }
  }



  const updateModal = () => {

    const { id } = selectedModal;

    // console.log("options:", id, options, timeVariable, dependentVariable, promotionalDrivers, nonPromotionalDrivers, csvFile)
    const accessToken = JSON.parse(localStorage.getItem('token'));
    if (accessToken !== null) {
      // console.log(" accessToken", accessToken)

      if (timeVariable && dependentVariable && promotionalDrivers.length > 0 && nonPromotionalDrivers.length > 0) {
        updateDataModal(id, accessToken, options, timeVariable, dependentVariable, promotionalDrivers, nonPromotionalDrivers, csvFile)
          .then((res) => {
            if (res?.status === 200) {
              NotificationManager.success('Model created successfully!!');
              setOptions();
              setTimeVariable();
              setDependentTimeVariable();
              setPromotionalDrivers();
              setNonPromotionalDrivers();
              setCSVFile();
              getModalListData();
              setOpenUpdateModal(false);
              // console.log("Response from create modal", res);
            }
            else {
              NotificationManager.error('Error while creating a model');
            }
          }).catch(err => {
            NotificationManager.error('Error while creating a model');
            // console.log(" ERR Response from create modal", err)

          });
      } else {
        NotificationManager.error("All fields must be selected!")
      }

    }
  }

  // API call for delete modal
  const handleDeleteModal = () => {
    const { id } = selectedModal;

    const accessToken = JSON.parse(localStorage.getItem('token'))
    if (accessToken !== null) {
      deleteModal(accessToken, id)
        .then((res) => {
          if (res?.status === 200) {
            setdeleteUserModal(false);
            setLoading(true)
            // console.log('Response', res)
            setTimeout(() => {
              setLoading(false);
              getModalListData();
              setOpenUpdateModal(false);
              NotificationManager.success('Modal successfully deleted !! ')
            }, 2000)
          } else if (res?.status === 400) {
            setdeleteUserModal(false)
            NotificationManager.error('Error while deleting model')
          } else {
            setdeleteUserModal(false)
            NotificationManager.error('Error while deleting model')
          }
        })
        .catch((err) => {
          setdeleteUserModal(false)
          NotificationManager.error('Error while deleting model')
        })
    }
  }

  // function for handling search
  const getSearchedModalData = () => {
    const accessToken = JSON.parse(localStorage.getItem('token'))
    if (accessToken !== null) {
      getSearchedModal(accessToken, searchText)
        .then((res) => {
          if (res?.status === 200 && res?.data?.results.length > 0) {
            setFilteredModel(res?.data?.results);
            setSearchText('')
            // console.log('Response from modalsearchlist :', res)
          } else {
            // console.log('Response from modalsearchlist:', res)
            setModalListData(modalListData);
            setSearchText('');
            NotificationManager.error("No data found!")
          }
        })
        .catch((err) => {
          // console.log('Response from modalsearchlist:', err)
        })
    }
  }


  // Handle pagination
  const handlePageChange = (pageNumber) => {
    // console.log("pagination", pageNumber)
    if (activePage !== pageNumber) {
      const accessToken = JSON.parse(localStorage.getItem('token'))
      if (accessToken !== null) {
        getModalList(accessToken, pageNumber)
          .then((res) => {
            if (res?.status === 200) {
              setModalListData(res?.data?.results);
              setFilteredModel(res?.data?.results);
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


  const opnUpdateModelModal = (model) => {
    // console.log(model, "selected model for update !!")
    setOpenUpdateModal(true)
    setSelectedModal(model)
  }


  const onViewGraph = (model) => {
    const selectedModalRefNo = model?.ref_no
    const accessToken = JSON.parse(localStorage.getItem('token'))

    // console.log(selectedModalRefNo)
    handleClickOpenLoadingBox();
    plotGraph(accessToken, selectedModalRefNo)
      .then(res => {
        handleCloseLoadingBox();
        history.push('/app/dashboard/saas');
        // console.log("res from plot graph on view click", res.data);
        localStorage.setItem("graphData", JSON.stringify(res.data))
      })
      .catch(err => {
        // console.log("res from plot graph on view click", err);
        NotificationManager.error(err?.response?.data?.ref_no?.[0])
        handleCloseLoadingBox();
      })
  }


  /**
  * On Delete
  */
  const onDelete = (data) => {
    setdeleteUserModal(true)
    setSelectedModal(data);
  }

  const handleOpenModal = (data) => {
    setOpenUpdateModal(true);
    setSelectedModal(data);

  };

  const handleCloseModal = () => {
    setOpenUpdateModal(false);
  };

  // Handling multiple select for promotional driver
  const handlePromotonalDriver = (e) => {
    setPromotionalDrivers(Array.from(e.target.selectedOptions, (option) => option.value));
  }

  // Handling multiple select for non-promotional driver
  const handleNonPromotonalDriver = (e) => {
    setNonPromotionalDrivers(Array.from(e.target.selectedOptions, (option) => option.value));
  }

  // functions for opening and closing of loading modal box
  const handleClickOpenLoadingBox = () => {
    setOpenLoading(true);
  };

  const handleCloseLoadingBox = (event, reason) => {
    if (reason && reason == "backdropClick" || reason && reason == "escapeKeyDown")
      return;
    setOpenLoading(false)
  };



  const changeHandler = (event) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    // console.log("file", event.target.files[0])
    setCSVFile(event.target.files[0]);
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        // console.log("parsed Data", results.data, results?.meta?.fields)
        setOptions(results?.meta?.fields)
      },
    });
  };

  // console.log(modalListData, "modalll lisstt dataaa")
  // console.log(filteredModel, "filtreddd modeellll")
  // console.log(searchText, "Search texxttt of model")
  // console.log(selectedModal, "selected modaaallll")
  // console.log(options, "optionssss")
  return (
    <div className="user-management">
      <Helmet>
        <title>Automaton | Existing Model</title>
        <meta name="description" content="Automaton Widgets" />
      </Helmet>
      <PageTitleBar
        title={<IntlMessages id="sidebar.modal2" />}
        match={props.match}
      />
      <RctCollapsibleCard fullBlock>
        <div className="table-responsive">
          <div className="d-flex py-20 px-10 border-bottom" style={{ justifyContent: 'space-between' }}>
     
            <div className='search-row'>
              <input value={searchText} onChange={(e) => setSearchText(e.target.value)} type="text" placeholder='Search' className='search-input py-2' style={{ border: "none", borderBottom: "1px solid black" }} />
              <button onClick={getSearchedModalData} style={{ backgroundColor: "#0b3d45", color: "#fff", borderRadius: "6px", cursor: "pointer" }} className='btn-block py-2 m-auto'>
                Search
              </button>
            </div>
          </div>
          <table className="table table-middle table-hover mb-0">
            <thead>
              <tr>
                <th></th>
                <th>Id</th>
                <th>Time Variable</th>
                <th>Dependent Variable</th>
                <th>Promotional Drivers</th>
                <th>Non Promotional Drivers</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                filteredModel &&
                filteredModel.map((modalObject, id) => {
                  return (<tr key={id}>
                    <td></td>
                    <td>
                      <div className="media">
                        <div className="media-body">
                          <h5 className="mb-5 fw-bold">{modalObject?.id}</h5>
                        </div>
                      </div>
                    </td>

              
                    <td><ul style={{ listStyle: "none" }}><li>{modalObject?.time_variable}</li></ul></td>
                    <td><ul style={{ listStyle: "none" }}><li>{modalObject?.dependent_variable}</li></ul></td>
             
                    <td>{modalObject?.promotional_drivers.length > 0 ? <ul style={{ listStyle: "none" }}>{modalObject.promotional_drivers.map(item => item.split(",").map(data => <li>{data}</li>))}</ul> : "-"}</td>
                    <td>
                     
                      {modalObject?.non_promotional_drivers.length > 0 ? <ul style={{ listStyle: "none" }}>{modalObject.non_promotional_drivers.map(item => item.split(",").map(data => <li>{data}</li>))}</ul> : "-"}
                    </td>

                    <td className="list-action">
                      <button
                        type="button"
                        className="rct-link-btn"
                        onClick={() => onViewGraph(modalObject)}
                      >
                        <i className="ti-eye"></i>
                      </button>
                      <button
                        type="button"
                        className="rct-link-btn"
                        onClick={() => opnUpdateModelModal(modalObject)}
                      >
                        <i className="ti-pencil"></i>
                      </button>
                      <button
                        type="button"
                        className="rct-link-btn"
                        onClick={() => onDelete(modalObject)}
                      >
                        <i className="ti-close"></i>
                      </button>
                    </td>
                  </tr>)
                })
              }
            </tbody>
          </table>
          {
          
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
            style={{ backgroundColor: "#0b3d45", color: "#fff", borderRadius: "6px" }}
            className="text-white"
            onClick={handleDeleteModal}
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


      <Dialog open={openUpdateModal} onClose={handleCloseModal} aria-labelledby="form-dialog-title" className='update-model model-form'>
        <DialogTitle id="form-dialog-title">Update Model</DialogTitle>
        <DialogContent>
         
          <RctCollapsibleCard>
            <Form>
              <FormGroup className='d-flex justify-content-between w-100'>
                <div className='d-flex justify-content-between '>
                  <input
                    type="file"
                    name="file"
                    onChange={changeHandler}
                    accept=".csv"
                    style={{ display: "block", margin: "10px auto" }}
                  />
                </div>
              </FormGroup>

              <FormGroup className='d-flex justify-content-between'>
                <div className='w-100 d-flex justify-content-between'>
                  <Input type="select" name="select" className='w-100' value={timeVariable}
                    onChange={(e) => setTimeVariable(e.target.value)} >

                    {options ? options?.map((item, id) => (
                      <option key={id}
                        value={item} >{item}</option>

                    )) : <option>Select Time Variable</option>}
                  </Input>
                </div>
              </FormGroup>

              <FormGroup className='d-flex justify-content-between'>
                <div className='w-100 d-flex justify-content-between'>
                  <Input type="select" name="select" className='w-100' value={dependentVariable}
                    onChange={(e) => setDependentTimeVariable(e.target.value)}>
                    {options ? options?.map((item, id) => (
                      <option key={id}
                        value={item}>{item}</option>

                    )) : <option>Select Dependent Variable</option>}
                  </Input>
                </div>
              </FormGroup>
              <FormGroup className='d-flex justify-content-between'>
                <div className='w-100 d-flex justify-content-between'>
                  <Input type="select" name="selectMulti" id="SelectMulti" className='w-100' multiple
                    value={promotionalDrivers}
                    onChange={handlePromotonalDriver} >
                    {options ? options?.map((item, id) => (
                      <option key={id}
                        value={item}>{item}</option>
                    )) : <option>Select Promotional Drivers</option>}
                  </Input>
                </div>
              </FormGroup>
            
              <FormGroup className='d-flex justify-content-between'>
                <div className='w-100 d-flex justify-content-between'>
                  <Input type="select" name="selectMulti" id="SelectMulti" className='w-100' multiple
                    value={nonPromotionalDrivers}
                    onChange={handleNonPromotonalDriver}>

                    {options ? options?.map((item, id) => (
                      <option key={id}
                        value={item}>{item}</option>

                    )) : <option>Select Non-Promotional Drivers</option>}
                  </Input>
                </div>
              </FormGroup>
            </Form>
          </RctCollapsibleCard>

        </DialogContent>
        <DialogActions>
    

          <Button
            variant="contained"
            style={{ backgroundColor: "#0b3d45", color: "#fff", borderRadius: "6px" }}
            className="text-white"
            onClick={updateModal}
          >
            Update
          </Button>

          <Button
            variant="contained"
            style={{ backgroundColor: "#565d6b", color: "#fff" }}
            onClick={handleCloseModal}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        PaperProps={{
          style: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
          },
        }}
        open={openLoding} onClose={(event, reason) => handleCloseLoadingBox(event, reason)} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogContent>
          <DialogContentText id="alert-dialog-description" className='d-flex justify-content-center align-items-center'>
            <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="96"
              visible={true}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>

        </DialogActions>
      </Dialog>
    </div>
  )
}

