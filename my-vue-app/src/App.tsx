import Table from "./Table"
import AppHeader from "./AppHeader"
import { List, ListItem, Box, Drawer, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./AppHeader.css"

function App() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [username, setUsername] = useState("");

  const handleClickLogIn = () => {
    setOpenLogin(!openLogin);
  }

  const handleSubmit = () => {
    console.log(username);
    handleClickLogIn();
  }

  function LoginClick() {
    return (<React.Fragment>
          <Button variant="outlined" onClick={handleClickLogIn}>
            Log In
          </Button>
          <Dialog
            open={openLogin}
            onClose={handleClickLogIn}
            PaperProps={{
              component: 'form',
              onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const formJson = Object.fromEntries((formData as any).entries());
                const name = formJson.username;
                setUsername(name);
                handleSubmit();
              },
            }}
          >
            <DialogTitle>Enter Account Information</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Enter your username:
                </DialogContentText>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="name"
                  name="username"
                  label="username"
                  type="text"
                  fullWidth
                  variant="standard"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClickLogIn}>Cancel</Button>
                <Button type="submit" onSubmit={handleClickLogIn}>Submit</Button>
              </DialogActions>
          </Dialog>
      </React.Fragment>);
  }

  const LoginDrawer = (
    <Box sx={{alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
      <List>
        <ListItem>
          <LoginClick/>
        </ListItem>
        <ListItem>
          <Button variant="outlined" onClick={() => {
            setOpenDrawer(false);
            console.log("cancel!");
          }}>Cancel</Button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <Drawer open={openDrawer} anchor='right' PaperProps={{sx:{width: 200}}}>
        {LoginDrawer}
      </Drawer>
      <AppHeader handleClick={setOpenDrawer}/>
      <Table/>
    </>
  )
}

export default App;