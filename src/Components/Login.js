import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { AUTHENTICATED, ADMIN } from '../constants/sessionstorage';

//import '../Login.css'
const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
export default function Login() {


  const classes = useStyles();

  const [emailL, setEmailsL] = React.useState("");
  const [passwordL, setPasswordsL] = React.useState("");
  const [isInvalid, setInValid] = React.useState(false);

  //const [toHome, setToHome] =React.useState(false);
  const submitValue = (e) => {
    /*axios.
    post('http://ifinanzas-api.herokuapp.com/users/login',{
      email: emailL,
      password: passwordL
    })
    .then(response =>{
      console.log(response);
    })
    .catch(error =>{
      console.log(error);
    });
    
    console.log(e);
    */

    axios
      .post('https://ifinanzas-api.herokuapp.com/users/login', {
        email: emailL,
        password: passwordL
      })
      .then(res => {
        console.log(res);

        if (res.data.error) {
          setInValid(true);
        } else {
          sessionStorage.setItem(AUTHENTICATED, true);
          setInValid(false);
        };

      })
      .catch(err => {
        console.log(err);
        if (axios.isCancel(err)) {
          console.log(err.message);
        }
      });
      
  }


  useEffect(() => {
    if (sessionStorage.getItem(AUTHENTICATED)) {
      window.location.href = '/home';
    }
  });

  return (

    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>

        <Typography component="h1" variant="h5">
          iFinanzas
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                onChange={event => setEmailsL(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="password"
                label="Contraseña"
                type="password"
                autoComplete="current-password"
                onChange={event => setPasswordsL(event.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submitValue}>
            Ingresar
          </Button>
        </form>
      </div>
      <Box mt={5}>
      </Box>
    </Container>
  );
}