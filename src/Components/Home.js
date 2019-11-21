import React from 'react';
import clsx from 'clsx';
import { makeStyles, createMuiTheme, withStyles, Typography, Divider, IconButton, Container, Grid, Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField, InputLabel, InputAdornment, FormControl, Select, MenuItem, Button, Fab, CssBaseline, Drawer, AppBar, Toolbar, List } from '@material-ui/core';
import PropTypes from 'prop-types';
import { ChevronLeft, Add, Menu} from '@material-ui/icons';
import { mainListItems } from './ListItems';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import AccountsList from './AccountsList/AccountsList';
import { Redirect } from 'react-router-dom';
import TotalBalance from './TotalBalance/TotalBalance';
import axios from 'axios';

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
	fab: {
		position: 'absolute',
		bottom: theme.spacing(2),
		right: theme.spacing(2),
	}
}));

const config = {
	headers: {
		"Authorization": "Bearer " + sessionStorage.getItem('token'),
		'Content-Type': 'application/json'
	}
}

export default function Dashboard() {
	const [accounts, setAccounts] = React.useState([]);
	React.useEffect(() => {
		axios.get('https://ifinanzas-api.herokuapp.com/accounts', config)
			.then(res => {
				setAccounts(res.data);
			}).catch(err => {
				console.log(err);
			});
	}, []);

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

	const [amount, setAmount] = React.useState(0);
	const [description, setDescription] = React.useState('');
	const [date, setDate] = React.useState('');
	const [moveType, setMoveType] = React.useState('');
	const [accountTransfer, setAccountTransfer] = React.useState('');
	const [account, setAccount] = React.useState('');
	const [category, setCategory] = React.useState('');
	const [comment, setComment] = React.useState('');

	const [openDestination, setDestination] = React.useState(false);
	const [openDialog, setOpenDialog] = React.useState(false);
	const [submitState, setSubmitState] = React.useState(true);
	React.useEffect(() => {
		if (amount > 0 && moveType.length > 0 && moveType !== "transfer" && category.length > 0 && date.length > 0 && account.length > 0) {
			setSubmitState(false);
		} else {
			if (moveType === "transfer" && accountTransfer.length > 0) {
				setSubmitState(false)
			} else {
				setSubmitState(true);
			}
		}
	}, [amount, moveType.length, category.length, date.length, account.length, moveType, accountTransfer.length]);
	const handleClickOpenDialog = () => {
		setOpenDialog(true);
		setAmount(0);
		setDescription('');
		setDate('');
		setMoveType('');
		setAccount('');
		setAccountTransfer('');
		setCategory('');
		setComment('');
		setDestination(false);
		setSubmitState(true);
	};
	const handleCloseDialog = () => {
		setOpenDialog(false);
		setSubmitState(true);
	};
	const handleSubmitDialog = () => {
		handleCloseDialog();

		axios.post('https://ifinanzas-api.herokuapp.com/moves', {
			type: moveType,
			amount: Number(amount),
			category: category,
			date: date,
			description: description,
			comments: comment,
			origin: account,
			destination: accountTransfer
		}, config)
			.then(res => {
				console.log(res)
			})
			.catch(err => {
				console.log(err)
			})
	};

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
            <Menu />
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
            <ChevronLeft />
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
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <Chart />
              </Paper>
            </Grid>
            {/* Total Balance */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <TotalBalance />
              </Paper>
            </Grid>
            {/* Accounts List */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <AccountsList/>
              </Paper>
            </Grid>
          </Grid>
        </Container>
		<Fab color="primary" aria-label="add" className={classes.fab} onClick={handleClickOpenDialog}>
			<Add />
		</Fab>
      </main>

		<Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="form-dialog-title" maxWidth={"xs"} fullWidth={true}>
			<DialogTitle id="form-dialog-title">Agregar Movimiento</DialogTitle>
			<DialogContent>
				<form>
					<FormControl className={classes.formControl} fullWidth>
						<InputLabel id="moveAccount-label">Cuenta(*)</InputLabel>
						<Select
							id="moveAccount"
							value={account}
							onChange={event => setAccount(event.target.value)}
						>
							{accounts.map(option => (
								<MenuItem key={option.id} value={option.id}>
									{option.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<TextField
						autoFocus
						margin="dense"
						id="amount"
						label="Cantidad(*)"
						type="number"
						InputProps={{
							startAdornment: <InputAdornment position="start">$</InputAdornment>,
						}}
						fullWidth
						onChange={event => setAmount(event.target.value)}
					/>
					<TextField
						id="date"
						label="Fecha(*)"
						type="date"
						className={classes.textField}
						InputLabelProps={{
							shrink: true,
						}}
						fullWidth
						onChange={event => setDate(event.target.value)}
					/>
					<TextField
						margin="dense"
						id="descripcion"
						label="Descripcion"
						type="text"
						className={classes.textField}
						fullWidth
						onChange={event => setDescription(event.target.value)}
					/>
					<FormControl className={classes.formControl} fullWidth>
						<InputLabel id="moveType-label">Tipo(*)</InputLabel>
						<Select
							id="moveType"
							value={moveType}
							onChange={event => {
								if (event.target.value === "transfer") {
									setDestination(true);
								} else {
									setDestination(false);
									setAccountTransfer('');
								}
								setMoveType(event.target.value)
							}
							}
						>
							<MenuItem value={"income"}>Ingreso</MenuItem>
							<MenuItem value={"expense"}>Egreso</MenuItem>
							<MenuItem value={"transfer"}>Transferencia</MenuItem>
						</Select>
					</FormControl>
					{openDestination &&
					<FormControl className={classes.formControl} fullWidth>
						<InputLabel id="moveAccountTransfer-label">Cuenta Destino(*)</InputLabel>
						<Select
							id="moveAccountTransfer"
							value={accountTransfer}
							onChange={event => setAccountTransfer(event.target.value)}
						>
							{accounts.map(option => (
								<MenuItem key={option.id} value={option.id}>
									{option.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					}
					<FormControl className={classes.formControl} fullWidth>
						<InputLabel id="category-label">Categoría(*)</InputLabel>
						<Select
							id="moveCategory"
							value={category}
							onChange={event => setCategory(event.target.value)}
						>
							<MenuItem value={"food/drinks"}>Comida/bebida</MenuItem>
							<MenuItem value={"shopping"}>Compras</MenuItem>
							<MenuItem value={"housing"}>Hogar</MenuItem>
							<MenuItem value={"transportation"}>Transporte</MenuItem>
							<MenuItem value={"vehicle"}>Coche</MenuItem>
							<MenuItem value={"entertainment"}>Entretenimiento</MenuItem>
							<MenuItem value={"communication/pc"}>Comunicacion/PC</MenuItem>
							<MenuItem value={"financialExpenses"}>Gasto financiero</MenuItem>
							<MenuItem value={"investments"}>Inversion</MenuItem>
							<MenuItem value={"income"}>Ingreso</MenuItem>
							<MenuItem value={"others"}>Otro</MenuItem>
						</Select>
					</FormControl>
					<TextField
						id="comentarios"
						label="Comentarios"
						multiline
						rows="2"
						className={classes.textField}
						margin="normal"
						fullWidth
						onChange={event => setComment(event.target.value)}
					/>
				</form>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleCloseDialog} color="secondary">Cancelar</Button>
				  <Button onClick={handleSubmitDialog} color="primary" disabled={submitState}>Agregar</Button>
			</DialogActions>
		</Dialog>
    </div>
  );
}