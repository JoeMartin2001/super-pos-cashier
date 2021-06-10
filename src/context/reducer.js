export const initialState = {
    cart: [],
    chat: [],
    userId: null
}

export const reducer = (state, action) => {
    switch(action.type) {
        case 'addToCart':
            const i = state.cart.findIndex((item) => item._id === action.payload._id)

            if(i > -1) {
                const newCart = state.cart
                newCart[i].count++

                return {
                    ...state, 
                    cart: newCart
                }
            }

            return {
                ...state,
                cart: [...state.cart, action.payload]
            }
        case 'removeFromCart':
            const index = state.cart.findIndex((item) => item._id === action.payload)

            if(index > -1) {
                if(state.cart[index].count > 1) {
                    const newCart = state.cart
                    newCart[index].count--

                    return {
                        ...state,
                        cart: newCart
                    }
                } else {
                    const newCart = state.cart
                    newCart.splice(index, 1)

                    return {
                        ...state,
                        cart: newCart
                    }
                }
            }
        case 'clearCart':
            return {
                ...state,
                cart: []
            }
        case 'LOGIN_USER':
            localStorage.setItem('userId', action.payload)
            return {
                ...state,
                userId: action.payload
            }
        case 'LOGOUT_USER':
            localStorage.removeItem('userId')
            return {
                ...state,
                userId: null
            }
        case 'ADD_MSG': 
            return {
                ...state,
                chat: [...state.chat, action.payload]
            }
        case 'GET_LATEST_CHATS': 
            return {
                ...state,
                chat: action.payload
            }
        default: 
            return state
    }
}