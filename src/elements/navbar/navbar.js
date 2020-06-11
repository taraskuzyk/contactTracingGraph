import React, {useState} from "react";
import logo from '@/logo_tek.png'
import './navbar.scss'
import {Collapse, Navbar, NavbarBrand, NavbarToggler} from "shards-react";
import {NavLink} from 'react-router-dom'

export default (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [collapseOpen, setCollapseOpen] = useState(false)

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const toggleNavbar = () => {
    setCollapseOpen(!collapseOpen)
  }


  return (
    <Navbar type="dark" theme="primary" expand="md" className="mb-4">
      <NavbarBrand
      tag={()=>
        {
          return (
          <NavLink to="/" className="navbar-brand">
            <img src={logo} alt="TEKTELIC" className="logo mr-3 mr-lg-5" />
            Contact Tracing
          </NavLink>
          )
        }
        }/>
      <NavbarToggler onClick={toggleNavbar} />
    </Navbar>
  );

}

