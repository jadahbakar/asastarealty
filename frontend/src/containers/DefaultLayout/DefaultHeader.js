import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Nav, NavItem } from 'reactstrap'
import PropTypes from 'prop-types'

import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react'
import DefaultHeaderDropdown from './DefaultHeaderDropdown'

import logo from '../../assets/img/brand/logo_asastarealty.svg'
import sygnet from '../../assets/img/brand/sygnet_asastarealty.svg'

const propTypes = {
  children: PropTypes.node
}

const defaultProps = {}

class DefaultHeader extends Component {
  render () {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    const full = {
      src: logo,
      width: 119,
      height: 51,
      alt: 'AsastaRealty Logo'
    }

    const mini = {
      src: sygnet,
      width: 50,
      height: 50,
      alt: 'AsastaRealty Logo'
    }

    return (
      <>
        <AppSidebarToggler className='d-lg-none' display='md' mobile />
        <AppNavbarBrand full={full} minimized={mini} />
        <AppSidebarToggler className='d-md-down-none' display='lg' />
        <Nav className='d-md-down-none' navbar>
          <NavItem className='px-3'>
            <NavLink to='/dashboard' className='nav-link'>
              Dashboard
            </NavLink>
          </NavItem>
          <NavItem className='px-3'>
            <NavLink to='/users' className='nav-link'>
              Users
            </NavLink>
          </NavItem>
          <NavItem className='px-3'>
            <NavLink to='#' className='nav-link'>
              Settings
            </NavLink>
          </NavItem>
        </Nav>
        <Nav className='ml-auto' navbar>
          <DefaultHeaderDropdown notif />
          <DefaultHeaderDropdown tasks />
          <DefaultHeaderDropdown mssgs />
          <NavItem className='d-md-down-none'>
            <NavLink to='#' className='nav-link'>
              <i className='icon-location-pin' />
            </NavLink>
          </NavItem>
          <DefaultHeaderDropdown onLogout={this.props.onLogout} accnt />
        </Nav>
        <AppAsideToggler className='d-md-down-none' />
        {/* <AppAsideToggler className="d-lg-none" mobile /> */}
      </>
    )
  }
}

DefaultHeader.propTypes = propTypes
DefaultHeader.defaultProps = defaultProps

export default DefaultHeader
