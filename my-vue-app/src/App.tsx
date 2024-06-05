import Table from "./Table"
import AppHeader from "./AppHeader"
import Login from "./Login"
import Signup from "./Signup"
import { List, ListItem, Box, Drawer, Button, Container, Typography, Stack, Divider, styled, Switch, FormControlLabel, Collapse, useMediaQuery, createTheme, CssBaseline, FormGroup } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./styles/AppHeader.css"
import logo from "./styles/logo.jpeg"
import { useTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";

function App() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openLoginDrawer, setOpenLoginDrawer] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isDark, setIsDark] = useState(false);

  const darkTheme = createTheme({
    breakpoints: {
      values: {
        md: 1595
      },
    },
    palette: {
      mode: "dark",
      background: {
        default: '#750B0D'
      }
    }
  });
  
  const lightTheme = createTheme({
    breakpoints: {
      values: {
        md: 1595
      },
    },
    palette: {
      mode: "light",
      background: {
        default: '#FFFFFF'
      }
    }
  });

  const theme = isDark ? darkTheme : lightTheme;
  const isMdScreen = useMediaQuery(theme.breakpoints.up('md'));
  const [openLogo, setOpenLogo] = useState(true);
  const [openBox, setOpenBox] = useState(true);

  const DarkSwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            '#fff',
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
      width: 32,
      height: 32,
      '&::before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      borderRadius: 20 / 2,
    },
  }));
  
  useEffect(() => {
    if (!isMdScreen) {
      setOpenLogo(false);
      setOpenBox(false);
    }
    else {
      setOpenLogo(true);
      setOpenBox(true);
    }
  }, [isMdScreen])

  const SettingsDrawer = () => (
    <Box sx={{alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
      <List>
        <ListItem>
          {/* <FormGroup>
            <FormControlLabel
               control={
                <Switch onChange={setIsDark(!isDark)} />
              }
            />
          </FormGroup> */}
          <Button variant="outlined" color="error" sx={{left: 0, width: 175, top: 800}} onClick={() => {
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
            <Box sx={{ border: '1px solid grey', padding: 0.5, borderRadius: 1, width: 165 }}>
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
            <Button variant="outlined" color="error" sx={{left:0, width: 175, top:750}} onClick={() => {
              setLoggedIn(false);
            }}>
              Sign Out
            </Button>
          </ListItem>
          <ListItem>
            <Button variant="outlined" color="error" sx={{left:0, width: 175, top: 650}} onClick={() => {
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
          <List>+
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
        <Table firstName={user.firstName} lastName={user.lastName}/>
        </>);
    }
    else {
      return (
        <>
        <Collapse in={openBox}>
            <Box sx={{
              borderRadius: 0,
              width: 600,
              height: 1020,
              bgcolor: 'primary.main',
              backgroundColor: '#D84040'
          }}></Box>
        </Collapse>
        <Collapse in={openLogo}>
            <Box sx={{
              width: 500,
              height: 800,
              backgroundImage: `url(${logo})`,
              backgroundSize: 500,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundColor: 'white',
              border: 10,
              borderColor: 'grey.500',
              zIndex: 1, 
              position: 'absolute',
              top: '200px',
              left: '125px'
          }}></Box>
        </Collapse>
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
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <CssBaseline/>
      <Main/>
    </ThemeProvider>
  )
}

export default App;