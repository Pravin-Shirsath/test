/**
 * App Header
 */
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  IconButton,
  Drawer,
  AppBar,
  Toolbar,
  Tooltip,
} from '@material-ui/core'
import { Link, withRouter, useHistory } from 'react-router-dom'
import screenfull from 'screenfull'
import MenuIcon from '@material-ui/icons/Menu'
// actions
import { collapsedSidebarAction, logoutUserFromFirebase } from 'Store/Actions'
// helpers
import { getAppLayout } from 'Helpers/helpers'
// components
import Notifications from './Notifications'
import ChatSidebar from './ChatSidebar'
import DashboardOverlay from '../DashboardOverlay/DashboardOverlay'
import LanguageProvider from './LanguageProvider'
import SearchForm from './SearchForm'
import QuickLinks from './QuickLinks'
import MobileSearchForm from './MobileSearchForm'
import Cart from './Cart'

import { profileInfo } from 'Api'


import '../../Assets/css/theme.css';

import UserBlockHorizontal from './UserBlockHorizontal'
// intl messages
import IntlMessages from 'Util/IntlMessages'
import { Dropdown, DropdownToggle, DropdownMenu, Badge } from 'reactstrap'

function Header(props) {
  const [customizer, setCustomizer] = useState(false)
  const [isMobileSearchFormVisible, setIsMobileSearchFormVisible] = useState(
    false,
  )

  const dispatch = useDispatch()
  const settings = useSelector((state) => state.settings)
  const [userDropdownMenu, setUserDropdownMenu] = useState(false)
  // const [isSupportModal, setIsSupportModal] = useState(false);

  //  added by (vishal)
  const history = useHistory()

  useEffect(()=> {
    console.log("token got in headers useEffect", localStorage.getItem("token"))
  },[])


  const logoutUser = (e) => {
    e.preventDefault()
    dispatch(logoutUserFromFirebase())
  }

  /**
   * Toggle User Dropdown Menu
   */
  const toggleUserDropdownMenu = () => {
    setUserDropdownMenu(!userDropdownMenu)
  }

  /**
   * handle Reset Password Click
   */
  const handleResetPasswordClick = () => {
    history.push('/')
  }

  // function to change the state of collapsed sidebar
  const onToggleNavCollapsed = (event) => {
    const val = settings.navCollapsed ? false : true
    dispatch(collapsedSidebarAction(val))
  }

  // open dashboard overlay
  const openDashboardOverlay = (e) => {
    var el = document.getElementsByClassName('dashboard-overlay')[0]
    el.classList.toggle('d-none')
    el.classList.toggle('show')
    if (el.classList.contains('show')) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    e.preventDefault()
  }

  // close dashboard overlay
  const closeDashboardOverlay = () => {
    var e = document.getElementsByClassName('dashboard-overlay')[0]
    e.classList.remove('show')
    e.classList.add('d-none')
    document.body.style.overflow = ''
  }

  // toggle screen full
  const toggleScreenFull = () => {
    screenfull.toggle()
  }

  // mobile search form
  const openMobileSearchForm = () => {
    setIsMobileSearchFormVisible(true)
  }

  const { horizontalMenu, agencyMenu, location } = props
  return (
    <AppBar position="static" className="rct-header">
      <Toolbar className="d-flex justify-content-between w-100 pl-0 align-items-center" style={{height:'79px'}}>
        <div className="d-inline-flex align-items-center">
          {(horizontalMenu || agencyMenu) && (
            <div className="site-logo">
              <Link to="/" className="logo-mini">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/img/appLogo.png`}
                  className="mr-15"
                  alt="site logo"
                  width="35"
                  height="35"
                />
              </Link>
              <Link to="/" className="logo-normal">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/img/appLogoText.png`}
                  className="img-fluid"
                  alt="site-logo"
                  width="67"
                  height="17"
                />
              </Link>
            </div>
          )}
          {!agencyMenu && (
            <ul className="list-inline mb-0 navbar-left">
              {!horizontalMenu ? (
                <li
                  className="list-inline-item"
                  onClick={(e) => onToggleNavCollapsed(e)}
                >
                  <Tooltip title="Sidebar Toggle" placement="bottom">
                    <IconButton
                      color="inherit"
                      mini="true"
                      aria-label="Menu"
                      className="humburger p-0"
                    >
                      <MenuIcon />
                    </IconButton>
                  </Tooltip>
                </li>
              ) : (
                <li className="list-inline-item">
                  <Tooltip title="Sidebar Toggle" placement="bottom">
                    <IconButton
                      color="inherit"
                      aria-label="Menu"
                      className="humburger p-0"
                      component={Link}
                      to="/"
                      
                    >
                      <i className="ti-layout-sidebar-left"></i>
                    </IconButton>
                  </Tooltip>
                </li>
              )}
            
            </ul>
          )}
        </div>
        <ul className=" list-inline mb-0">
         
          <li
            className="list-inline-item summary-icon"
            style={{ color: 'black', cursor: 'pointer' }}
          >
            <div className="rct-sidebar" style={{ overflow: 'unset'}}>
              <div className="rct-sidebar-wrap">
                <UserBlockHorizontal />
              </div>
            </div>
          </li>

       
        </ul>
        <Drawer
          anchor={'right'}
          open={customizer}
          onClose={() => setCustomizer(false)}
        >
          <ChatSidebar />
        </Drawer>
      </Toolbar>
      <DashboardOverlay onClose={() => closeDashboardOverlay()} />
    </AppBar>
  )
}

export default withRouter(Header)
