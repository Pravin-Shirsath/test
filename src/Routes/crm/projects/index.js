/**
 * Projects Page
*/
/* eslint-disable */
import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Progress } from 'reactstrap';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// rct card box
import { RctCard, RctCardContent } from 'Components/RctCard';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct collapsible card
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

// widgets data
import { projects } from './data';

// helpers
import { getAppLayout } from "Helpers/helpers";

//component
import ProjectListing from './component/ProjectListing';
import AppConfig from 'Constants/AppConfig';

export default function Projects(props){
   const [gridlayout, setGridlayout] = useState(true);
  
   // show grid layout
   const listLayout = () => {
      setGridlayout(false);
   };

   // show list layout
   const gridLayout = () => {
      setGridlayout(true);
   };

   return (
      <div className="projects-wrapper">
         <Helmet>
            <title>{AppConfig.brandName} | Projects</title>
            <meta name="description" content={`${AppConfig.brandName} Projects`}/>
         </Helmet>
         <PageTitleBar title={<IntlMessages id="sidebar.projects" />} match={props.match} />
         <div className="search-bar-wrap">
            <RctCard >
               <RctCardContent>
                  <div className="row">
                     <div className="col-sm-12 col-md-3 col-lg-3 align-items-center mb-10 mb-sm-0">
                        <h2 className="mb-0 text-capitalize">search</h2>
                     </div>
                     <div className="col-sm-12 col-md-9 col-lg-9">
                        <div className="d-sm-flex">
                           <div className="search-bar">
                              <TextField
                                 id="standard-with-placeholder"
                                 placeholder="Search Projects"
                              />
                              <Button variant="contained" color="primary" className="mx-sm-15">
                                 Search
                              </Button>
                           </div>
                           <div className="add-project-wrap">
                              <Button variant="contained" color="primary">
                                 Add
                                 <i className="material-icons pl-10">add</i>
                              </Button>
                           </div>
                        </div>
                     </div>
                  </div>
               </RctCardContent>
            </RctCard>
         </div>
         <div>
            <div className="d-flex justify-content-between align-items-center mt-15 mb-30">
               <h2 className="text-capitalize mb-0">
                  {gridlayout === true ?
                     'project grid'
                     :
                     'project list'
                  }
               </h2>
               <div className="projects-icon">
                  <Button className="btn-icon" onClick={() => gridLayout()}>
                     <i className="material-icons">apps</i>
                  </Button>
                  <Button className="btn-icon" onClick={() => listLayout()}>
                     <i className="material-icons">list</i>
                  </Button>
               </div>
            </div>
            {gridlayout && gridlayout === true ?
               <div className="row">
                  {projects && projects.map((dataItem, index) => {
                     return (
                        <RctCollapsibleCard
                           key={index}
                           customClasses=""
                           colClasses="col-sm-12 col-md-6 col-lg-4 w-xs-full"
                           heading={<a href={`/${getAppLayout(location)}/crm/Project-detail/${dataItem.id}`}>{dataItem.title}</a>}
                           collapsible
                           reloadable
                           closeable
                           fullBlock
                        >
                           <RctCardContent>
                              <div className="desc-wrap">
                                 <h5>Description :</h5>
                                 <p>{dataItem.desc}</p>
                              </div>
                              {dataItem.team_image && dataItem.team_image !== null ?
                                 <div className="project-team mb-15">
                                    <h5 className="mb-15">Team Members : </h5>
                                    <div className="team-img-wrap">
                                       {dataItem.team_image.map((image, index) => {
                                          return (
                                             <img
                                                key={index}
                                                src={`${process.env.PUBLIC_URL}/assets/images/avatars/${image}`}
                                                alt="team"
                                                className="mr-2"
                                                width="30"
                                                height="30"
                                             />
                                          )
                                       })}
                                    </div>
                                 </div>
                                 :
                                 null
                              }
                              <div className="deadline-info mrgn-b-md">
                                 <h5>Deadline : </h5>
                                 <p>{dataItem.deadline}</p>
                              </div>
                              <div className="progress-wrap mb-15">
                                 <div className="d-flex justify-content-between align-items-center">
                                    <h4 className="mb-0">Progress : <span className="text-primary">{dataItem.progress}%</span></h4>
                                 </div>
                                 <Progress color="primary" className="my-15 progress-xs" value={dataItem.progress} />
                              </div>
                              <div className="text-right">
                                 <a href={`/${getAppLayout(location)}/crm/Project-detail/${dataItem.id}`} className="text-primary text-capitalize fs-14">learn more</a>
                              </div>
                           </RctCardContent>
                        </RctCollapsibleCard>
                     )
                  })}
               </div>
               :
               <div className="row">
                  <div className="col-sm-12 col-md-12 col-lg-12">
                     <ProjectListing data={projects} />
                  </div>
               </div>
            }
         </div>
      </div>
   );
}