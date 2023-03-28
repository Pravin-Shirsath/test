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
 
 import { Link, useHistory } from 'react-router-dom';
 
 // delete confirmation dialog
 import DeleteConfirmationDialog from 'Components/DeleteConfirmationDialog/DeleteConfirmationDialog'
 // add new user form
//  import AddNewUserForm from './AddNewUserForm'
 // update user form
//  import UpdateUserForm from './UpdateUserForm'
 // page title bar
 import PageTitleBar from './../../../../Components/PageTitleBar/PageTitleBar'
 // intl messages
 import IntlMessages from '../../../../Util/IntlMessages'
 // rct card box
 import RctCollapsibleCard from './../../../../Components/RctCollapsibleCard/RctCollapsibleCard'
 // rct section loader
 import RctSectionLoader from '../../../../Components/RctSectionLoader/RctSectionLoader'
 import '../../../.././Assets/css/user.css'
 import {
   addNewCustomer,
   getCustomerList,
   deleteCustomerDetails,
   updateCustomerDetails,
   getSearchedCustomer,
   CustomerDisable,
   CustomerEnable,
   AdminCoupanList,
   AdminCoupanSearch
   
 } from '../../../.././Api/'
import CreateCoupan from 'Routes/dashboard/ReuseComponent/CreateCoupan'
 
 export default function CustomerManagement(props) {
   const history = useHistory();
   const deleteConfirmationDialog = useRef()
  //  const [coupans, setCoupans] = useState() // use when data is coming from api
  const [coupans, setCoupans] = useState([])
  //  const [filteredCoupans, setFilterCoupans] = useState() // use when the data is coming fom api
   const [filteredCoupans, setFilterCoupans] = useState([])
   const [searchText, setSearchText] = useState('');
   const [activePage , setActivePage] = useState(1)
   const [totalPageCount, setTotalPageCount] = useState('');
   
   const [selectedUser, setSelectedUser] = useState(null)
   const [loading, setLoading] = useState(false)
   const [creatCoupanModal, setCreatCoupanModal] = useState(false)
   const [updateNewUserModal, setupdateNewUserModal] = useState(false)
   const [deleteUserModal, setdeleteUserModal] = useState(false)
  

 
   useEffect(() => {
     const isLoggedInBool = localStorage.getItem("isLoggedIn")
     // conditional rendring
     // if(isLoggedInBool !== "true"){
     //   history.push("/login")
     //     localStorage.clear();
     // } else {
       getCoupanAllData();
     // }
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
             NotificationManager.error("No user found!")
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

   return (
     <div className="user-management">
       <Helmet>
         <title>Automaton | </title>
         <meta name="description" content="Automaton Widgets" />
       </Helmet>
       <PageTitleBar
         title={<IntlMessages id="sidebar.coupon" />}
         match={props.match}
       />
       <RctCollapsibleCard fullBlock>
         <div className="table-responsive">
           <div className="d-flex py-20 px-10 border-bottom" style={{justifyContent:'space-between'}}>
           <div className='search-row'>
               <input type="text" placeholder='Search' className='search-input py-2' style={{border:"none", borderBottom:"1px solid black"}} value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
               <Button variant="contained" color="primary" className="text-white mx-5"  style={{ cursor: "pointer"}}  onClick={getSearchedCustomerData}>Search</Button>
                 </div> 
         
                 <Button variant="contained" color="primary" className="text-white mx-5"  style={{ cursor: "pointer"}}   onClick={(e) => opnAddNewUserModal(e)}> <i className="zmdi zmdi-plus mx-2"></i>Coupon</Button>
 
                
               {/*
                {
            "id": 7,
            "coupon_text": "WELFARE500",
            "utilized_by": null,
            "is_utilized": false,
            "discount_value": 500.0,
            "discount_type": "amount",
            "description": "Cupon for 500 rupees off",
            "total_usage_limit": 0,
            "per_user_limit": 1,
            "date_created": "2023-03-27T06:00:24.787167Z"
        },
               
                 */}
           
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

                     <td className="list-action" style={{display:"flex", gap:"3px"}}>
                     <i className="zmdi zmdi-copy"></i>
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
 
         <CreateCoupan  Modalopen={creatCoupanModal} close={()=>setCreatCoupanModal(false)} reloadlist={getCoupanAllData}/>
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
 