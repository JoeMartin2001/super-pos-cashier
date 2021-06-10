import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useAppContext } from '../../context/AppProvider';
import { Link } from 'react-router-dom';
import HistoryIcon from '@material-ui/icons/History';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import DashboardIcon from '@material-ui/icons/Dashboard';
import HelpIcon from '@material-ui/icons/Help';
import ChatIcon from '@material-ui/icons/Chat';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import VisibilityIcon from '@material-ui/icons/Visibility';

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export default function NavDrawer() {
  const [{}, dispatch] = useAppContext()
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const routeMap = [
    {title: 'Новый заказ', to: '/createOrder', icon: 'FastfoodIcon'}, 
    {title: 'История заказов', to: '/history', icon: 'HistoryIcon'},
    {title: 'Финансы', to: '/finances', icon: 'AttachMoneyIcon'},
    {title: 'Чат', to: '/chat', icon: 'ChatIcon'},
    // {title: 'Зал', to: '/hall', icon: 'VisibilityIcon'},
  ]

  const handleIcon = (icon) => {
    switch(icon) {
      case 'HistoryIcon':
        return <HistoryIcon />
      case 'FastfoodIcon':
        return <FastfoodIcon />
      case 'ChatIcon': 
        return <ChatIcon />
      case 'VisibilityIcon':
        return <VisibilityIcon />
      case 'AttachMoneyIcon':
        return <AttachMoneyIcon />
      default: 
        return <HelpIcon />
    }
  }

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {routeMap.map((route, index) => (
          <ListItem key={route.title} button component={Link} to={route.to}>
            <ListItemIcon>{handleIcon(route.icon)}</ListItemIcon>
            <ListItemText primary={route.title} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
          <ListItem button key={'logout'} onClick={() => dispatch({type: 'LOGOUT_USER'})}>
            <ListItemIcon>{<ExitToAppIcon />}</ListItemIcon>
            <ListItemText primary={'Выйти'} />
          </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(anchor, true)}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
