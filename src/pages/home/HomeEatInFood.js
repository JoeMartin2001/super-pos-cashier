import React, { useEffect, useState } from 'react'
import { appColors, base_url } from '../../common/variables'
import { useFetch } from '../../hooks/useFetch';
import TableCard from './TableCard';
import { socketIO } from '../../common/socketIO';
import CustomSpinner from '../../components/CustomSpinner';
import NetworkError from '../../components/NetworkError';
import EmptyBag from '../../components/EmptyBag';

const HomeEatInFood = () => {
    const [loading, error, request, clearError] = useFetch()
    const [tables, setTables] = useState(null)

    useEffect(() => {    
        const handleFetchTables = async() => {
            try {
                const data = await request(base_url + '/api/table/getAllTablesForCash')
                setTables(data)
            } catch (_) {
                console.log(_.message)
                clearError()
            }
        }

        handleFetchTables()

        socketIO.on('new_order_finished', handleFetchTables)
        socketIO.on('order_closed', handleFetchTables)

        return () => {
            socketIO.off('new_order_finished', handleFetchTables)
            socketIO.off('order_closed', handleFetchTables)
        }

    }, [])


    const renderTables = () => {
        if(loading) return <CustomSpinner />
        if(error) return <NetworkError />
        return tables && (
            tables.length ? (
                <div style={styles.main}>
                    {
                        [...tables].reverse().map((t, i) => {
                            return (
                                <TableCard key={i} t={t} />
                            )
                        })
                    }
                </div>
            ) : (
                <EmptyBag />
            )
        )
    }

    return (
        <div style={styles.container}>
            {renderTables()}
        </div>
    )
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    header: {
        width: '100%',
        height: '60px',
        backgroundColor: appColors.primary,
        boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
        padding: '0px 15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerTitle: {
        color: '#ffffff',
        textTransform: 'uppercase'
    },
    main: {
        padding: '10px',
        width: '100%',
        flex: '1',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gridGap: '1em',
    },
    tableItem: {
        width: '250px',
        height: '120px',
        border: `2px solid ${appColors.primary}`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        justifySelf: 'center',
    },
    tableText: {
        fontSize: '40px',
        color: appColors.primary
    },
    spinner_container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}

export default HomeEatInFood
