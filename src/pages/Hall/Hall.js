import { makeStyles } from '@material-ui/core'
import React from 'react'
import HallAppBar from './HallAppBar'

const useStyles = makeStyles((theme) => ({
    container: {
        height: '100vh',
    }
}))

const Hall = () => {
    const classes = useStyles()

    return (
        <div className={classes.container}>
            <HallAppBar />
        </div>
    )
}

export default Hall
