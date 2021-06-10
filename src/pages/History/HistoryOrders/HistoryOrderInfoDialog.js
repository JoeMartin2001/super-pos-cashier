import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import HistoryOrderActionDialog from './HistoryOrderActionDialog';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import { base_url } from '../../../common/variables';

const HistoryOrderInfoDialog = ({order}) => {
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const handleClickOpen = (scrollType) => () => {
      setOpen(true);
      setScroll(scrollType);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
      if (open) {
        const { current: descriptionElement } = descriptionElementRef;
        if (descriptionElement !== null) {
          descriptionElement.focus();
        }
      }
    }, [open]);
  
    return (
      <div>
        <ListItem button onClick={handleClickOpen('paper')}>
            <ListItemIcon>
                <Avatar>{order.tableNum}</Avatar>
            </ListItemIcon>
            <ListItemText inset primary={order.userId.name} />
            <ListItemSecondaryAction>
                <HistoryOrderActionDialog order={order} />
            </ListItemSecondaryAction>
        </ListItem>
        <Dialog
          open={open}
          onClose={handleClose}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">Детали</DialogTitle>
          <DialogContent dividers={scroll === 'paper'}>
            <div style={styles.dialogItem}>
                <p>Номер заказа: </p>
                <p>{order.tableNum}</p>
            </div>
            <div style={styles.dialogItem}>
                <p>Количество гостей: </p>
                <p>{order.guestCount}</p>
            </div>
            <div style={styles.dialogItem}>
                <p>Официант: </p>
                <p>{order.userId.name}</p>
            </div>
            <Divider />
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
                <List>
                    {
                        order.foodList.map((food, i) => (
                            <ListItem key={food._id}>
                                <ListItemAvatar>
                                <Avatar>
                                    <img src={base_url + food.item.imgPath} alt={food.item.title} style={{width: '100%'}} />
                                    {/* <FastfoodIcon /> */}
                                </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={food.item.title} secondary={`${food.item.price} x ${food.count}`}/>
                            </ListItem>
                        ))
                    }
                </List>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Закрыть
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}

const styles = {
    dialogItem: {
        height: '50px',
        width: '500px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
}

export default HistoryOrderInfoDialog
