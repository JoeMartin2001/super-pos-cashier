import { CircularProgress } from '@material-ui/core'
import React from 'react'
import { appColors } from '../common/variables'

const CustomSpinner = () => {
    return (
        <div style={styles.spinner_container}>
            <CircularProgress style={{color: appColors.tertiary}} />
        </div>
    )
}

const styles= {
    spinner_container: {
        height: '70vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
}

export default CustomSpinner
