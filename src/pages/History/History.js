import React from 'react'
import { Link } from 'react-router-dom'
import HistoryAppBar from './HistoryAppBar'
import HistoryTabs from './HistoryTabs'

const History = () => {
    return (
        <div style={{height: '100vh'}}>
            <HistoryAppBar />
            <HistoryTabs />
        </div>
    )
}

export default History
