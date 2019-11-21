import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import baseUrl from '../../constants/urls';
const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
});

class TotalBalance extends React.Component {
    constructor() {
        super();
        this.state = {
            totalBalance: null
        }
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
                let sum = 0;
                for (let i = 0; i < res.data.length; i++) {
                    sum = sum + res.data[i].balance;
                }
                this.setState({ totalBalance: sum });
            }).catch(err => {
                console.log(err);
            });
    }

    render() {
        if (this.state.totalBalance === null) {
            return (<div>
                <p>Loading...</p>
            </div>)
        }
        else {
            return (
                <React.Fragment>
                    <Typography component="p" variant="h4">
                        ${this.state.totalBalance}
                    </Typography>
                    <Typography color="textSecondary" >
                        as of today.
                    </Typography>
                    <div>
                        <Link color="primary" onClick={() => {window.location='/accounts'}}>
                            View balances
                        </Link>
                    </div>
                </React.Fragment>
            );
        }
    }
}

export default TotalBalance;