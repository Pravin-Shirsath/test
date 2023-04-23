

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
  AddFileToTask,

} from '../../../Api/'

import FolderIcon from '@mui/icons-material/Folder';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ImageIcon from '@mui/icons-material/Image';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';
import CheckIcon from '@mui/icons-material/Check';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CloseIcon from '@mui/icons-material/Close';
import EditDataset from '../ReuseComponent/EditDataset';
import CustomBreadcrumbs from "../ReuseComponent/CustomBreadcrumbs";
import TextField from '@mui/material/TextField';

import MenuItem from '@mui/material/MenuItem';
export default function ViewDataset(props) {
  const history = useHistory();
  const { location } = props

  const [searchText, setSearchText] = useState('');
  const [Taskid, setTaskId] = useState(JSON.parse(localStorage.getItem("TaskId")))

  const [loading, setLoading] = useState(false)


  const deleteConfirmationDialog = useRef()
  const [selected, setSelectedItem] = useState({})
    ;
  const [activePage, setActivePage] = useState(1)
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [taskFile, setTaskFile] = useState([]);
  const [filteredTaskFiles, setFilteredTaskFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchResult,setSearchResult]=useState([])
  const [perpagecount, setPerpagecount] = useState(5);
  const [pagination, setPagination] = useState({
    start: 0,
    end: perpagecount
  });

  useEffect(() => {

    const TID = JSON.parse(localStorage.getItem("TaskId"))

    setTaskId(TID)
    getTaskFile()
    // }
  }, [])


  const getTaskFile = () => {
    let files = location?.state.files
    setTaskFile(files?.data || [])
    setFilteredTaskFiles(files?.data || [])
    setTotalPageCount((files?.data || []).length);
   
  }



 




  const searchFile=( )=>{
    if(searchText != ""){
      const filtered = taskFile.filter(file => {
     return file.file_name.toLowerCase().includes(searchText+"".toLowerCase());
 
    });

   
    setActivePage(1)
    setPagination({
      start: 0,
      end: perpagecount
    })
    setFilteredTaskFiles(filtered)
    setTotalPageCount(filtered?.length)

    }
}

 
      




  const handlePageChange = (pageNumber) => {

    if (activePage !== pageNumber) {

      const value = perpagecount * pageNumber
      setTotalPageCount(taskFile.length)
      setPagination({
        start: value - perpagecount,
        end: value
      }
      )

          setActivePage(pageNumber)
    }
  }

  const handleFileSelect = (file) => {

    const filterarray = taskFile.filter((item) => {
      return item.id !== file.id
    })
   
    setFilteredTaskFiles(filterarray)
    setTaskFile(filterarray)
  }


  const Proceed = () => {
    const authToken = JSON?.parse(localStorage.getItem("token"));
    const TaskId = localStorage.getItem("TaskId")

    if (filteredTaskFiles.length > 0) {
      const IdArray = filteredTaskFiles.map(item => item.id)
      if (authToken !== null) {
        // console.log(authToken, TaskId, IdArray, "authToken, DatasetId, IdArray")
        AddFileToTask(authToken, TaskId, IdArray)
          .then(res => {
            if (res?.status == 200) {
              console.log("res=", res)
              if (res?.data?.message) {

                NotificationManager.success(res?.data?.message)
                setModalOpen(true)
              }
            }
          }).catch((error) => {
            console.log("searchFileerror=", error)
          })
      }

    } else {
      NotificationManager.error("Files is not available")

    }

  }

  const currencies = [
    {
      value: 'USD',
      label: '',
    },
    {
      value: 'EUR',
      label: 'select',
    },
    {
      value: 'BTC',
      label: 'select',
    },
    {
      value: 'JPY',
      label: 'ffg',
    },
  ];


  const yesSubmit = () => {

    const breadcrumbData = location?.state?.breadcrumbData || []
    breadcrumbData.push({ name: 'Create Task', url: '/app/dashboard/createTask' });
    setModalOpen(false)
    history.push("/app/dashboard/listOfTask", { breadcrumbData: breadcrumbData, files: { "count": 1, data: selectedFiles } });
  }

  return (
    <div className="user-management">
      <Helmet>
        <title>Automaton | Customers List</title>
        <meta name="description" content="Automaton Widgets" />
      </Helmet>

      <CustomBreadcrumbs currentPage={"Create Task"} data={location?.state?.breadcrumbData} />
      searchFile
      <DeleteConfirmationDialog title="Are You Sure Want To Delete?"
        message="This will delete your Dataset permanently."
        //  onConfirm={() => Delete_Datset()}
        ref={deleteConfirmationDialog} />
      <RctCollapsibleCard fullBlock>

        <div className="table-responsive">
          <div className="d-flex py-20 px-10 border-bottom" style={{ justifyContent: 'space-between' }}>
            <div className='search-row'>
              <input type="text" placeholder='Search' className='search-input py-2' style={{ border: "none", borderBottom: "1px solid black" }} value={searchText} onChange={(e) => setSearchText(e.target.value)} />
              <Button variant="contained" color="primary" className="text-white mx-5" style={{ cursor: "pointer" }}
              onClick={searchFile}
              >Search</Button>
            </div>


          </div>
          <div className="d-flex align-items-center justify-content-center">
            <p className="Comman-Heading">Task-{Taskid}</p>
          </div>

          <div className='viewDatasetFilesContainer'>
            {
              filteredTaskFiles && filteredTaskFiles.slice(pagination.start, pagination.end).map((file, ind) => {
                console.log(file)
                return (
                  // <div className="mainBox" key={ind} onClick={()=>handleFileSelect(file)}>
                  <div className="mainBox" key={ind}>
                    <div className="imageContainer">
                      {/* {
                                      file.selectedFile ? <CheckBoxIcon className="folderIcon" /> : (file.file_type == "pdf" ? <PictureAsPdfIcon className="folderIcon" /> : (file.file_type == "jpg" || file.file_type == "jpeg" || file.file_type == "png" ? <ImageIcon className="folderIcon" /> : (file.file_type == "xlsx" ? <DescriptionIcon className="folderIcon" /> : <FolderIcon className="folderIcon" />)))
                                    } */}
                      setTotalPageCount
                      {
                        file.file_type == "pdf" ? <a href={file?.file} target="_blank"><PictureAsPdfIcon className="folderIcon" /></a> : (file.file_type == "jpg" || file.file_type == "jpeg" || file.file_type == "png" ? <a href={file?.file} target="_blank"><ImageIcon className="folderIcon" /></a> : (file.file_type == "xlsx" ? <a href={file?.file} target="_blank"><DescriptionIcon className="folderIcon" /></a> : <a href={file?.file} target="_blank"><InsertDriveFileIcon className="folderIcon" /></a>))
                      }

                    </div>
                    <div className="nameContainer">
                      <p>{file.file_name}</p>
                    </div>

                    <div className="checkDiv" onClick={() => handleFileSelect(file)}>{
                      <CloseIcon />
                    }</div>

                  </div>
                )
              })
            }
          </div>

          {filteredTaskFiles.length == 0 && <center style={{ color: "black" }}>Data not available </center>}
          {
            taskFile?.length > 0 &&
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
        <div className="d-flex align-items-center justify-content-center">
          <Button
            variant="contained"
            color="primary"
            className="text-white mx-5 mb-30"
            style={{ cursor: "pointer" }}
            onClick={Proceed}>
            Proceed
          </Button></div>
        {loading && <RctSectionLoader />}
      </RctCollapsibleCard>



      <Modal
        isOpen={modalOpen}
        size="lg"
        centered={true}

      >
        <div className="p-60">

          <center className=" Comman-Heading"> Starting The Task Accuracy </center>

          <Form className="mt-50" >
            <FormGroup row>
              <Label
                for="exampleEmail"
                sm={3}
                className="d-flex align-items-center justify-content-center"
              >
                Select Out Put
              </Label>
              <Col sm={9}>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Select"
                  defaultValue="EUR"
                // helperText="Please select your currency"
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label
                for="examplePassword"
                sm={3}
                className="d-flex align-items-center justify-content-center"
              >
                Orthomosic
              </Label>
              <Col sm={9}>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Select"
                  defaultValue="EUR"
                // helperText="Please select your currency"
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label
                for="exampleSelect"
                sm={3}
                className="d-flex align-items-center justify-content-center"
              >
                Elevation Modal
              </Label>
              <Col sm={9}>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Select"
                  defaultValue="EUR"
                // helperText="Please select your currency"
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label
                for="exampleSelect"
                sm={3}
                className="d-flex align-items-center justify-content-center"
              >
                3d Modal
              </Label>
              <Col sm={9}>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Select"
                  defaultValue="EUR"

                // helperText="Please select your currency"
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Col>
            </FormGroup>

          </Form>
          <h4>Task Will Be Added To Execution Queue</h4>
          <h4>Do You Want To Process These Image And Create The Task</h4>

          <div className="d-flex align-items-end justify-content-end">
            <Button
              variant="contained"
              color="primary"
              className="text-white mx-5"
              style={{ cursor: "pointer" }}
              onClick={yesSubmit}>
              Yes
            </Button>

            <Button
              variant="contained"
              color="error"
              className="text-white mx-5 bg-danger"
              style={{ cursor: "pointer", color: "red" }}
              onClick={() => setModalOpen(false)}>
              No
            </Button>
          </div>
        </div>
      </Modal>






      {/* <EditDataset selected={selected} Modalopen={openEditDataset} close={()=>setOpenEditDataset(false)} reloadlist={getTaskFile}/> */}
    </div>
  )
}
