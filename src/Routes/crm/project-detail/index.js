/**
 * Project detail Page
 */
/* eslint-disable */
import React, { useState, useEffect,  Fragment } from 'react';
import { Helmet } from "react-helmet";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Progress } from 'reactstrap';
// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
// rct card box
import { RctCard, RctCardContent } from 'Components/RctCard';
// intl messages
import IntlMessages from 'Util/IntlMessages';
// widgets
import {
   ProjectGallery,
   ProjectStatsChart,
} from "Components/Widgets";
// widgets data
import {
   projects
} from '../projects/data';

import ContentLoader from 'react-content-loader';

export default function ProjectDetail(props){
   const [projectData, setProjectData] = useState(projects);
   const [productId, setProductId] = useState(props.match.params.id);
   const [currentDataItem, setCurrentDataItem] = useState(null);

   useEffect(() => {
      setProjectData(projects);
      setProductId(props.match.params.id)
      setTimeout(() => {
         getProductItem();
      }, 1000);
   },[])
   
   // get product items
   const getProductItem = ()  => {
      if (projectData && projectData.length > 0){
         for (let Item of projectData){
            if (Item.id === parseInt(productId)){
               setCurrentDataItem(Item);
            }
         }
      }
   }

   //convert html
   const createMarkup = (value) => {
      return { __html: value };
   }

   return (
      <Fragment>
         {currentDataItem !== null ?
            <div className="project-detail-wrapper">
               <Helmet>
                  <title>Project Detail</title>
                  <meta name="description" content="Automaton Blank Page" />
               </Helmet>
               <PageTitleBar title={<IntlMessages id="sidebar.projectDetail" />} match={props.match} />
               <div className="row">
                  <div className="col-sm-12 col-md-12 col-lg-8">
                     <div>
                        <div className="project-title mb-30">
                           <h2>{currentDataItem.title}</h2>
                        </div>
                        <RctCard>
                           <RctCardContent>
                              <div className="basic-info">
                                 <div dangerouslySetInnerHTML={createMarkup(currentDataItem.full_desc)} />
                              </div>
                           </RctCardContent>
                        </RctCard>
                        <RctCard>
                           <div className="pb-20">
                              <h3 className="p-20">Files Uploaded</h3>
                              <List className="list-unstyled p-0">
                                 <ListItem className="border-bottom pl-30 d-flex justify-content-start align-content-center">
                                    <div>
                                       <i className="material-icons">picture_as_pdf</i>
                                    </div>
                                    <div className="pl-15">
                                       <h5 className="fw-normal mb-5">AX_Report.pdf </h5>
                                       <p className="mb-0 fs-12">12/May/2019</p>
                                    </div>
                                 </ListItem>
                                 <ListItem className="border-bottom pl-30 d-flex justify-content-start align-content-center">
                                    <div>
                                       <i className="material-icons">image</i>
                                    </div>
                                    <div className="pl-15">
                                       <h5 className="fw-normal mb-5">Blueprint.jpg </h5>
                                       <p className="mb-0 fs-12">08/May/2019</p>
                                    </div>
                                 </ListItem>
                              </List>
                           </div>
                        </RctCard>
                        <ProjectStatsChart data={currentDataItem.stats_data} labels={currentDataItem.stats_labels} />
                     </div>
                  </div>
                  <div className="col-sm-12 col-md-12 col-lg-4">
                     <div>
                        <RctCard>
                           <RctCardContent>
                              <List className="list-unstyled p-0 detail-list-wrap">
                                 <ListItem className="border-bottom d-flex justify-content-between align-content-center">
                                    <span className="fw-light text-capitalize fs-14 pr-10">budget :</span>
                                    <span className="fw-semi-bold text-capitalize fs-14">{currentDataItem.budget}</span>
                                 </ListItem>
                                 <ListItem className="border-bottom d-flex justify-content-between align-content-center">
                                    <span className="fw-light text-capitalize fs-14 pr-10">Client :</span>
                                    <span className="fw-semi-bold text-capitalize fs-14">{currentDataItem.client}</span>
                                 </ListItem>
                                 <ListItem className="border-bottom d-flex justify-content-between align-content-center">
                                    <span className="fw-light text-capitalize fs-14 pr-10">Department :</span>
                                    <span className="fw-semi-bold text-capitalize fs-14">{currentDataItem.dept}</span>
                                 </ListItem>
                                 <ListItem className="border-bottom d-flex justify-content-between align-content-center">
                                    <span className="fw-light text-capitalize fs-14 pr-10">Duration :</span>
                                    <span className="fw-semi-bold text-capitalize fs-14">{currentDataItem.duration}</span>
                                 </ListItem>
                                 <ListItem className="border-bottom d-flex justify-content-between align-content-center">
                                    <span className="fw-light text-capitalize fs-14 pr-10">Project Manager :</span>
                                    <span className="fw-semi-bold text-capitalize fs-14">{currentDataItem.project_manager}</span>
                                 </ListItem>
                                 <ListItem className="border-bottom d-flex justify-content-between align-content-center">
                                    <span className="fw-light text-capitalize fs-14 pr-10">Team :</span>
                                    <span className="fw-semi-bold text-capitalize fs-14">
                                       <div className="team-img-wrap">
                                          {currentDataItem.team_image.map((image, index) => {
                                             return (
                                                <img
                                                   key={index}
                                                   src={`${process.env.PUBLIC_URL}/assets/images/avatars/${image}`}
                                                   alt="team"
                                                   className="ml-5"
                                                   width="30"
                                                   height="30"
                                                />
                                             )
                                          })}
                                       </div>
                                    </span>
                                 </ListItem>
                                 <ListItem className="border-bottom d-flex justify-content-between align-content-center">
                                    <span className="fw-light text-capitalize fs-14 pr-10">Status :</span>
                                    {currentDataItem.status === true ?
                                       <span className="fw-semi-bold text-capitalize fs-14 text-success">Active</span>
                                       :
                                       <span className="fw-semi-bold text-capitalize fs-14 text-danger">InActive</span>
                                    }
                                 </ListItem>
                                 <ListItem className="border-bottom d-flex justify-content-between align-content-center">
                                    <span className="fw-light text-capitalize fs-14 pr-10">Deadline :</span>
                                    <span className="fw-semi-bold text-capitalize fs-14">{currentDataItem.deadline}</span>
                                 </ListItem>
                              </List>
                           </RctCardContent>
                        </RctCard>
                        <RctCard>
                           <RctCardContent>
                              <div className="progress-wrap mb-15">
                                 <h5 className="mb-0">Progress : <span className="text-primary">{currentDataItem.progress}%</span></h5>
                                 <Progress color="primary" className="my-15 progress-xs" value={currentDataItem.progress} />
                              </div>
                           </RctCardContent>
                        </RctCard>
                        <ProjectGallery slides={currentDataItem.project_gallery} />
                     </div>
                  </div>
               </div>
            </div>
            :
            <ContentLoader />
         }
      </Fragment>
   );
}