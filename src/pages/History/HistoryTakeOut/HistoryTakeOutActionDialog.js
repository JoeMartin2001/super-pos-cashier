import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { socketIO } from '../../../common/socketIO';

const HistoryTakeOutActionDialog = ({order}) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    return (
      <div>
        <Button size="small" color="secondary" onClick={() => setOpen(true)}>Удалить</Button>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Вы уверены?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Удалить {order.tableNum} - ый заказ с архива?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color="secondary">
              Нет
            </Button>
            <Button  onClick={() => socketIO.emit('delete_closed_takeOut', order._id)} color="primary" autoFocus>
              Да
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}

export default HistoryTakeOutActionDialog
