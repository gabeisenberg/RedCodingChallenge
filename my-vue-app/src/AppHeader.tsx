import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import { List, ListItem, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./AppHeader.css"

export default function AppHeader({handleClick}) {

  return (
    <Box className="top" sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton id="button" size="large" edge="end" onClick={() => {
            handleClick(true);
            console.log("clicked wheel!");
          }}>
            <SettingsIcon/>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
