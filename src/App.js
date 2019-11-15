import React from 'react';
import './Login.css';
import Home from './Components/Home'
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import MyProfile from './Components/MyProfile/MyProfile';
import { ProtectedRoute } from "./Components/ProtectedRoute/ProtectedRoute";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import AccountsContainer from './Components/Accounts/Container';


const theme = createMuiTheme({
  palette: {
    primary: { main: '#126510' },
  }
});
function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Switch>
          <ProtectedRoute path="/myprofile" component={MyProfile} exact/>
          <Route path="/signup" component={SignUp} exact />
          <Route path="/login"  component={Login} exact />
          <ProtectedRoute path="/home" component={Home} exact />
          <ProtectedRoute path="/accounts" component={AccountsContainer} exact />
          <Route path="/" component={Login} />
        </Switch>
      </Router>


    </MuiThemeProvider>

  );
}

export default App;
