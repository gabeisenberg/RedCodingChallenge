import React, { Dispatch, SetStateAction, useState } from "react";
import {Box, TextField, Button, Alert, IconButton, Collapse} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

interface IProps {
    setter: Dispatch<SetStateAction<any>>;
    logger: Dispatch<SetStateAction<boolean>>;
}

function Login (props : IProps) {
    const {setter, logger} = props;

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [open, setOpen] = useState(false);

    async function handleLogInSubmit() {
        const response: any = await fetch('http://localhost:5211/api/User/Login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "userName": userName,
                "passWord": password
            })
        })
        .then(response => {
            if (!response.ok) {
                setOpen(true);
                throw new Error('bad network');
            }
            return response.json();
        })
        .then((json) => {
            const newUser = {
                userName: json.userName,
                firstName: json.firstName,
                lastName: json.lastName,
                passWord: json.passWord
            };
            console.log(newUser, 'user here');
            setter(newUser);
            logger(true);
            return;
        })
        .catch(error => {
            setOpen(true);
            console.log(error, userName, password);
        });
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
                    Error logging in!
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
                        handleLogInSubmit();
                    }}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        // id="email"
                        label="User Name"
                        name="username"
                        autoComplete="email"
                        // value={userName}
                        // autoFocus
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
                        // autoComplete="current-password"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setPassword(event.target.value);
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, backgroundColor: '#D84040' }}
                    >
                        Log In
                    </Button>
                </Box>
            </Box>
        </>
    )
}

export default Login;