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
      <IconButton size="large" edge="end" onClick={() => {
        handleLoginClick(true);
      }}>
        <AccountCircleIcon/>
      </IconButton>
  );}

  return (
    <Box className="top" sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="error">
        <Toolbar id="button" >
          <IconButton size="large" edge="end" onClick={() => {
            handleClick(true);
            console.log("clicked wheel!");
          }}>
            <SettingsIcon/>
          </IconButton>
          <LoginInfo/>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
