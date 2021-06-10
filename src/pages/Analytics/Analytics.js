import React from 'react'
import { Link } from 'react-router-dom'
import AnalyticsAppBar from './AnalyticsAppBar'
import AnalyticsMenu from './AnalyticsMenu'

const Analytics = () => {
    return (
        <div style={{height: '100vh'}}>
            <AnalyticsAppBar />
            <AnalyticsMenu />
        </div>
    )
}

export default Analytics
