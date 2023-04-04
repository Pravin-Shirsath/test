/**
 * Ecommerce Dashboard
 */

import React, { useEffect, useState, useRef } from 'react'
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

import { Avatar } from '@material-ui/core';

// intl messages
// import IntlMessages from 'Util/IntlMessages';
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'



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
import ViewProject from '../ViewProject';
import { isNotEmpty } from '@amcharts/amcharts4/.internal/core/utils/Utils';



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
  const [selected, setSelectedItem] = useState({})
  const type = JSON.parse(localStorage.getItem('user_type'));
  const [openEditProject, setOpenEditProject] = useState(false)



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


  const EditModal = (item) => {
    setSelectedItem(item)
  
    setOpenEditProject(true)
  }

 const ViewProject=(item)=>{
   console.log(item,'viewProject iteeemmm in  saaasss aka dashboard' )
   localStorage.setItem("projId", item?.id)
  history.push("/app/dashboard/viewProject",{BackPath:"/app/dashboard/saas",pathname:"Dashboard"})
 }



//  const UPLOADER = "tus";
//  const XHR_ENDPOINT = "";
 
//  const RESTORE = false;
 
//  const uppyDashboard = new Uppy({ logger: debugLogger })
//    .use(Dashboard, {
//    inline: true,
//   //  target: "Upp",
//    showProgressDetails: true,
//    proudlyDisplayPoweredByUppy: true
//    })
 
 
//  switch (UPLOADER) {
//     case "xhr":
//    uppyDashboard.use(XHRUpload, {
//      endpoint: XHR_ENDPOINT,
//      limit: 6,
//      bundle: true
//    });
//    break;
//    default:
//  }
 
//  if (RESTORE) {
//    uppyDashboard.use(GoldenRetriever, { serviceWorker: true });
//  }
 
// //  window.uppy = uppyDashboard;
 
//  uppyDashboard.on("complete", (result) => {
//    if (result.failed.length === 0) {
//    console.log("Upload successful");
//    } else {
//    console.warn("Upload failed");
//    }
//    console.log("successful files:", result.successful);
//    console.log("failed files:", result.failed);
//  });












  
  return (
    <div className="ecom-dashboard-wrapper">
      <Helmet>
        <title> User Dashboard </title>
        <meta name="description" content="user Dashboard" />
      </Helmet>
      <div className="charts-widgets-wrapper">

        <PageTitleBar title={<IntlMessages id="sidebar.dashboard" />} match={props.match} />

        <RctCollapsibleCard
        // heading={<center> <h2>user Dashboard</h2></center> }

        >
          <div className="d-flex pb-20 px-10 border-bottom" style={{ justifyContent: 'space-between' }}>
          
            <div className='search-row'>
              <input type="text" placeholder='Search' className='search-input py-2' style={{ border: "none", borderBottom: "1px solid black" }} />
              <Button variant="contained" color="primary" className="text-white mx-5" onClick={getSearchedProjectData} >Search</Button>
            </div>

            {/* <Button variant="contained" color="primary" className="text-white mx-5"  
               // onClick={(e) => opnAddNewUserModal(e)} 

               >Add New Customer</Button> */}

          </div>
          
           <EditProject selected={selected} Modalopen={openEditProject} close={()=>setOpenEditProject(false)} reloadlist={ProjectList}/>

        </RctCollapsibleCard>
       	
        <div>

          <DeleteConfirmationDialog title="Are You Sure Want To Delete?"
            message="This will delete your project permanently."
            onConfirm={() => Delete_project()}
            ref={deleteConfirmationDialog} />

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
                    <section className="dark-primary text-white px-3 shadow rounded d-flex  align-items-center " style={{borderColor:'white'}}>

                      <img
                        src={item?.project_image == null ? `${process.env.PUBLIC_URL}/assets/images/avatars/user-15.jpg` : `${ item.project_image}`}
                        alt="user profile"
                        className=" rounded-circle border-box-shadow-image"
                       
                        width={50}
                        height={50}
                      />
                      <div className="ml-4  align-items-center ">
                        <p className="project-heading">{item.project_name}</p>
                        <p className="project-date"> Created by {item.username} on {created}</p>
                      </div>


                    </section>
                    <section className="Project-Card-Main ">
                      <section className="d-flex flex-direction: column align-items-center justify-content-between Project-cart-main">
                        <div className="Doughnut-in-Project-cart">
                          <DoughnutChart />
                        </div>
                        <div>
                          <p className="project-card-dataset-text">Dataset Details <span className="project-card-dataset-box">{item?.project_dataset}</span></p>
                          <p className="project-card-dataset-text">Status <span className="project-card-Status-box  "></span></p>
                        </div>

                      </section>
                      <section className="d-flex flex-direction: column align-items-center justify-content-center   " >
                        <Button variant="contained" color="primary" className="projectCardButton mx-2" onClick={() => EditModal(item)} >Edit</Button>
                        <Button variant="contained" color="primary" className="projectCardButton mx-2" onClick={()=>ViewProject(item)} >View</Button>
                        <Button variant="contained" color="danger" className="projectCardButton mx-2" onClick={() => { DeletModalOpen(item) }}>Delete</Button>

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
