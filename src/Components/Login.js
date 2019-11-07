import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
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
import { Redirect } from 'react-router-dom';
import baseUrl from '../constants/urls';
import { withStyles } from '@material-ui/styles';

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
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isInvalid: false,
            user: {}
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.onLoginClick = this.onLoginClick.bind(this);
        this.loginRequest = this.loginRequest.bind(this);
    }

    render() {
        const { classes } = this.props;
        if (sessionStorage.getItem(AUTHENTICATED)) {
            return <Redirect to='/home' />
        }
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
                                    onChange={this.handleEmailChange}
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
                                    onChange={this.handlePasswordChange}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.onLoginClick}>
                            Ingresar
                        </Button>
                    </form>
                </div>
                <Box mt={5}>
                </Box>
            </Container>
        )
    }

    handleEmailChange(event) {
        this.setState({ email: event.target.value });
    }
    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    onLoginClick() {
        this.loginRequest();
    }

    loginRequest() {
        console.log(baseUrl)
        axios
            .post(baseUrl.baseUrl + 'users/login', {
                email: this.state.email,
                password: this.state.password
            })
            .then(res => {
                console.log(res);

                if (res.data.error) {
                    this.setState({ isInvalid: true })
                } else {
                    console.log(res);
                    sessionStorage.setItem(AUTHENTICATED, true);
                    sessionStorage.setItem('token', res.data.token);
                    this.setState({
                        isInvalid: false
                    })
                };

            })
            .catch(err => {
                console.log(err);
                if (axios.isCancel(err)) {
                    console.log(err.message);
                }
            });
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(useStyles) (Login);