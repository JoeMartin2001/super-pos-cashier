import React, { useState } from 'react'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Button, InputLabel, makeStyles, MenuItem, Select, Snackbar, Switch, TextField, Typography } from '@material-ui/core'
import { appColors, base_url } from '../../common/variables'
import FinancesAppBar from './FinancesAppBar'
import { useFetch } from '../../hooks/useFetch';
import { Alert } from '@material-ui/lab';
import { useHistory } from 'react-router';

const Finances = () => {
    const history = useHistory()
    const classes = useStyles()
    const [loading, error, request, clearError] = useFetch()
    const [amount, setAmount] = useState('')
    const [actionType, setActionType] = useState('outcome');
    const [reason, setReason] = useState('')
    const [anotherReason, setAnotherReason] = useState(false)
    const [dialog, setDialog] = useState(false)
    
    const handleActionType = (event) => {
        setActionType(event.target.value);
    };

    const handleSelectReason = (event) => {
        setReason(event.target.value);
    };

    const handleCreateBtn = async() => {
        try {
            await request(base_url + '/api/transaction/createTransaction', 'POST', {
                amount, reason, type: actionType
            })
            handleCleanUp()
            history.goBack()
        } catch (error) {
            console.log(error.message)
            setDialog(true)
        }
    }

    const handleCleanUp = () => {
        setAmount('')
        setReason('')
    }

    return (
        <div className={classes.container}>
            <FinancesAppBar />
            <div className={classes.main}>  
                <div className={classes.mainTop}>
                    <TextField 
                        id="amount" 
                        label="Сумма" 
                        variant="outlined" 
                        type={"number"}
                        className={classes.amoutField}
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Тип</FormLabel>
                        <RadioGroup aria-label="actionType" name="actionType" row value={actionType} onChange={handleActionType}>
                            <FormControlLabel value="outcome" control={<Radio />} label="Расход" />
                            <FormControlLabel value="income" control={<Radio />} label="Приход" />
                        </RadioGroup>
                    </FormControl>
                </div>
                <div className={classes.reasonContainer}>
                    {
                        !anotherReason ? (
                            <FormControl variant="outlined" className={classes.selectReasonField}>
                                <InputLabel id="demo-simple-select-outlined-label">Причина</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={reason}
                                    onChange={handleSelectReason}
                                    label="Причина"
                                    disabled={anotherReason}
                                >
                                    <MenuItem value={'Инкассация'}>Инкассация</MenuItem>
                                    <MenuItem value={'Coca-Cola'}>Coca-Cola</MenuItem>
                                    <MenuItem value={'Lavash'}>Lavash</MenuItem>
                                </Select>
                            </FormControl>
                        ) : (
                            <TextField 
                                label='Другая причина' 
                                variant='outlined' 
                                multiline={true}
                                rows={4}
                                className={classes.anotherReasonField}
                                value={reason}
                                onChange={handleSelectReason}
                                disabled={!anotherReason}
                            />
                        )
                    }
                </div>
                <div className={classes.anotherReasonContainer}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={anotherReason}
                                onChange={() => setAnotherReason(!anotherReason)}
                                name="anotherReason"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                        }
                        style={{margin: 0}}
                        labelPlacement='start'
                        label="Другая причина"
                    />
                </div>
                <div className={classes.buttonContainer}>
                    <Button variant="outlined" style={{color: 'red', borderColor: 'red'}} onClick={handleCleanUp}>
                        Отмена
                    </Button>
                    <Button 
                        variant="contained" 
                        style={{backgroundColor: appColors.secondary, color: 'white'}}
                        onClick={handleCreateBtn}
                    >
                        Создать
                    </Button>
                </div>
            </div>
            <Snackbar open={dialog} autoHideDuration={6000} onClose={() => setDialog(false)}>
                <Alert onClose={() => setDialog(false)} severity="warning">
                    {error}
                </Alert>
            </Snackbar>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    container: {
        height: '100vh',
    },
    main: {
        padding: '2%'
    },
    mainTop: {
        display: 'flex',
        justifyContent: 'start',
        marginBottom: '30px'
    },
    amoutField: {
        minWidth: 250,
        marginRight: '70px',
        '&[type=number]': {
            '-moz-appearance': 'textfield',
        },
        '&::-webkit-outer-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0,
        },
        '&::-webkit-inner-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0,
        },
    },
    reasonContainer: {
        marginBottom: '30px'
    },
    selectReasonField: {
        minWidth: 250,
    },
    anotherReasonContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        marginBottom: '30px'
    },
    anotherReasonField: {
        minWidth: 250,
    },
    buttonContainer: {
        width: 250,
        display: 'flex',
        justifyContent: 'space-between'
    },
}))


export default Finances
