import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/Person';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import ReceiptIcon from '@material-ui/icons/Receipt';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import AssignmentIcon from '@material-ui/icons/Assignment';

export const mainListItems = (
  <div>
    <ListItem button onClick={() => {window.location = '/home'}}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem>
    <ListItem button onClick={() => {window.location = '/myprofile'}}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Mi Perfil" />
    </ListItem>
    <ListItem button onClick={() => {window.location = '/accounts'}}>
      <ListItemIcon>
        <AccountBalanceWalletIcon />
      </ListItemIcon>
      <ListItemText primary="Mis cuentas" />
    </ListItem>
    <ListItem button onClick={() => {window.location = '/moves'}}>
      <ListItemIcon>
        <ReceiptIcon />
      </ListItemIcon>
      <ListItemText primary="Movimientos" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="Cerrar Sesión" />
    </ListItem>
  </div>
);
