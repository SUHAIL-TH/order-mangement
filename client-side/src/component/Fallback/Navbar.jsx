import React, { useState } from 'react';
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
function Naavbar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (

    <Navbar fluid rounded className='bg-black'>
      <Navbar.Brand>
        <img src="https://logomaster.ai/hs-fs/hubfs/gaming%20logo%20The%20Power%20of%20a%20Great%20Logo.jpg?width\u003d1700\u0026height\u003d1148\u0026name\u003dgaming%20logo%20The%20Power%20of%20a%20Great%20Logo.jpg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold text-white">AS makers </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'bg-black text-blue-800' : 'text-white')}
        >
          Home
        </NavLink>
        <NavLink
          to="/supplier"
          className={({ isActive }) => (isActive ? 'bg-black text-blue-800' : 'text-white')}
        >
          Supplier
        </NavLink>
        <NavLink
          to="/item"
          className={({ isActive }) => (isActive ? 'bg-black text-blue-800' : 'text-white')}
        >
          Item
        </NavLink>
        <NavLink
          to="/purchase-order"
          className={({ isActive }) => (isActive ? 'bg-black text-blue-800' : 'text-white')}
        >
          Purchase Order
        </NavLink>
        <NavLink
          to="/orderlist"
          className={({ isActive }) => (isActive ? 'bg-black text-blue-800' : 'text-white')}
        >
          Orders List
        </NavLink>
    
      </Navbar.Collapse>
    </Navbar>

  );
}

export default Naavbar;
