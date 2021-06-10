import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { AccordionActions, Button, Divider, List, ListItem, ListItemText } from '@material-ui/core';
import { useFetch } from '../../../hooks/useFetch';
import { socketIO } from '../../../common/socketIO';
import HistoryTakeOutFoodList from './HistoryTakeOutFoodList';
import { currencyFormat, getTotalPrice } from '../../../common/TimeFuncs';
import EmptyBag from '../../../components/EmptyBag';
import CustomSpinner from '../../../components/CustomSpinner';
import NetworkError from '../../../components/NetworkError';
import HistoryTakeOutActionDialog from './HistoryTakeOutActionDialog';
import { base_url } from '../../../common/variables';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(18),
    flexBasis: '33.33%',
    flexShrink: 0,
    fontWeight: 'bold',
    color: 'red'
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

const HistoryTakeOut = () => {
    const [loading, error, request, clearError] = useFetch()
    const [orders, setOrders] = useState(null)
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
  
    useEffect(() => {
      const handleFetchOrders = async() => {
        try {
          const data = await request(base_url + '/api/takeOut/getClosedTakeOuts')
          setOrders(data)
        } catch (_) {
          console.log(_.message)
          clearError()
        }
      } 

      handleFetchOrders()

      socketIO.on('closed_takeOut_deleted', handleFetchOrders)

      return () => {
        socketIO.off('closed_takeOut_deleted', handleFetchOrders)
      }
    }, [])

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

    const renderOrders = () => {
      if(orders.length) {
        return orders.map((order) => (
          <Accordion 
            expanded={expanded === order._id} 
            onChange={handleChange(order._id)} 
            key={order._id}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography className={classes.heading}>
                  {order.orderNum}
              </Typography>
              <Typography className={classes.secondaryHeading}>{`${order.foodList[0].item.title}...`}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <HistoryTakeOutFoodList list={order.foodList} />
            </AccordionDetails>
            {order.comment && (
              <div style={{width: '100%', padding:'1% 2%', display: 'flex'}}>
                  <p>Комментарий: </p>
                  <p style={{marginLeft: '20px'}}>{order.comment}</p>
              </div>
            )}
            <div style={{width: '100%', padding:'1% 2%', display: 'flex'}}>
                <p>Oбщая сумма: </p>
                <p style={{marginLeft: '20px', fontWeight: 'bolder'}}>{currencyFormat(getTotalPrice(order.foodList))} сум</p>
            </div>
            <Divider />
            <AccordionActions>
                <HistoryTakeOutActionDialog order={order} />
            </AccordionActions>
          </Accordion>
        ))
      }

      return <EmptyBag />
    }

    if(loading) {
      return <CustomSpinner />
    }
    if(error) {
      return <NetworkError />
    }
  
    return (
      <div className={classes.root}>
        {
          orders && renderOrders()
        }
      </div>
    );
}

export default HistoryTakeOut
