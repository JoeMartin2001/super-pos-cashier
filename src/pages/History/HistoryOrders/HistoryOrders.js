import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { useFetch } from '../../../hooks/useFetch';
import EmptyBag from '../../../components/EmptyBag';
import NetworkError from '../../../components/NetworkError';
import CustomSpinner from '../../../components/CustomSpinner';
import HistoryOrderInfoDialog from './HistoryOrderInfoDialog';
import { socketIO } from '../../../common/socketIO';
import { base_url } from '../../../common/variables';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '1%',
    },
    root: {
      backgroundColor: theme.palette.background.paper,
    },
}));

const HistoryOrders = () => {
    const classes = useStyles();

    const [loading, error, request, clearError] = useFetch()
    const [orders, setOrders] = useState()

    useEffect(() => {
        fetchOrders()

        async function fetchOrders() {
            try {
                const data = await request(base_url + '/api/table/getAllClosedTables')
                setOrders(data)
            } catch (_) {
                console.log(_.message)
                clearError()
            }
        }

        socketIO.on('closed_table_deleted', fetchOrders)

        return () => {
            socketIO.off('closed_table_deleted', fetchOrders)
        }
    }, [])

    const renderOrders = () => {
        if(error) return <NetworkError />
        if(loading) return <CustomSpinner />
        if(orders.length) {
            return orders.map((order) => (
                <List component="nav" className={classes.root} aria-label="contacts">
                    <HistoryOrderInfoDialog order={order} />
                </List>
            ))
        }

        return <EmptyBag />
    }

    return (
        <div className={classes.container}>
            {orders ? renderOrders() : <CustomSpinner />}
        </div>
    );
}

export default HistoryOrders
