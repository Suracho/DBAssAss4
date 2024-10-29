// component/NavBar.js
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" className={({isActive}) => {
            if(isActive) {
              return "active-link";
            }
          }}>Home</NavLink>
        </li>
        <li>
          <NavLink to="/Bookings">Bookings</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;