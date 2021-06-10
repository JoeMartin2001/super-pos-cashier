import { Avatar, Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { useFetch } from '../../hooks/useFetch';
import { currencyFormat } from '../../common/TimeFuncs';
import { useAppContext } from '../../context/AppProvider';
import CustomSpinner from '../../components/CustomSpinner';
import NetworkError from '../../components/NetworkError';
import { base_url } from '../../common/variables';

const CreateOrderMenu = ({category}) => {
    const [{cart}, dispatch] = useAppContext()
    const [foodList, setFoodList] = useState([])
    const [loading, error, request, clearError] = useFetch()

    useEffect(() => {
        fetchFoodList()

        async function fetchFoodList() {
            try {
                const data = await request(`${base_url}/api/food/getFoodByCategory/${category}`)
                setFoodList(data)
            } catch (_) {
                console.log(_.message)
            }
        }
    }, [])


    const handleAddToCart = (item) => dispatch({type: 'addToCart', payload: {...item, count: 1}})

    const handleRemoveFromCart = (item) => dispatch({type: 'removeFromCart', payload: item._id})

    const handleItemCount = (id) => {
        const i = cart.findIndex((item) => item._id === id)
        
        if(i > -1) {
            return cart[i].count
        } 

        return 0
    }
    
    const handleMenu = () => {
        if(loading) return <CustomSpinner />
        if(error) return <NetworkError />
        return (
            <div style={styles.container}>
                {
                    foodList.map((item) => (
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
            </div>
        )
    }

    return (
        handleMenu()
    )
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
        borderBottom: '1px solid lightgrey'
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

export default CreateOrderMenu
