import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { IconButton } from '@material-ui/core';
import { socketIO } from '../../../common/socketIO';

const HistoryOrderActionDialog = ({order}) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    return (
      <div>
        <IconButton onClick={handleClickOpen}>
            <DeleteForeverIcon />
        </IconButton>
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
            <Button onClick={() => socketIO.emit('delete_closed_table', order._id)} color="primary" autoFocus>
              Да
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}

export default HistoryOrderActionDialog
