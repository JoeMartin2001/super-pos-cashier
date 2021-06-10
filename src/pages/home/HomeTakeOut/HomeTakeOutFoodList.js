import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { ListItemSecondaryAction } from '@material-ui/core';
import { base_url } from '../../../common/variables';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
}));

const HomeTakeOutFoodList = ({list}) => {
    const classes = useStyles();

    return (
      <List className={classes.root}>
          {
              list.map((item) => (
                <ListItem key={item._id} dense>
                    <ListItemAvatar>
                    <Avatar>
                        <img src={base_url + item.item.imgPath} alt={item.item.title} width='100%' />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={item.item.title} secondary={`${item.item.price} x ${item.count}`}/>
                    <ListItemSecondaryAction>
                        <p>{parseInt(item.item.price) * item.count} сум</p>
                    </ListItemSecondaryAction>
                </ListItem>
              ))
          }
      </List>
    );
}

export default HomeTakeOutFoodList
