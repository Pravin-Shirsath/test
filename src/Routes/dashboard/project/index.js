/**
 * Ecommerce Dashboard
 */

import React, { useEffect, useState,useRef } from 'react'
import { NotificationManager } from 'react-notifications'
import Pagination from "react-js-pagination";
import { Helmet } from "react-helmet";
//  import Button from '@material-ui/core/Button';
import {
  Progress, Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Col,
  FormFeedback
} from 'reactstrap';




// intl messages
import IntlMessages from '../../../Util/IntlMessages';
import DeleteConfirmationDialog from '../../../Components/DeleteConfirmationDialog/DeleteConfirmationDialog';







// rct collapsible card




// widgets data
import {
  visitorsData,
  salesData,
  ordersData,
  topSellingProducts,
  trafficStatus
} from './data';
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import { str } from 'Constants/stringConst';
import { OverallTrafficStatusWidget, SupportRequest } from 'Components/Widgets';
import ProjectCard from '../ReuseComponent/ProjectCard';
import DoughnutChart from 'Components/Charts/DoughnutChart';
import { useHistory } from 'react-router';
import { DeleteProject, GetAlLProjectList, GetSearchProjectList } from 'Api';
import { getFormatDate2 } from 'Constants/DateFormator';
import { BASE_URL } from 'Api/APIConst';
import EditProject from '../ReuseComponent/EditProject';


export default function SaasDashbaord(props) {
  const { match } = props;
  const history = useHistory();
  const deleteConfirmationDialog = useRef()
  const [project, setProject] = useState([])
  //  const [filteredUsers, setFilteredProject] = useState() // use when the data is coming fom api
  const [filterProject, setFilteredProject] = useState([])
  const [searchText, setSearchText] = useState('');
  const [activePage, setActivePage] = useState(1)
  const [totalPageCount, setTotalPageCount] = useState('');
  const [openEditProject, setOpenEditProject] = useState(false)
  const [selected, setSelectedItem] = useState({})

  const type = JSON.parse(localStorage.getItem('user_type'));
  //  if(type === "admin"){

  //    history.push("app/dashboard/Admin/Dashboard")
  //  }



  const ProjectList = () => {
    const accessToken = JSON.parse(localStorage.getItem('token'))
    if (accessToken !== null) {
      GetAlLProjectList(accessToken, activePage)
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
    const accessToken = JSON.parse(localStorage.getItem('token'))
    if (accessToken !== null) {
      GetSearchProjectList(accessToken, searchText)
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





  //  alert("hello")
  useEffect(() => {

    ProjectList()
    console.log("type", type);
  }, [])


  const EditModal = (item) => {
    setSelectedItem(item)
  
    setOpenEditProject(true)
  }

 const ViewProject=(item)=>{
  console.log(item, "viewProject iteeemmm in project")
  localStorage.setItem("projId", item?.id)
  history.push("/app/dashboard/viewProject",{BackPath:match?.path,pathname:"Project"})
 }
 const NavigateTo=()=>{
   
  history.push("/app/dashboard/createProject",{BackPath:match?.path,pathname:"Project"})
 }
 
  return (
    <div className="ecom-dashboard-wrapper">
      <Helmet>
        <title> User Dashboard </title>
        <meta name="description" content="user Dashboard" />
      </Helmet>
      <div className="charts-widgets-wrapper">

        <PageTitleBar title={<IntlMessages id="sidebar.project" />} match={props.match} />
       
       
        <DeleteConfirmationDialog title="Are You Sure Want To Delete?"
            message="This will delete your project permanently."
            onConfirm={() => Delete_project()}
            ref={deleteConfirmationDialog} />
        
        
        <RctCollapsibleCard
        // heading={<center> <h2>user Dashboard</h2></center> }

        >
          <div className="d-flex pb-20 px-10 border-bottom" style={{ justifyContent: 'space-between' }}>
            <div className='search-row'>
              <input type="text" placeholder='Search' onChange={(e)=>setSearchText(e.target.value)} className='search-input py-2' style={{ border: "none", borderBottom: "1px solid black" }} />
              <Button variant="contained" color="primary" className="text-white mx-5" onClick={getSearchedProjectData} >Search</Button>
            </div>
            <Button variant="contained" color="primary" className="text-white mx-5" onClick={NavigateTo} >Create Project</Button>
            {/* <Button variant="contained" color="primary" className="text-white mx-5"  
               // onClick={(e) => opnAddNewUserModal(e)} 

               >Add New Customer</Button> */}

          </div>
          <EditProject selected={selected} Modalopen={openEditProject} close={()=>setOpenEditProject(false)} reloadlist={ProjectList}/>


        </RctCollapsibleCard>
        <div>

          <div className="row ">
            {filterProject &&
              filterProject.map((item, i) => {

                let created = getFormatDate2(item.date_created)
                return <RctCollapsibleCard

                  colClasses="col-sm-12 col-md-6 col-lg-4  rounded"

                  fullBlock
                  key={i}
                >
                  <div className="shadow project-card-shadow">
                    <section className="dark-primary text-white px-3 shadow rounded d-flex  align-items-center" style={{borderColor:'white', height:"90px"}}>

                      <img
                       
                        src={item?.project_image == null ? `${process.env.PUBLIC_URL}/assets/images/avatars/user-15.jpg` : `${ item.project_image}`}
                        alt="user profile"
                        className=" rounded-circle "
                        width={63}
                        height={63}
                      />

                      <div className="ml-4  d-flex flex-column justify-content-center align-items-center">
                        <p className="project-heading text-left w-100 m-0">{item.project_name}</p>
                        <p className="project-date text-left w-100 m-0"> Created by {item.username} on {created}</p>
                      </div>


                    </section>
                    <section className="Project-Card-Main" style={{height: "195px"}}>
                      <section className="d-flex flex-direction: column align-items-center justify-content-between Project-cart-main">
                        <div className="Doughnut-in-Project-cart">
                          <DoughnutChart />
                        </div>
                        <div>
                          <p className="project-card-dataset-text">Dataset Details <span className="project-card-dataset-box">{item?.project_dataset}</span></p>
                          <p className="project-card-dataset-text">Status <span className="project-card-Status-box  "></span></p>
                        </div>

                      </section>
                      <section className="d-flex flex-direction: column align-items-center justify-content-center"  style={{marginTop:"18px"}} >
                        <Button variant="contained" color="primary" className="projectCardButton mx-2" onClick={()=>EditModal(item)} >Edit</Button>
                        <Button variant="contained" color="primary" className="projectCardButton mx-2" onClick={()=>ViewProject(item)} >View</Button>
                        <Button variant="contained" color="danger" className="projectCardButton mx-2" onClick={()=>DeletModalOpen(item)} >Delete</Button>
                      </section>
                    </section>

                  </div>

                </RctCollapsibleCard>
              })
            }

            
          </div>
          <div>
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



      </div>

    </div>
  )
}
