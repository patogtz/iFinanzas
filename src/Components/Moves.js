import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {CssBaseline, Drawer, AppBar, Toolbar, List, TextField, Button, Grid, CircularProgress, Card } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItems } from './ListItems';
import axios from "axios"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import baseUrl from '../constants/urls';

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
    table: {
        minWidth: 650,
        width: "80%",
        margin: "auto",
        marginTop: "70px"
      },
    tHead: {
        fontWeight: "bold"
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
  export default function Moves() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [moves, setMoves] = React.useState([]);
   
    const [loading, setLoading] = React.useState(true)
    useEffect(() => {
        setLoading(true)
        getMoveInfo();
      }, []);
    const getMoveInfo = () => {
        let config = {
            headers: {
                'Authorization': sessionStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        }
        axios.get(baseUrl.baseUrl + "moves", config)
            .then(res => {
                setMoves(res.data)
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
          <Divider />
        </Drawer>
        {loading ? 
            <CircularProgress  />  
            :
           <main className={classes.content}>
            <Table className={classes.table}>
                        <TableHead className={classes.tHead}>
                            <TableRow>
                                <TableCell>Tipo</TableCell>
                                <TableCell>Categoria</TableCell>
                                <TableCell>Cantidad</TableCell>
                                <TableCell>Descripcion</TableCell>
                                <TableCell align="right">Fecha</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {moves.map(move => (
                                <TableRow key={move._id}>
                                    <TableCell>{move.type}</TableCell>
                                    <TableCell>{move.category}</TableCell>
                                    <TableCell>{move.amount}</TableCell>
                                    <TableCell>{move.description}</TableCell>
                                    <TableCell align="right">{move.date}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    </main>
            
            }

      </div>
    );
  }