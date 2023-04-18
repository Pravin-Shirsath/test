/**
 * Sidebar Content
 */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, ListSubheader } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import IntlMessages from 'Util/IntlMessages';
import NavMenuItem from './NavMenuItem';
// redux actions
import { onToggleMenu } from 'Store/Actions';
import eventBus from 'Constants/eventBus';



function SidebarContent(){
   const dispatch = useDispatch();
   const sidebar = useSelector(state => state.sidebar);
   const { sidebarMenus } = sidebar;
   const [type , setType] = useState();
	const toggleMenu = (menu, stateCategory) => {
		let data = { menu, stateCategory }
		dispatch(onToggleMenu(data));
	} 



   useEffect(() => {
      const type = JSON.parse(localStorage.getItem('user_type'));
      setType(type);
      console.log("type", type);

      eventBus.on("updateType", (res) => {
        
         if (res.message) {
          
            const type = JSON.parse(localStorage.getItem('user_type'));
            setType(type);
   
         
         }
       })
   
       return () => eventBus.remove("updateType");


    }, [])
  
 
  
   return (
      <div className="rct-sidebar-nav mt-4 ">
         <nav className="navigation">
          
           {
            type == "customer" &&    <List
            className="rct-mainMenu p-0 m-0 list-unstyled"
            // subheader={<ListSubheader className="side-title" component="li"><IntlMessages id="sidebar.applications" /></ListSubheader>}
         >
            {sidebarMenus.category1.map((menu, key) => (
               <NavMenuItem
                  menu={menu}
                  key={key}
                  onToggleMenu={() => toggleMenu(menu, 'category1')}
               />
            ))}
         </List> 
           }

           {
            type == "company_admin" &&    <List
            className="rct-mainMenu p-0 m-0 list-unstyled"
            // subheader={<ListSubheader className="side-title" component="li"><IntlMessages id="sidebar.applications" /></ListSubheader>}
         >
            {sidebarMenus.category3.map((menu, key) => (
               <NavMenuItem
                  menu={menu}
                  key={key}
                  onToggleMenu={() => toggleMenu(menu, 'category3')}
               />
            ))}
         </List> 
           }
         
           {
            type == "admin" &&    <List
            className="rct-mainMenu p-0 m-0 list-unstyled"
            // subheader={<ListSubheader className="side-title" component="li"><IntlMessages id="sidebar.applications" /></ListSubheader>}
         >
            {sidebarMenus.category2.map((menu, key) => (
               <NavMenuItem
                  menu={menu}
                  key={key}
                  onToggleMenu={() => toggleMenu(menu, 'category2')}
               />
            ))}
         </List> 
           }
          
         </nav>
      </div>
   );
}

export default withRouter(SidebarContent);
