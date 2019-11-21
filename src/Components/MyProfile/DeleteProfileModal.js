import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios'
import { AUTHENTICATED } from '../../constants/sessionstorage';
export default function DeleteProfileModal( params ) {
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    setOpen(params.isOpen);
}, [params])

  const handleDelete = () => {
    setOpen(false);
    let config = {
        headers: {
            'Authorization': sessionStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    }
    axios
    .delete('https://ifinanzas-api.herokuapp.com/users', config)
    .then(res => {
        params.handleDelete()
        setOpen(false);
        sessionStorage.removeItem(AUTHENTICATED);
        sessionStorage.removeItem('token');
        window.location = '/login'
    })
    .catch(err => {
        console.log(err)
        params.handleDelete()
        alert("Hubo un error al borrar tu cuenta")
    }) 
 
  };
  const handleClose = () => {
    params.handleDelete()
    setOpen(false);

  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Eliminar perfil"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estas seguro que deseas eliminar tu perfil?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}