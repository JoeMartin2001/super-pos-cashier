import { makeStyles } from '@material-ui/core';
import React from 'react'
import HomeHeader from './HomeHeader';
import HomeTabs from './HomeTabs';

const useStyles = makeStyles((theme) => ({
    container: {
        // height: '100vh',
        // width: '100vw',
        display: 'flex',
        flexDirection: 'column'
    }
}))

const Home = () => {
    const classes = useStyles()

    return (
        <div className={classes.container}>
            <HomeHeader />
            <HomeTabs />
        </div>
    )
}


export default Home
