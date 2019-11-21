import React from 'react';
import { Dialog, DialogTitle, Grid, CircularProgress, FormControl, InputLabel, Input, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import baseUrl from '../constants/urls';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
    },
    gridElement: {
        paddingLeft: '5%',
        paddingRight: '5%'
    }
});

class AddMoveModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            name: '',
            type: '',
            amount: 0,
            description: '',
            account: '',
            accounts: null
        }
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSaveNewMove = this.handleSaveNewMove.bind(this);
        this.handleCancelNewMove = this.handleCancelNewMove.bind(this);
    }
    handleClose() {
        this.setState({ open: false })
    }

    handleChange(event) {
        let change = {};
        change[event.target.name] = event.target.value;
        this.setState(change);
    }
    handleSaveNewMove() {
        let account = {
            name: this.state.name,
            type: this.state.type,
            amount: this.state.amount,
            description: this.state.description,
            origin: this.state.account
        }
        this.props.handleSave(account);
        this.props.handleClose();
    }
    handleCancelNewMove() {
        this.setState({
            name: '',
            type: '',
            amount: 0,
            description: '',
            account: ''
        })
        this.props.handleClose();
    }

    getAccounts() {
        let accounts = this.state.accounts.map(account => {
            return (<MenuItem value={account.id}>{account.name}</MenuItem>)
        })
        return accounts;
    }

    componentWillMount() {
        let config = {
            headers: {
                'Authorization': sessionStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        }
        axios.get(baseUrl.baseUrl + 'accounts', config)
            .then(res => {
                this.setState({ moves: res.data });
            }).catch(err => {
                console.log(err);
            });
    }
    render() {
        const { classes } = this.props;
        if(this.state.accounts === null) {
            return(<div></div>)
        }
        return (
            <Dialog
                aria-labelledby="simple-dialog-title"
                open={this.props.isOpen}
                onClose={this.props.handleClose}>
                <DialogTitle id="add-account">Agregar Movimiento</DialogTitle>
                <Grid container spacing={3} className={classes.gridElement}>
                    <Grid item xs={12} md={12}>
                        <FormControl fullWidth className={classes.margin}>
                            <InputLabel htmlFor="component-helper">Tipo de Movimiento</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                name="type"
                                id="type"
                                value={this.state.type}
                                onChange={this.handleChange}
                            >
                                <MenuItem value={'income'}>Ingreso</MenuItem>
                                <MenuItem value={'expense'}>Egreso</MenuItem>
                            </Select>
                            {/* <FormHelperText id="component-helper-text">Some important helper text</FormHelperText> */}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <FormControl fullWidth className={classes.margin}>
                            <InputLabel htmlFor="component-helper">Cuenta</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                name="type"
                                id="type"
                                value={this.state.type}
                                onChange={this.handleChange}
                            >
                                {this.getAccounts()}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <FormControl fullWidth className={classes.margin}>
                            <InputLabel htmlFor="standard-adornment-amount">Cantidad</InputLabel>
                            <Input
                                id="amount"
                                name="amount"
                                value={this.state.amount}
                                onChange={this.handleChange}
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            />
                        </FormControl>

                    </Grid>
                    <Grid item xs={12} md={12}>
                        <FormControl fullWidth className={classes.margin}>
                            <InputLabel htmlFor="component-helper">Descripción</InputLabel>
                            <Input
                                id="description"
                                name="description"
                                value={this.state.description}
                                onChange={this.handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <Button color="primary" name="save" onClick={this.handleSaveNewMove}> Guardar</Button>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <Button color="secondary" name="cancel" onClick={this.handleCancelNewMove}> Cancelar</Button>
                    </Grid>
                </Grid>
            </Dialog>
        )
    }
}

AddMoveModal.propTypes = {
    classes: PropTypes.object.isRequired
}
export default withStyles(useStyles, { withTheme: true })(AddMoveModal);