import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { List, ListItem, Box, Drawer } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./styles/AppHeader.css"

export default function AppHeader({handleClick, handleLoginClick}) {
  const [loggedIn, setLoggedIn] = useState(false);

  const LoginInfo = () => {
    return (
      <IconButton size="large" sx={{top: 0, right: 0}} onClick={() => {
        handleLoginClick(true);
      }}>
        <AccountCircleIcon/>
      </IconButton>
  );}

  return (

      <AppBar position="fixed" color="error" sx={{
        top: 0,
        left: 0
      }}>
        <Toolbar>
          <IconButton size="large" sx={{top: 0, right: 0, zIndex: 1000}} onClick={() => {
            handleClick(true);
            console.log("clicked wheel!");
          }}>
            <SettingsIcon/>
          </IconButton>
          <LoginInfo/>
        </Toolbar>
      </AppBar>

  );
}
