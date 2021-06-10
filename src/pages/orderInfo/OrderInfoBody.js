import React from 'react'
import { currencyFormat, getTotalPrice, get_time_diff, parseTime } from '../../common/TimeFuncs';
import { Button, Typography } from '@material-ui/core';
import { appColors } from '../../common/variables';
import { socketIO } from '../../common/socketIO';
import { useHistory } from 'react-router';

const OrderInfoBody = ({order}) => {
    const history = useHistory()

    const handleOrderClose = () => {
        socketIO.emit('close_order', order._id)
        history.goBack()
    }

    const handleOrderCancel = () => {
        socketIO.emit('cancel_order', order._id)
        history.goBack()
    }

    return (
        <div style={styles.main}>
            <div style={styles.generalInfo}>
                <div style={styles.generalInfo_item}>
                    <p style={styles.generalInfo_item_p}>Официант</p>
                    <p style={styles.generalInfo_item_p}>{order.userId.name}</p>
                </div>
                <div style={styles.generalInfo_item}>
                    <p style={styles.generalInfo_item_p}>Открыт</p>
                    <p style={styles.generalInfo_item_p}>{parseTime(order.time)}</p>
                </div>
                <div style={styles.generalInfo_item}>
                    <p style={styles.generalInfo_item_p}>Занят</p>
                    <p style={styles.generalInfo_item_p}>{get_time_diff(new Date(order.time))} мин.</p>
                </div>
            </div>
            <div style={styles.foodList_container}>
                <div style={styles.foodList}>
                    <div style={styles.foodList_top}>
                        <h2>{order.tableNum} - ый стол</h2>
                    </div>
                    <div style={styles.foodList_center}>
                        <div style={styles.foodList_center_header}>
                            <p style={styles.foodList_center_header_p}>Название</p>
                            <p style={styles.foodList_center_header_p}>Количество</p>
                            <p style={styles.foodList_center_header_p}>Цена</p>
                        </div>
                        <div style={styles.foodList_center_body}>
                            {
                                order.foodList.map((food) => (
                                    <div style={styles.foodList_center_body_item} key={food._id}>
                                        <p style={styles.foodList_center_body_item_p}>{food.item.title}</p>
                                        <p style={styles.foodList_center_body_item_p}>{food.count}</p>
                                        <p style={styles.foodList_center_body_item_p}>{food.count * food.item.price}</p>
                                    </div>
                                ))
                            }
                        </div>
                        <div style={styles.foodList_center_bottom}>
                            <p style={styles.foodList_center_bottom_p}>Общая сумма</p>
                            <p></p>
                            <p 
                                style={styles.foodList_center_bottom_p}
                            >
                                {currencyFormat(getTotalPrice(order.foodList))} сум
                            </p>
                        </div>
                    </div>
                </div>
                <div style={styles.foodList_actions}>
                    <Button variant='outlined' style={{color: 'red', borderColor: 'red'}} onClick={handleOrderCancel}>
                        Отменить
                    </Button>
                    <Button variant='contained' color='primary' onClick={handleOrderClose}>
                        Закрыть
                    </Button>
                </div>
            </div>

        </div>
    )
}

const styles = {
    main: {
        height: '90%',
        display: 'grid',
        gridTemplateColumns: '30% 70%'
    },
    generalInfo: {
        backgroundColor: appColors.secondary
    },
    generalInfo_item: {
        padding: '5% 10%',
        height: '15%',
        display: 'flex',
        justifyContent: 'space-between'
    },
    generalInfo_item_p: {
        color: 'white',
        fontSize: '1.5vw'
    },
    foodList_container: {
        height: '90vh',
        padding: '1%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    foodList: {
        height: '88%',
        overflowY: 'auto',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        borderRadius: '5px'
    },
    foodList_actions: {
        height: '10%',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridGap: '5px'
    },
    foodList_top: {
        height: '10%',
        borderBottom: '1px solid lightgrey',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    foodList_center: {
        height: '90%',
    },
    foodList_center_header: {
        height: '10%',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        borderBottom: '1px solid lightgrey',
    },
    foodList_center_header_p: {
        alignSelf: 'center',
        justifySelf: 'center',
    },
    foodList_center_bottom: {
        height: '10%',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        borderTop: '1px solid lightgrey',
    },
    foodList_center_bottom_p: {
        alignSelf: 'center',
        justifySelf: 'center',
    },
    foodList_center_body: {
        height: '80%',
        overflowY: 'auto'
    },
    foodList_center_body_item: {
        height: '10%',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
    },
    foodList_center_body_item_p: {
        alignSelf: 'center',
        justifySelf: 'center',
    }
}

export default OrderInfoBody
