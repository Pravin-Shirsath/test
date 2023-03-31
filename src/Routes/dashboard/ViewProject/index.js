/**
 * Ecommerce Dashboard
 */

import React, { useEffect, useState,useRef } from 'react'
import { Helmet } from "react-helmet";
//  import Button from '@material-ui/core/Button';
import {
  Button,
} from 'reactstrap';




// intl messages
import IntlMessages from '../../../Util/IntlMessages';
import DeleteConfirmationDialog from '../../../Components/DeleteConfirmationDialog/DeleteConfirmationDialog';







// rct collapsible card




// widgets data
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


export default function ViewProject(props) {
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

  return (
    <div className="ecom-dashboard-wrapper">
      <Helmet>
        <title> User Dashboard </title>
        <meta name="description" content="user Dashboard" />
      </Helmet>
      <div className="charts-widgets-wrapper">

        <PageTitleBar title={<IntlMessages id="sidebar.viewProject" />} match={props.match} />
       
       
        <DeleteConfirmationDialog title="Are You Sure Want To Delete?"
            message="This will delete your project permanently."
            ref={deleteConfirmationDialog} />
        <RctCollapsibleCard
        // heading={<center> <h2>user Dashboard</h2></center> }

        >
          <div className="d-flex pb-20 px-10 border-bottom" style={{ justifyContent: 'space-between' }}>
            <div className='search-row'>
              <input type="text" placeholder='Search' className='search-input py-2' style={{ border: "none", borderBottom: "1px solid black" }} />
              <Button variant="contained" color="primary" className="text-white mx-5" >Search</Button>
            </div>
            <Button variant="contained" color="primary" className="text-white mx-5" onClick={()=> history.push("/app/dashboard/createDataset")} >Create Project</Button>
          </div>
        </RctCollapsibleCard>
        <div>
        </div>
      </div>
    </div>
  )
}
