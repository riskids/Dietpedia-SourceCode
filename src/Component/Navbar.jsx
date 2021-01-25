import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return(
    <nav class="navbar shadow-nav bg-green navbar-expand fixed-bottom">
      <ul class="navbar-nav nav-justified w-100">
        <NavLink to="/search" className="nav-link">
          <span class="material-icons size-34" >
            search
          </span>
        </NavLink>
        <NavLink to="/article" className="nav-link">
          <span class="material-icons size-34">
            explore</span>
        </NavLink>
      </ul>
    </nav>
  );
}

export default Navbar;
