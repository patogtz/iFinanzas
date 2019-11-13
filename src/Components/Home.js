import React from 'react';
import clsx from 'clsx';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline, Drawer, AppBar, Toolbar, List } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItems, secondaryListItems } from './ListItems';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
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
	modal: {
		position: 'absolute',
		width: "50%",
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		padding: theme.spacing(2, 4, 3),
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
		"Authorization": sessionStorage.getItem('token'),
		'Content-Type': 'application/json'
	}
}

export default function Dashboard() {
	const classes = useStyles();
	
	const [open, setOpen] = React.useState(true);
	const handleDrawerOpen = () => {
		setOpen(true);
	};
	const handleDrawerClose = () => {
		setOpen(false);
	};
	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

	const [amount, setAmount] = React.useState('');
	const [description, setDescription] = React.useState('');
	const [date, setDate] = React.useState('');
	const [moveType, setMoveType] = React.useState('');
	const [account, setAccount] = React.useState('');
	const [category, setCategory] = React.useState('');
	const [comment, setComment] = React.useState('');	

	const [openDialog, setOpenDialog] = React.useState(false);
	const handleClickOpenDialog = () => {
		setOpenDialog(true);
		setAmount('');
		setDescription('');
		setDate('');
		setMoveType('');
		setAccount('');
		setCategory('');
		setComment('');
	};
	const handleCloseDialog = () => {
		setOpenDialog(false);
	};
	const handleSubmitDialog = () => {
		handleCloseDialog();
		console.log(amount,description,date,moveType,account,category,comment);
		
		console.log(config);
		console.log(sessionStorage.getItem('token'));
		axios.post('http://ifinanzas-api.herokuapp.com/moves', {
			type: moveType,
			amount: amount,
			date: date,
			description: description,
			comments: comment,
			origin: "5dca072ac9159c0017c2a133"
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
						<MenuIcon />
					</IconButton>
					<Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
						iFinanzas
          </Typography>
					<Typography component="h5" variant="h6" color="inherit" noWrap className={classes.subtitle}>
						Bienvenido, Patricio
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
				<List>{secondaryListItems}</List>
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
						{/* Recent Deposits */}
						<Grid item xs={12} md={4} lg={3}>
							<Paper className={fixedHeightPaper}>
								<Deposits />
							</Paper>
						</Grid>
						{/* Recent Orders */}
						<Grid item xs={12}>
							<Paper className={classes.paper}>
								<Orders />
							</Paper>
						</Grid>
					</Grid>
				</Container>
				<Fab color="primary" aria-label="add" className={classes.fab} onClick={handleClickOpenDialog}>
					<AddIcon />
				</Fab>
			</main>

			<Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="form-dialog-title" maxWidth={"xs"} fullWidth={true}>
				<DialogTitle id="form-dialog-title">Agregar Movimiento</DialogTitle>
				<DialogContent>
					<form>
						<TextField
							autoFocus
							margin="dense"
							id="amount"
							label="Amount"
							type="number"
							InputProps={{
								startAdornment: <InputAdornment position="start">$</InputAdornment>,
							}}
							fullWidth
							onChange={event => setAmount(event.target.value)}
						/>
						<TextField
							id="date"
							label="Fecha"
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
							<InputLabel id="moveType-label">Tipo</InputLabel>
							<Select
								id="moveType"
								value={moveType}
								onChange={event => {
									if (event.target.value === "transfer") {
										console.log('transfer');
									}
									setMoveType(event.target.value)
								}
								}
							>
								<MenuItem value={"income"}>Ingreso</MenuItem>
								<MenuItem value={"outcome"}>Egreso</MenuItem>
								{/* <MenuItem value={"transfer"}>Transferencia</MenuItem> */}
							</Select>
						</FormControl>
						<FormControl className={classes.formControl} fullWidth>
							<InputLabel id="moveAccount-label">Cuenta</InputLabel>
							<Select
								id="moveAccount"
								value={account}
								onChange={event => setAccount(event.target.value)}
							>
								<MenuItem value={"a"}>Cuenta 1</MenuItem>
								<MenuItem value={"b"}>Cuenta 2</MenuItem>
								<MenuItem value={"c"}>Cuenta 3</MenuItem>
							</Select>
						</FormControl>
						<FormControl className={classes.formControl} fullWidth>
							<InputLabel id="category-label">Categoría</InputLabel>
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
					<Button onClick={handleSubmitDialog} color="primary">Agregar</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}