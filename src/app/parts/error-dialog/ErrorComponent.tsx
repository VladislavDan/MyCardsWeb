import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import * as React from 'react';
import {FC} from 'react';
import {IErrorComponent} from './types/IErrorComponent';

export const ErrorComponent: FC<IErrorComponent> = ({isOpen, errorMessage, handleClose}) => {

    return (
        <Dialog
            open={isOpen}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            onClose={handleClose}
        >
            <DialogTitle id="alert-dialog-title">{"Something went wrong"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {errorMessage}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={handleClose}>
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
};
