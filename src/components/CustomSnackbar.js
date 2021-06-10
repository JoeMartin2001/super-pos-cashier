import {useState} from 'react'
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';

export const CustomSnackbar = ({snack, setSnack, type, content}) => {
    return (
        <Snackbar open={snack} autoHideDuration={6000} onClose={() => setSnack(false)}>
            <MuiAlert elevation={6} variant="filled" onClose={() => setSnack(false)} severity={type}>
                {content}
            </MuiAlert>
        </Snackbar>
    )
}