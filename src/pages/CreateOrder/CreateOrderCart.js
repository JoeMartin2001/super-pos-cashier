import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import { useAppContext } from '../../context/AppProvider';
import { Avatar, Switch, TextField } from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { currencyFormat, getRandomIntInclusive } from '../../common/TimeFuncs';
import EmptyBag from '../../components/EmptyBag';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import { useFetch } from '../../hooks/useFetch';
import { useHistory } from 'react-router';
import { base_url } from '../../common/variables';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  comment_container: {
    padding: '1%',
    display: 'flex',
    flexDirection: 'column'
  },
  switch_container: {
    display: 'flex',
    alignItems: 'center',
    padding: '5px 0',
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateOrderCart = () => {
    const history = useHistory() 
    const [, , request, clearError] = useFetch()
    const [{cart}, dispatch] = useAppContext()
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [comment, setComment] = useState(false)
    const [commentText, setCommentText] = useState('')
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleAddToCart = (item) => dispatch({type: 'addToCart', payload: {...item, count: 1}})

    const handleRemoveFromCart = (item) => dispatch({type: 'removeFromCart', payload: item._id})

    const handleItemCount = (id) => {
        const i = cart.findIndex((item) => item._id === id)
        
        if(i > -1) {
            return cart[i].count
        } 

        return 0
    }

    const handleCreateOrder = async() => {
      const c = cart.map((item) => {
        return {item: item._id, count: item.count}
      })

      try {
        await request(base_url + '/api/takeOut/createTakeOut', 'POST', {
          orderNum: getRandomIntInclusive(1, 1000),
          status: 'pending',
          comment: commentText,
          foodList: c
        })
        dispatch({type: 'clearCart'})
        history.goBack()
      } catch (_) {
        console.log(_.message)
        clearError()
      }
    }
  
    return (
      <div>
        <IconButton aria-label="upload picture" style={{color: 'white', position: 'relative'}}  onClick={handleClickOpen}>
            <LocalMallIcon fontSize='large' />
            <div 
                style={{
                position: 'absolute', 
                top: '2px', 
                right: '2px', 
                fontSize: '14px',
                backgroundColor: 'red',
                width: '25px',
                height: '25px',
                borderRadius: '5px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
                }}
            >{cart.length}</div>
        </IconButton> 
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Просмотр заказов
              </Typography>
              <Button 
                variant='outlined' 
                color="inherit" 
                onClick={() => dispatch({type: 'clearCart'})} 
                style={{color: 'orange'}}
                disabled={!cart.length}
              >
                Отмена
              </Button>
              <Button  
                variant='outlined'
                color="inherit" 
                onClick={handleCreateOrder}
                style={{marginLeft: '40px', color: 'white'}}
                disabled={!cart.length}
              >
                Создать
              </Button>
            </Toolbar>
          </AppBar>
          {
            cart.length ? (
              <div>
                <div className={classes.comment_container}>
                  <TextField 
                    id="outlined-basic" 
                    label="Комментарий" 
                    variant="outlined" 
                    rows={2} 
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    multiline={true} 
                    disabled={!comment} 
                  />
                  <div className={classes.switch_container}>
                    <span>Комментарий</span>
                    <Switch
                      checked={comment}
                      onChange={() => setComment(!comment)}
                      color="primary"
                      inputProps={{ 'aria-label': 'checkbox with default color' }}
                    />
                  </div>
                </div>
                <Divider />
                <List>
                  {
                    cart.map((item) => (
                      <div style={styles.menu_item} key={item._id}>
                          <div style={styles.menu_item_left}>
                              <Avatar alt={item.title} src={`${base_url}${item.imgPath}`} style={styles.menu_item_left_img}  />
                              <div>
                                  <p style={{fontSize: '20px', fontWeight: 'bolder'}}>{item.title}</p>
                                  <p style={{fontSize: '18px'}}>{currencyFormat(parseInt(item.price))} сум</p>
                              </div>
                          </div>
                          <div style={styles.menu_item_right}>
                              <Button onClick={() => handleRemoveFromCart(item)}>
                                  <RemoveIcon />
                              </Button>
                              <p style={{fontSize: '25px'}}>{handleItemCount(item._id)}</p>
                              <Button onClick={() => handleAddToCart(item)}>
                                  <AddIcon />
                              </Button>
                          </div>
                      </div>
                    ))
                  }
                </List>
              </div>
            ) : (
              <EmptyBag />
            )
          }
        </Dialog>
      </div>
    );
}


const styles = {
    container: {
        height: '100%',
    },
    menu_item: {
        padding: '20px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    menu_item_left: {
        display: 'flex',
        alignItems: 'center'
    },
    menu_item_left_img: {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        marginRight: '30px'
    },
    menu_item_right: {
        width: '220px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

}

export default CreateOrderCart
