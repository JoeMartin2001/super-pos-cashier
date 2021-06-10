import React from 'react'

const EmptyBag = () => {
    return (
        <div style={styles.bag_container}>
            <img src="/svg/empty-bag.svg" alt=""/>
            <p style={{color: 'grey', marginTop: '20px', fontSize: '18px'}}>Ничего нету! <span>&#128515;</span></p>
        </div>
    )
}

const styles = {
    bag_container: {
        width: '100%',
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
}

export default EmptyBag
