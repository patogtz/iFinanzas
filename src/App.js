import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Components/Home'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {main: '#126510' },
  }
});
function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Home/>
    </MuiThemeProvider>

   
  );
}

export default App;
