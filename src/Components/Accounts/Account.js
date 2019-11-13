import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import baseUrl from '../../constants/urls';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
    depositContext: {
        flex: 1,
    }
}));

class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false
        }
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.sendData = this.sendData.bind(this);
    }

    handleButtonClick() {
        this.setState({ modalOpen: true });
    }

    sendData() {
        this.props.handleClick(this.props.account);
    }
    render() {
        return (
            <React.Fragment>
                <Typography component="p" variant="h4">
                    ${this.props.account.balance}
                </Typography>
                <Typography color="textSecondary">
                    {this.props.account.name}
                </Typography>
                <Button color="primary" name={this.props.account.id} onClick={this.sendData}>See account</Button>
            </React.Fragment>
        )
    }
}


export default (Account);