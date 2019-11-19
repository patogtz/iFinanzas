import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import baseUrl from '../../constants/urls';

class AccountsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            moves: null
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
                console.log(res.data)
                this.setState({ moves: res.data });
            }).catch(err => {
                console.log(err);
            });
    }

    render() {
        if (this.state.moves === null) {
            return (<div>
                <p>Loading...</p>
            </div>)
        }
        else {
            return (
                <React.Fragment>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Tipo</TableCell>
                                <TableCell align="right">Balance</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.moves.map(move => (
                                <TableRow key={move._id}>
                                    <TableCell>{move.name}</TableCell>
                                    <TableCell>{move.type}</TableCell>
                                    <TableCell align="right">{move.balance}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {/* <div className={classes.seeMore}>
                        <Link color="primary" href="javascript:;">
                            See more orders
                        </Link>
                    </div> */}
                </React.Fragment>
            )
        }
    }
}

export default AccountsList;