import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import axios from "axios"
const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function EditProfile( params ) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState(params.userName);
  const [email, setEmail] = React.useState(params.userEmail);
  const [password, setPassword] = React.useState("");
  useEffect(() => {
    setOpen(params.isOpen);
}, [params])

  const handleClose = () => {
    params.setModalIsOpen(false)
    setOpen(false);
  };
  const handleSave = () => {
    let config = {
      headers: {
          'Authorization': sessionStorage.getItem('token'),
          'Content-Type': 'application/json'
      }
  }
      axios
      .patch('http://ifinanzas-api.herokuapp.com/users', {
        name: name,
        email: email
      }, config)
      .then(res => {
        params.setModalIsOpen(false)
        setOpen(false);
        params.saveNewContent(name,email)
      })
      .catch(err => {
        console.log(err)
      }) 
  };
 
  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Editar Perfil
        </DialogTitle>
        <DialogContent dividers>
          <TextField
                id="nombre"
                className={styles.textField}
                label="Nombre"
                margin="normal"
                fullWidth
                value={name}
                onChange={event => setName(event.target.value)}
            />
            <TextField
                id="email"
                className={styles.textField}
                label="Email"
                margin="normal"
                fullWidth
                value={email}
                onChange={event => setEmail(event.target.value)}
            />
             {/* <TextField
                id="password"
                type="password"
                className={styles.textField}
                label="Password"
                margin="normal"
                fullWidth
                onChange={event => setPassword(event.target.value)}
            /> */}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSave} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}