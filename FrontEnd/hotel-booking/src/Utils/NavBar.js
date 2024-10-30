// components/NavBar.js
import { NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Hotel Booking
        </Typography>
        
        {/* Desktop Links */}
        <div className="nav-links">
          <Button color="inherit" component={NavLink} to="/" exact>
            Home
          </Button>
          <Button color="inherit" component={NavLink} to="/Bookings">
            Bookings
          </Button>
          <Button color="inherit" component={NavLink} to="/About">
            About
          </Button>
        </div>

        {/* Mobile Menu Icon */}
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={handleMenu}
          sx={{ display: { xs: "flex", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        
        {/* Mobile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <MenuItem component={NavLink} to="/" onClick={handleClose}>
            Home
          </MenuItem>
          <MenuItem component={NavLink} to="/Bookings" onClick={handleClose}>
            Bookings
          </MenuItem>
          <MenuItem component={NavLink} to="/About" onClick={handleClose}>
            About
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
