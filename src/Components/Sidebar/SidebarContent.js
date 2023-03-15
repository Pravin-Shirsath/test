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
    }, [])
  

 
  
   return (
      <div className="rct-sidebar-nav mt-4">
         <nav className="navigation">
            <List
               className="rct-mainMenu p-0 m-0 list-unstyled"
               // subheader={
               //    <ListSubheader className="side-title" component="li">
               //       <IntlMessages id="sidebar.general" />
               //    </ListSubheader>}
            >
               {sidebarMenus.category1.map((menu, key) => (
                  <NavMenuItem
                     menu={menu}
                     key={key}
                     onToggleMenu={() => toggleMenu(menu, 'category1')}
                  />
               ))}
            </List>

            {/******* Modal Category Created by us (still a copy of above, yet to work on) ***********/}
            <List
               className="rct-mainMenu p-0 m-0 list-unstyled"
               // subheader={
               //    <ListSubheader className="side-title" component="li">
               //       <IntlMessages id="sidebar.general" />
               //    </ListSubheader>}
            >
               {sidebarMenus.category7.map((menu, key) => (
                  <NavMenuItem
                     menu={menu}
                     key={key}
                     onToggleMenu={() => toggleMenu(menu, 'category7')}
                  />
               ))}
            </List>
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
         
            {/***********************************************/}

            {/* <List
               className="rct-mainMenu p-0 m-0 list-unstyled"
               subheader={<ListSubheader className="side-title" component="li"><IntlMessages id="sidebar.modules" /></ListSubheader>}
            >
               {sidebarMenus.category2.map((menu, key) => (
                  <NavMenuItem
                     menu={menu}
                     key={key}
                     onToggleMenu={() => toggleMenu(menu, 'category2')}
                  />
               ))}
            </List> */}
            {/* <List
               className="rct-mainMenu p-0 m-0 list-unstyled"
               subheader={<ListSubheader className="side-title" component="li"><IntlMessages id="sidebar.component" /></ListSubheader>}
            >
               {sidebarMenus.category3.map((menu, key) => (
                  <NavMenuItem
                     menu={menu}
                     key={key}
                     onToggleMenu={() => toggleMenu(menu, 'category3')}
                  />
               ))}
            </List>
            <List
               className="rct-mainMenu p-0 m-0 list-unstyled"
               subheader={<ListSubheader className="side-title" component="li"><IntlMessages id="sidebar.features" /></ListSubheader>}
            >
               {sidebarMenus.category4.map((menu, key) => (
                  <NavMenuItem
                     menu={menu}
                     key={key}
                     onToggleMenu={() => toggleMenu(menu, 'category4')}
                  />
               ))}
            </List>
            <List
               className="rct-mainMenu p-0 m-0 list-unstyled"
               subheader={<ListSubheader className="side-title" component="li"><IntlMessages id="sidebar.applications" /></ListSubheader>}
            >
               {sidebarMenus.category5.map((menu, key) => (
                  <NavMenuItem
                     menu={menu}
                     key={key}
                     onToggleMenu={() => toggleMenu(menu, 'category5')}
                  />
               ))}
            </List> */}
            {/* <List
               className="rct-mainMenu p-0 m-0 list-unstyled"
               subheader={<ListSubheader className="side-title" component="li"><IntlMessages id="sidebar.extensions" /></ListSubheader>}
            >
               {sidebarMenus.category6.map((menu, key) => (
                  <NavMenuItem
                     menu={menu}
                     key={key}
                     onToggleMenu={() => toggleMenu(menu, 'category6')}
                  />
               ))}
            </List> */}

             {/******* Modal Category Created by us (still a copy of above, yet to work on) ***********/}
            {/* <List
               className="rct-mainMenu p-0 m-0 list-unstyled"
               subheader={
                  <ListSubheader className="side-title" component="li">
                     <IntlMessages id="sidebar.modal" />
                  </ListSubheader>}
            >
               {sidebarMenus.category7.map((menu, key) => (
                  <NavMenuItem
                     menu={menu}
                     key={key}
                     onToggleMenu={() => toggleMenu(menu, 'category7')}
                  />
               ))}
            </List> */}
            {/****************************************************************************************/}
         </nav>
      </div>
   );
}

export default withRouter(SidebarContent);
