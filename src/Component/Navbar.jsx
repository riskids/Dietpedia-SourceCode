import { NavLink } from 'react-router-dom';

function Navbar() {
    return(
      <div>
        <nav class="navbar shadow-nav bg-green navbar-expand fixed-bottom">
            <ul class="navbar-nav nav-justified w-100">
                <li class="nav-link">
                    <NavLink class="nav-link" to="/dietPedia">
                        <span class="material-icons size-34">search</span>
                    </NavLink>
                </li>
                <li class="nav-link">
                    <NavLink class="nav-link" to="/article">
                        <span class="material-icons size-34">explore</span>
                    </NavLink>
                </li>
             </ul>
         </nav>
      </div>
    )
}

export default Navbar;
