import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { socketIO } from '../../common/socketIO';
import { currencyFormat } from '../../common/TimeFuncs';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { appColors, base_url } from '../../common/variables';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function TableCard({t}) {
    const [dialog, setDialog] = useState(false);
    const classes = useStyles();
    const totalPrice = t.foodList.reduce((accumulator, item) => accumulator + item.count * parseInt(item.item.price), 0)

    const handleCloseDialog = () => {
      socketIO.emit('close_order', t._id)
      setDialog(false)
    }

    return (
        <Card className={classes.root} variant="outlined">
        <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
                Номер стола
            </Typography>
            <Typography variant="h4" component="h2">
                {t.tableNum}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
                Общая сумма
            </Typography>
            <Typography variant="h6" component="p">
                {currencyFormat(totalPrice)} сум
            </Typography>
        </CardContent>
        <CardActions>
            <Button 
              variant="contained" 
              size="small" 
              style={{backgroundColor: appColors.secondary, color: 'white'}} 
              component={Link} to={`/orderInfo/${t._id}`}>Подробнее</Button>
            <>
              <Button 
                variant="outlined" 
                size="small" 
                style={{borderColor: 'red', color: 'red'}} 
                onClick={() => setDialog(true)}>Закрыть</Button>
              <Dialog
                  open={dialog}
                  onClose={() => setDialog(false)}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
              >
                  <DialogTitle id="alert-dialog-title">{"Подтверждение"}</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                          Вы точно хотите удалить {t.tableNum} - стол?
                      </DialogContentText>
                    </DialogContent>
                  <DialogActions>
                  <Button onClick={() => setDialog(false)} color="secondary">
                      Нет
                  </Button>
                  <Button onClick={() => handleCloseDialog()} color="primary" autoFocus>
                      Да
                  </Button>
                  </DialogActions>
              </Dialog>
            </>
            {/* <ConfirmModal handleClose={handleClose} /> */}
        </CardActions>
        </Card>
    );
}