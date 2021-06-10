import React from 'react'

const NetworkError = () => {
    return (
        <div style={styles.error_container}>
            <img src="/svg/network.svg" alt=""/>
            <p style={{color: 'grey', marginTop: '20px', fontSize: '18px'}}>Что-то пошло не так!</p>
        </div>
    )
}

const styles = {
    error_container: {
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
}

export default NetworkError
