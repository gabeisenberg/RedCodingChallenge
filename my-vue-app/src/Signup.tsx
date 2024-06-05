import React, { Dispatch, SetStateAction, useState } from "react";
import {Box, TextField, Button, IconButton, Collapse, Alert} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

interface IProps {
  setter: Dispatch<SetStateAction<any>>;
  logger: Dispatch<SetStateAction<boolean>>;
}

function Signup (props : IProps) {
   const {setter, logger} = props;

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [open, setOpen] = useState(false);
    
    async function handleSignUpSubmit() {
        if (password == confirmedPassword) {
          const response: any = await fetch('http://localhost:5211/api/User/Signin', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                "userName": userName,
                "firstName": firstName,
                "lastName": lastName,
                "passWord": password
              })
          })
          .then(async response => {
            if (!response.ok) {
                setOpen(true);
                throw new Error('bad network');
            }
            console.log(response, 'response is here');
            const newUser = {
              userName: userName,
              firstName: firstName,
              lastName: lastName,
              passWord: password
            }
            setter(newUser);
            logger(true);
            return response;
          });
          setOpen(true);
        }
        setOpen(true);
    }

    return (
      <>
        <Collapse in={open}>
            <Alert variant="outlined" severity="error" 
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setOpen(false);
                        }}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                sx={{ mb: 2 }}
                >
                Error signing up!
            </Alert>
        </Collapse>
        <Box
            sx={{  
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            }}
        >
            <Box 
                component="form"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSignUpSubmit();
                }}
                noValidate
                sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                name="firstName"
                label="First Name"
                // id="email"
                autoComplete="current-password"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setFirstName(event.target.value);
                }}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="lastName"
                label="Last Name"
                // id="last"
                autoComplete="current-password"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setLastName(event.target.value);
                }}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                // id="email"
                label="User Name"
                name="username"
                autoComplete="email"
                autoFocus
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setUserName(event.target.value);
                }}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                // id="password"
                autoComplete="current-password"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setPassword(event.target.value);
                }}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                // id="password"
                autoComplete="current-password"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setConfirmedPassword(event.target.value);
                }}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: '#D84040' }}
            >
                Sign Up
            </Button>
            </Box>
        </Box>
      </>
    )
}

export default Signup;