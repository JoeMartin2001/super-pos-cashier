import React from 'react'
import CreateOrderAppBar from './CreateOrderAppBar'
import CreateOrderTabs from './CreateOrderTabs'

const CreateOrder = () => {
    return (
        <div style={styles.container}>
            <CreateOrderAppBar />
            <CreateOrderTabs />
        </div>
    )
}

const styles = {
    container: {
    }
}

export default CreateOrder
