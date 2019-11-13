
import React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import { CssBaseline, Drawer, AppBar, Toolbar, List } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItems } from '../ListItems';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import baseUrl from '../../constants/urls';
import PropTypes from 'prop-types';
import Account from './Account';
import AccountModal from './AccountModal';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import AddAccountModal from './AddAccountModal';
import { thisExpression } from '@babel/types';

const drawerWidth = 240;
const useStyles = theme => ({
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
    loadingSpinner: {
        position: 'absolute',
        left: '50%',
        top: '50%'
    },
    fab: {
        margin: theme.spacing(1),
        position: 'absolute',
        bottom: '4%',
        right: '4%'
    }
});

class AccountsContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            accounts: null,
            open: false,
            openModal: false,
            isAddModalOpen: false,
            selectedAccount: {}
        }
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleCloseAddAccModal = this.handleCloseAddAccModal.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleOpenAddAccModal = this.handleOpenAddAccModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);
        this.handleAddNewAccount = this.handleAddNewAccount.bind(this);
    }

    handleCloseModal() {
        this.setState({ openModal: false });
    }
    handleOpenModal = data => {
        this.setState({ openModal: true, selectedAccount: { ...data } });
    }
    handleSaveButtonClick() {
        const config = {
            headers: {
                'Authorization': sessionStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        }
        const data = {
            balance: this.state.selectedAccount.balance,
            description: this.state.selectedAccount.description,
            name: this.state.selectedAccount.name,
            type: this.state.selectedAccount.type
        }
        axios.patch(baseUrl.baseUrl + 'accounts/' + this.state.selectedAccount._id, data, config)
            .then(res => {
                this.handleCloseModal();
                axios.get(baseUrl.baseUrl + 'accounts', config)
                    .then(res => {
                        this.setState({ accounts: res.data });
                    }).catch(err => {
                        console.log(err);
                    });
            }).catch(err => {
                console.log(err);
            });
    }
    handleOpenAddAccModal = data => {
        this.setState({ isAddModalOpen: true });
    }
    handleCloseAddAccModal() {
        this.setState({ isAddModalOpen: false });
    }
    handleChange(event) {
        let prevState = this.state.selectedAccount;
        prevState[event.target.name] = event.target.value;
        this.setState({
            selectedAccount: prevState
        });
    }
    handleAddNewAccount(data) {
        const config = {
            headers: {
                'Authorization': sessionStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        }
        axios.post(baseUrl.baseUrl + 'accounts/', data, config)
            .then(res => {
                this.handleCloseAddAccModal();
                axios.get(baseUrl.baseUrl + 'accounts', config)
                    .then(res => {
                        this.setState({ accounts: res.data });
                    }).catch(err => {
                        console.log(err);
                    });
            }).catch(err => {
                console.log(err);
            });
    }
    componentWillMount() {
        const config = {
            headers: {
                'Authorization': sessionStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        }
        axios.get(baseUrl.baseUrl + 'accounts', config)
            .then(res => {
                this.setState({ accounts: res.data });
            }).catch(err => {
                console.log(err);
            });
    }

    render() {
        const { classes } = this.props;
        if (this.state.accounts === null) {
            return (
                <div>
                    <CircularProgress className={classes.loadingSpinner} />
                </div>)
        }

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="absolute" color="primary" className={clsx(classes.appBar, this.state.open && classes.appBarShift)}>
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            edge="start"
                            color="green"
                            aria-label="open drawer"
                            // onClick={this.setState({ open: true })}
                            className={clsx(classes.menuButton, this.state.open && classes.menuButtonHidden)}
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
                        paper: clsx(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
                    }}
                    open={this.state.open}
                >
                    <div className={classes.toolbarIcon}>
                        <IconButton>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>{mainListItems}</List>
                    <Divider />
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                        <Grid container spacing={3}>
                            {/* All accounts */}
                            {this.state.accounts.map(account => {
                                return (
                                    <Grid item xs={12} md={4} lg={3}>
                                        <Paper className={classes.paper}>
                                            <Account account={account} handleClick={this.handleOpenModal}></Account>
                                        </Paper>
                                    </Grid>
                                )
                            })}
                        </Grid>
                        <AccountModal
                            account={this.state.selectedAccount}
                            handleCloseModal={this.handleCloseModal}
                            isOpen={this.state.openModal}
                            handleChange={this.handleChange}
                            handleSave={this.handleSaveButtonClick}
                            handleCancel={this.handleCloseModal}></AccountModal>

                        <AddAccountModal
                            isOpen={this.state.isAddModalOpen}
                            handleClose={this.handleCloseAddAccModal}
                            handleSave={this.handleAddNewAccount}></AddAccountModal>
                        <Fab color="primary" aria-label="add" className={classes.fab} onClick={this.handleOpenAddAccModal}>
                            <AddIcon />
                        </Fab>
                    </Container>
                </main>
            </div>
        );
    }
}

AccountsContainer.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(useStyles, { withTheme: true })(AccountsContainer);