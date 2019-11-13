import React from 'react';
import { Dialog, DialogTitle, Grid, CircularProgress, FormControl, InputLabel, Input, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import baseUrl from '../../constants/urls';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';


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
class AccountModal extends React.Component {
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
    }
    handleClose() {
        this.setState({ open: false })
    }

    render() {
        const { classes } = this.props;

        return (
            <Dialog
                aria-labelledby="simple-dialog-title"
                open={this.props.isOpen}
                onClose={this.props.handleCloseModal}>
                <DialogTitle id={this.props.id}>Cuenta</DialogTitle>
                <Grid container spacing={3} className={classes.gridElement}>
                    <Grid item xs={12} md={12}>
                        <FormControl fullWidth className={classes.margin}>
                            <InputLabel htmlFor="component-helper">Nombre de la cuenta</InputLabel>
                            <Input
                                id="name"
                                name="name"
                                value={this.props.account.name}
                                onChange={this.props.handleChange}
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
                                id="type"
                                name="type"
                                value={this.props.account.type}
                                onChange={this.props.handleChange}
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
                                value={this.props.account.balance}
                                onChange={this.props.handleChange}
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
                                value={this.props.account.description}
                                onChange={this.props.handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <Button color="primary" name="save" onClick={this.props.handleSave}> Guardar</Button>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <Button color="secondary" name="cancel" onClick={this.props.handleCancel}> Cancelar</Button>
                    </Grid>
                </Grid>
            </Dialog>
        )
    }
}
AccountModal.propTypes = {
    classes: PropTypes.object.isRequired
}
export default withStyles(useStyles, { withTheme: true })(AccountModal);