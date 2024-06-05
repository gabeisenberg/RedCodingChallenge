import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'
import { createTheme, useTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';

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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={lightTheme}>
    <CssBaseline/>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeProvider>,
)
