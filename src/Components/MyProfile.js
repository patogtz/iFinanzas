import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {CssBaseline, Drawer, AppBar, Toolbar, List, TextField, Button, Grid, CircularProgress, Card } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItems } from './ListItems';

import axios from "axios"
import EditProfile from './EditProfile'
//import '../Login.css'
const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    card: {
        minWidth: 275,
        width: "80%",
        margin: "auto",
        marginTop: "40px"
      },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: 'none',
    },
    title: {
      flexGrow: 1,
    },
    titlePer: {
        flexGrow: 1,
        fontSize: '28px'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 500,
      },
    subtitle: {
      fontSize: '16px'
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 240,
    },
    button: {
        margin: theme.spacing(1),
        marginLeft: "auto",
        textAlign: "right"
      },
  }));
  export default function MyProfile() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [userEmail, setUserEmail] = React.useState("");
    const [userName, setUserName] = React.useState("");
    const [modalIsOpen, setModalIsOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(true)
    useEffect(() => {
        setLoading(true)
        getUserInfo();
      }, []);
    const getUserInfo = () => {
        console.log(sessionStorage.getItem('token'))
        let config = {
            headers: {
                'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGIyMjc2OTZmOTJjODEwZGEwODcxMDMiLCJpYXQiOjE1NzMxNjkyMjYsImV4cCI6MTU3Mzc3NDAyNn0.81IbEc1GS0URIJ0f2FTkVOeeyTj12tPTWOslL0qzK7Q",
                'Content-Type': 'application/json'
            }
        }
        axios.get("https://ifinanzas-api.herokuapp.com/users", config)
            .then(res => {
                console.log(res.data)
                setUserEmail(res.data.email)
                setUserName(res.data.name)
                setLoading(false)

            }).catch(err => {
                console.log(err);
            });
    }
    const handleDrawerOpen = () => {
      setOpen(true);
    };
    const handleDrawerClose = () => {
      setOpen(false);
    };
    const handleEditClick = () => {
        console.log(userEmail)
        setModalIsOpen(true)
        console.log(modalIsOpen)
    }
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute" color="primary" className={clsx(classes.appBar, open && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="green"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              iFinanzas
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>{mainListItems}</List>
        </Drawer>
        {loading ? 
            <CircularProgress  />  
            :
           

            <main className={classes.content}>
             <Card className={classes.card}>
                    <EditProfile userEmail={userEmail} userName={userName} isOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}/>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                          <Grid item xs={12}>   
                              <PersonIcon/>
                              <Grid item xs={10}>
                                  <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.titlePer}>
                                      Mi Perfil
                                  </Typography>
                              </Grid>
                          </Grid>
                          <Divider />
                          <Grid item xs={12} md={12} lg={12}>
                              <TextField
                              id="standard-read-only-input"
                              label="Nombre"
                              defaultValue={userName}
                              className={classes.textField}
                              fullWidth
                              margin="normal"
                              onChange={e => setUserEmail(e.target.value)}
                              InputProps={{
                                  readOnly: true,
                                }}
                              />
                          </Grid>
                      <Grid item xs={12} md={12} lg={12}>
                          <TextField
                          id="standard-read-only-input"
                          label="Correo"
                          defaultValue={userEmail}
                          className={classes.textField}
                          fullWidth
                          margin="normal"
                          onChange={e => setUserEmail(e.target.value)}
                          InputProps={{
                              readOnly: true,
                            }}
                          />
                      </Grid>
                      <Grid item xs={12} md={12} lg={12} className={classes.button}>
                          <Button variant="contained" color="secondary" style={{ marginRight: "20px" }}>
                              Eliminar Cuentar
                          </Button>
                          <Button variant="contained" color="primary" className={classes.button} onClick={handleEditClick}>
                              Editar
                          </Button>
          
                      </Grid>
                  
                      
                    </Grid>
                    </Container>
                    </Card>
                  </main>

            
            }

      </div>
    );
  }


