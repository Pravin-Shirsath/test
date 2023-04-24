/**
 * User Management Page
 */
 import React, { useEffect, useState, useRef } from 'react'
 import { Helmet } from 'react-helmet'
 import FormControlLabel from '@material-ui/core/FormControlLabel'
 import Button from '@material-ui/core/Button'
 import Checkbox from '@material-ui/core/Checkbox'
import Switch from 'react-toggle-switch';
import { getFormatDate2 } from '../../../../Constants/DateFormator';
 import {
   
   Modal,
   ModalHeader,
   ModalBody,
   ModalFooter,
   Input,
   Form,
   FormGroup,
   Label,
 } from 'reactstrap'
 import Dialog from '@material-ui/core/Dialog'
 import DialogContent from '@material-ui/core/DialogContent'
 import { NotificationManager } from 'react-notifications'
 import Pagination from "react-js-pagination";
 import DeleteIcon from '@mui/icons-material/Delete';
 import ContentCopyIcon from '@mui/icons-material/ContentCopy';
 import { Link, useHistory } from 'react-router-dom';
 import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
 // delete confirmation dialog
 import DeleteConfirmationDialog from 'Components/DeleteConfirmationDialog/DeleteConfirmationDialog'

 // rct card box
 import RctCollapsibleCard from './../../../../Components/RctCollapsibleCard/RctCollapsibleCard'
 // rct section loader
 import RctSectionLoader from '../../../../Components/RctSectionLoader/RctSectionLoader'
 import '../../../.././Assets/css/user.css'
 import {
  
   CustomerDisable,
   CustomerEnable,
   AdminCoupanList,
   AdminCoupanSearch,
   DeleteCoupon
   
 } from '../../../.././Api/'
import CreateCoupan from 'Routes/dashboard/ReuseComponent/CreateCoupan'
import { copyToClipboard } from 'Constants/CopyToClipboard'
import CustomBreadcrumbs from 'Routes/dashboard/ReuseComponent/CustomBreadcrumbs'
 
 export default function CustomerManagement(props) {
   const [coupans, setCoupans] = useState([])
    const [filteredCoupans, setFilterCoupans] = useState([])
   const [searchText, setSearchText] = useState('');
   const [activePage , setActivePage] = useState(1)
   const [totalPageCount, setTotalPageCount] = useState('');
   const [loading, setLoading] = useState(false)
   const [creatCoupanModal, setCreatCoupanModal] = useState(false)
   const [deleteUserModal, setdeleteUserModal] = useState(false)
   const deleteConfirmationDialog = useRef()
   const [selected, setSelectedItem] = useState({})
 
const {location}=props

   useEffect(() => {
   
       getCoupanAllData();
    
   }, [])
 
   const getCoupanAllData = () => {
     const accessToken = JSON.parse(localStorage.getItem('token'))
     if (accessToken !== null) {
      AdminCoupanList(accessToken, activePage)
         .then((res) => {
           if (res?.status === 200) {
             setCoupans(res?.data?.results);
             setFilterCoupans(res?.data?.results);
             setTotalPageCount(parseInt(res?.data?.count));
             // console.log('Response from customerlist :', res)
           } else {
             // console.log('Response from customerlist:', res)
           }
         })
         .catch((err) => {


          






           // console.log("status of invalid token", err?.response?.data, err?.response?.status)
           if(err?.response?.status == 401){
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
      AdminCoupanSearch(accessToken, searchText)
         .then((res) => {
           if (res?.status === 200 && res?.data?.results.length>0) {
             setFilterCoupans(res?.data?.results);
             setSearchText('')
             // console.log('Response from customerlist :', res)
           } else {
             // console.log('Response from customerlist:', res)
             setFilterCoupans(coupans);
             setSearchText('');
             NotificationManager.error("No coupon found!")
           }
         })
         .catch((err) => {
           // console.log('Response from customerlist:', err)
         })
     }
   }
 
   
   // API Call For delete User
   const handleToggleUser = (user,e) => {
   
 
     const accessToken = JSON.parse(localStorage.getItem('token'))
     if (accessToken !== null) {
      
        if(user?.is_active){
         
          CustomerDisable(accessToken,user.id)
          .then((res) => {
            if (res?.status === 200) {
              setdeleteUserModal(false)
              setLoading(true)
               console.log('Response', res)
              setTimeout(() => {
                setLoading(false)
                getCoupanAllData()
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
        }else{
         
          CustomerEnable(accessToken,user.id)
          .then((res) => {
            if (res?.status === 200) {
              setdeleteUserModal(false)
              setLoading(true)
               console.log('Response', res)
              setTimeout(() => {
                setLoading(false)
                getCoupanAllData()
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
     setCreatCoupanModal(true)
   }
 

   const handlePageChange = (pageNumber) => {
     // console.log("pagination", pageNumber)
        if (activePage !== pageNumber) {
         const accessToken = JSON.parse(localStorage.getItem('token'))
         if (accessToken !== null) {
          AdminCoupanList(accessToken, pageNumber)
             .then((res) => {
               if (res?.status === 200) {
                 setCoupans(res?.data?.results);
                 setFilterCoupans(res?.data?.results);
                 setTotalPageCount(res?.data?.count);
                 // console.log('Response from customerlist :', res)
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




   const DeletModalOpen = (item) => {
    setSelectedItem(item)
    deleteConfirmationDialog.current.open()
  }
  const Delete_Coupan = () => {


    const accessToken = JSON.parse(localStorage.getItem('token'))
    if (accessToken !== null) {
      DeleteCoupon(accessToken, selected?.id)
        .then((res) => {
          if (res?.status === 200) {
            deleteConfirmationDialog.current.close()
            getCoupanAllData();
            NotificationManager.success("Coupon deleted successfully!")
            console.log('Response from search  :', res)

          } else {


            NotificationManager.error("Coupon deleting process unsucess!")
          }
        })
        .catch((err) => {
          NotificationManager.error("Coupon deleting process unsucess!")
        })
    }
  }

   return (
     <div className="user-management">
       <Helmet>
         <title>Automaton | </title>
         <meta name="description" content="Automaton Widgets" />
       </Helmet>
   
       <CustomBreadcrumbs    currentPage={"Coupons"} data={location?.state?.breadcrumbData}  />


          <DeleteConfirmationDialog title="Are You Sure Want To Delete?"
             message="This will delete your Coupan permanently."
             onConfirm={() => Delete_Coupan()}
             ref={deleteConfirmationDialog} />

       <RctCollapsibleCard>
         <div className="table-responsive">
           <div className="d-flex py-20 px-10 border-bottom" style={{justifyContent:'space-between'}}>
                <div className='search-row'>
                  <input type="text" placeholder='Search' className='search-input py-2' style={{border:"none", borderBottom:"1px solid black"}} value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
                  <Button variant="contained" color="primary" className="text-white mx-5"  style={{ cursor: "pointer"}}  onClick={getSearchedCustomerData}>Search</Button>
                </div> 
                 <Button variant="contained" color="primary" className="text-white mx-5"  style={{ cursor: "pointer"}}   onClick={(e) => opnAddNewUserModal(e)}>Create Coupon</Button>
           </div>
           <table className="table table-middle table-hover mb-0">
             <thead>
               <tr>
                 <th></th>
                 <th>Sr No</th>
                 <th>Id</th>
                 <th>Created Date</th>
                 <th>Discount</th>
                 <th>Is Utilized</th>
                 <th>Utilized By</th>
                 <th>Discount Amt</th>
                 {/* <th>Active</th> */}
                 <th>Action</th>
               </tr>
             </thead>
 
             {/****** mine filtered Table body, without ternary conditional value  *****/}
             <tbody>
             {filteredCoupans &&
                 filteredCoupans.map((item, i,data) => {
                   {/* let active = item?.is_active   */}
                   let created_Date = getFormatDate2((item?.date_created))
                 return(

                   <tr key={i}>
                     <td></td>
                     <td>{i+1}</td>
                     <td>
                       <div className="media">
                         <div className="media-body">
                           <h5 className="mb-5 fw-bold">{item?.coupon_text}</h5>
                         </div>
                       </div>
                     </td>
                     <td>
                       {created_Date?created_Date:"-"}
                     </td>
                     {/* created_Date */}
                     
                     <td>{`${item?.discount_value} ${item?.discount_type == "amount"? "₹" : "%"} `}</td>
                     <td>
                       {item?.is_utilized+""}
                     </td>
                     <td>
                       {item?.utilized_by == null ? "-":item?.utilized_by}
                     </td>
                     <td>
                       {item?.discount_value }  
                     </td>
                     {/* <td>
                       {item?.is_active ?<FiberManualRecordIcon  color="success" />:<FiberManualRecordIcon color="error"/>}  
                     </td> */}
                     <td className="list-action" style={{display:"flex", gap:"3px"}}>
                     <ContentCopyIcon onClick={()=>copyToClipboard(item?.coupon_text)}/>
                     <DeleteIcon  onClick={()=>DeletModalOpen(item)}/>

                       {/* <Switch
                         onClick={()=>handleToggleUser(item)}
                        on={active}
                        className={item?.is_active==true?"bg-primary":"bg-danger"}
                     /> */}
                      
                     </td>
                   </tr>
                 )})}
             </tbody>
 
           </table> 
            {
               coupans?.length > 0 &&
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
      
       </RctCollapsibleCard>
 
         <CreateCoupan  Modalopen={creatCoupanModal} close={()=>setCreatCoupanModal(false)} reloadlist={getCoupanAllData}/>
       <Modal
         isOpen={deleteUserModal}
         className="addCustomerModal"
       >
         <ModalBody>
           Are you sure want to delete  ?
         </ModalBody>
         <ModalFooter>
           <Button
             variant="contained"
             // color="primary"
             style={{backgroundColor: "#0b3d45", color:"#fff", borderRadius: "6px"}} 
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
 