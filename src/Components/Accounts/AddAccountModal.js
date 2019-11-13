import React from 'react';
import { Dialog, DialogTitle, Grid, CircularProgress, FormControl, InputLabel, Input, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import baseUrl from '../../constants/urls';
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

class AddAccountModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            name: '',
            type: '',
            balance: 0,
            description: ''
        }
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSaveNewAcc = this.handleSaveNewAcc.bind(this);
        this.handleCancelNewAcc = this.handleCancelNewAcc.bind(this);
    }
    handleClose() {
        this.setState({ open: false })
    }

    handleChange(event) {
        console.log({...event})
        let change = {};
        change[event.target.name] = event.target.value;
        this.setState(change);
        console.log(change)
    }
    handleSaveNewAcc() {
        let account = {
            name: this.state.name,
            type: this.state.type,
            balance: this.state.balance,
            description: this.state.description
        }
        this.props.handleSave(account);
        this.props.handleClose();
    }
    handleCancelNewAcc() {
        this.setState({
            name: '',
            type: '',
            balance: 0,
            description: ''
        })
        this.props.handleClose();
    }

    render() {
        const { classes } = this.props;

        return (
            <Dialog
                aria-labelledby="simple-dialog-title"
                open={this.props.isOpen}
                onClose={this.props.handleClose}>
                <DialogTitle id="add-account">Agregar Cuenta</DialogTitle>
                <Grid container spacing={3} className={classes.gridElement}>
                    <Grid item xs={12} md={12}>
                        <FormControl fullWidth className={classes.margin}>
                            <InputLabel htmlFor="component-helper">Nombre de la cuenta</InputLabel>
                            <Input
                                id="name"
                                name="name"
                                value={this.state.name}
                                onChange={this.handleChange}
                                aria-describedby="component-helper-text"
                            />
                            {/* <FormHelperText id="component-helper-text">Some important helper text</FormHelperText> */}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <FormControl fullWidth className={classes.margin}>
                            <InputLabel htmlFor="component-helper">Tipo de la cuenta</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                name="type"
                                id="type"
                                value={this.state.type}
                                onChange={this.handleChange}
                            >
                                <MenuItem value={'bank'}>Banco</MenuItem>
                                <MenuItem value={'cash'}>Efectivo</MenuItem>
                                <MenuItem value={'another'}>Otro</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <FormControl fullWidth className={classes.margin}>
                            <InputLabel htmlFor="standard-adornment-amount">Balance</InputLabel>
                            <Input
                                id="balance"
                                name="balance"
                                value={this.state.balance}
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
                        <Button color="primary" name="save" onClick={this.handleSaveNewAcc}> Guardar</Button>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <Button color="secondary" name="cancel" onClick={this.handleCancelNewAcc}> Cancelar</Button>
                    </Grid>
                </Grid>
            </Dialog>
        )
    }
}

AddAccountModal.propTypes = {
    classes: PropTypes.object.isRequired
}
export default withStyles(useStyles, { withTheme: true })(AddAccountModal);