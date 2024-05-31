import Table from "./Table"
import AppHeader from "./AppHeader"
import Login from "./Login"
import Signup from "./Signup"
import { List, ListItem, Box, Drawer, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField,
  Container, FormControlLabel, Typography, Grid, Link, Checkbox, Stack, Divider
 } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./AppHeader.css"

function App() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openLoginDrawer, setOpenLoginDrawer] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const SettingsDrawer = () => (
    <Box sx={{alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
      <List>
        <ListItem>
          <Button variant="outlined" onClick={() => {
            setOpenDrawer(false);
          }}>Cancel</Button>
        </ListItem>
      </List>
    </Box>
  );

  const LoginDrawer = () =>  {
    if (user != null && loggedIn) {
      console.log(user, 'drawer success?');
      return (
      <Box sx={{alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
        <List>
          <ListItem>
            <Box sx={{ border: '2px solid grey' }}>
              <Divider orientation="horizontal" component="li" flexItem={true} sx={{display: "flex", justifyContent: "left"}}>
                <Typography style={{color: 'black'}}>
                  Account Info
                </Typography>
              </Divider>
            </Box>
          </ListItem>
          <ListItem>
            <Typography style={{color: 'black'}}>
              Username: {user.userName}
            </Typography>
          </ListItem>
          <ListItem>
            <Typography style={{color: 'black'}}>
              Name: {user.firstName + ' ' + user.lastName}
            </Typography>
          </ListItem>
          <ListItem>
            <Button variant="outlined" onClick={() => {
              setLoggedIn(false);
            }}>
              Sign Out
            </Button>
          </ListItem>
          <ListItem>
            <Button variant="outlined" onClick={() => {
              setOpenLoginDrawer(false);
              console.log("cancel!");
            }}>Cancel</Button>
          </ListItem>
        </List>
      </Box>)
    }
    else {
      return (
        <Box sx={{alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
          <List>
          <ListItem>
            <Button variant="outlined">
              Log In
            </Button>
          </ListItem>
            <ListItem>
              <Button variant="outlined" onClick={() => {
                setOpenLoginDrawer(false);
                console.log("cancel!");
              }}>Cancel</Button>
            </ListItem>
          </List>
        </Box>)
    }
  }

  const Main = () => {
    if (loggedIn) {
      return ( <>
        <Drawer open={openDrawer} anchor='right' PaperProps={{sx:{width: 200}}}>
          <SettingsDrawer/>
        </Drawer>
        <Drawer open={openLoginDrawer} anchor='right' PaperProps={{sx:{width: 200}}}>
          <LoginDrawer/>
        </Drawer>
        <AppHeader handleClick={setOpenDrawer} handleLoginClick={setOpenLoginDrawer}/>
        <Table/>
      </>);
    }
    else {
      return (
        <>
          <Box sx={{
            borderRadius: 0,
            width: 600,
            height: 1000,
            bgcolor: 'primary.main',
            backgroundColor: '#D84040'
        }}></Box>
          <Box id="homePage" sx={{ borderColor: 'primary.main'}}>
            <Stack direction="row" spacing={2} sx={{alignItems: 'center', display: 'flex', justifyContent: 'center'}}>
              <Container component="main" maxWidth="xs">
                <Login setter={setUser} logger={setLoggedIn}/>
              </Container>
              <Divider orientation="vertical" component="li" flexItem={true}>
                <Typography style={{color: 'black'}}>
                  OR
                </Typography>
              </Divider>
              <Container component="main" maxWidth="xs">
                <Signup setter={setUser} logger={setLoggedIn}/>
              </Container>
            </Stack>
          </Box>
        </>
      );
    }
  }

  return (
     <Main/>
  )
}

export default App;