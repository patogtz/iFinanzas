import React from 'react';
import logo from './logo.svg';
import './Login.css';
import Home from './Components/Home'
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";


const theme = createMuiTheme({
  palette: {
    primary: {main: '#126510'},
  }
});
function App() {
  return (
    <MuiThemeProvider theme={theme}>
     <Router>
     <Switch>
          <Route path="/signup" component={SignUp} exact/>
          <Route path="/login" exact component={Login} exact/>
          <Route path="/home" component={Home} exact />
          <Route path="/" component={Login} />
        </Switch>
        </Router>


    </MuiThemeProvider>
   
  );
}

export default App;
